export abstract class Event {
  protected constructor (
    public readonly name: string
  ) { }
}

export class CloseEvent extends Event {
  public constructor (
    public readonly code?: number,
    public readonly reason?: string
  ) {
    super('close')
  }
}

export class ErrorEvent extends Event {
  /* eslint-disable handle-callback-err */
  public constructor (
    public readonly error: Error
  ) {
  /* eslint-enable handle-callback-err */
    super('error')
  }
}

export class MessageEvent extends Event {
  public payload?: Record<string, any>
  public constructor (
    public readonly data: string | Record<string, any>
  ) {
    super('message')
  }
}
