export abstract class CQWebSocketError extends Error { }

export class MessageError extends CQWebSocketError {
  public readonly name: string = 'MessageError'
  public constructor (public readonly data: any, ...args: any[]) {
    super(...args)
  }
}
