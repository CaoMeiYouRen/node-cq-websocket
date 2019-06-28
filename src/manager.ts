import { strict as assert } from 'assert'
import bs from 'binary-search'
import { EventEmitter } from 'events'

import { Channel } from './channel'
import { Filter } from './filter'
import { Context } from './context'
import { Transport } from './transport/Transport'
import { W3CWebSocket } from './transport/ws/W3CWebSocket'

export interface ManagerOptions {
  transport: Transport
}

export class Manager extends EventEmitter {
  private _registry: ChannelRegistry = new ChannelRegistry()

  constructor(options: Partial<ManagerOptions>) {
    super()
    const transport = options.transport || new W3CWebSocket('')
    transport.on('message', (msg) => {
      let ctx: Context
      try {
        ctx = JSON.parse(msg) as Context
      } catch (err) {
        this.emit('error', err)
        ctx = new Context()
      }
      this.handle(ctx)
    })
  }

  public channel(filter: Filter, priority: number = 0): Channel {
    const channel = new Channel(filter, priority)
    this._registry.register(channel)
    return channel
  }

  public handle(ctx: Context): void {
    for (let channel of this ._registry.values()) {
      channel.broadcast(ctx)
    }
}
}

export class ChannelList {
  private _list: Channel[] = []

  constructor (
    public priority: number
  ) { }

  public add (channel: Channel): void {
    this._list.push(channel)
  }

  public remove (channel: Channel): boolean {
    const index = this._list.indexOf(channel)
    if (index > -1) {
      this._list.splice(index, 1)
      return true
    }
    return false
  }

  public [Symbol.iterator] () {
    const list = this._list
    let index = 0
    return {
      next () {
        return {
          done: index === list.length,
          value: list[index++]
        }
      }
    }
  }
}

export class ChannelRegistry {
  /**
   * Priority queue in descending order.
   * Channels with the same priority are grouped together.
   */
  private _queue: ChannelList[] = []

  /**
   * Perform binary search to locate its list and add a new channel to the list;
   * a new list is inserted if missed.
   */
  public register (channel: Channel): void {
    const priority = channel.priority
    const index = bs(this._queue, priority, (_li, _pr) => {
      return _pr - _li.priority
    })

    if (index < 0) { // miss
      const expectedIndex = ~index
      const channelList = new ChannelList(priority)
      channelList.add(channel)
      this._queue.splice(expectedIndex, 0, channelList) // insert the list
    } else { // hit
      this._queue[index].add(channel)
    }
  }

  public unregister (channel: Channel): boolean {
    const priority = channel.priority
    const index = bs(this._queue, priority, (_li, _pr) => {
      return _pr - _li.priority
    })
    return index < 0 ? false : this._queue[index].remove(channel)
  }

  /**
   * @return a iterable view of channels
   */
  public values (): Iterable<Channel> {
    const queue = this._queue
    return (function* () {
      for (let channelList of queue) {
        for (let channel of channelList) {
          yield channel
        }
      }
    })()
  }
}
