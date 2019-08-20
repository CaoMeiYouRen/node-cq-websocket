import { EventEmitter } from 'events'
import pTimeout from 'p-timeout'

import { WebSocketLike } from './typedef/websocket'

export { TimeoutError } from 'p-timeout'

export abstract class Connection extends EventEmitter {
  public closed: boolean = false

  public constructor (protected readonly socket: WebSocketLike) {
    super()
  }

  public async close (code: number = 1000, reason: string = 'normal closure'): Promise<void> {
    return pTimeout(new Promise((resolve) => {
      this.socket.close(code, reason)
      this.socket.addEventListener('close', () => {
        resolve()
      }, { once: true })
    }), 1000)
  }
}

export class APIConnection extends Connection {
}

export class EventConnection extends Connection {
  public async read<P extends Record<string, any>> (): Promise<P> {

  }
}

export class UniversalConnection {

}
