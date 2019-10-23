import { APIResponse } from './message'

export abstract class CQWebSocketError extends Error { }

export class StateError extends CQWebSocketError {
  public readonly name = 'StateError'
}

export class AbortError extends CQWebSocketError {
  public readonly name = 'AbortError'
}

export class TimeoutError extends CQWebSocketError {
  public readonly name = 'TimeoutError'
}

export abstract class MessageError extends CQWebSocketError {
  public constructor (public readonly data: string, ...args: any[]) {
    super(...args)
  }
}

export class InvalidMessageError extends MessageError {
  public readonly name = 'InvalidMessageError'
}

export class UnexpectedMessageError extends MessageError {
  public readonly name = 'UnexpectedMessageError'
  public constructor (
    public readonly record: Record<string, any>,
    data: string,
    ...args: any[]
  ) {
    super(data, ...args)
  }
}

export class UnhandledReponseError extends MessageError {
  public readonly name = 'UnhandledReponseError'
  public constructor (
    public readonly response: APIResponse,
    data: string,
    ...args: any[]
  ) {
    super(data, ...args)
  }
}
