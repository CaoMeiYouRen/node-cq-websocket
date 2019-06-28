/**
 * @module transport
 */
import { StrictEventEmitter } from 'strict-event-emitter-types'
import { EventEmitter } from 'events'

export interface TransportEventMap {
  message (msg: string): void
  error (err: Error): void
}

export interface TransportEventEmitter {
  new(): StrictEventEmitter<EventEmitter, TransportEventMap>
}

export abstract class Transport extends (EventEmitter as TransportEventEmitter) {
  abstract send (payload: string): void
}

export abstract class WSTransport extends Transport {

}

export abstract class RWSTransport extends Transport {

}

export abstract class HTTPTransport extends Transport {
}
