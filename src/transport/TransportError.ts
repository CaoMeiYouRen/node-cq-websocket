/**
 * @module transport
 *//*
*/

export abstract class TransportError extends Error { }

export class ConnectionError extends TransportError {
  public readonly name = 'ConnectionError'
  constructor (err: Error | string) {
    super(typeof err === 'string' ? err : err.message)
  }
}

export class MessageError extends TransportError {
  public readonly name = 'MessageError'
}
