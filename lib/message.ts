export class Message {
  public constructor (public readonly text: string) { }
}

export class JSONMessage extends Message {
  public readonly json: Record<string, any>
  public constructor (text: string) {
    super(text)
    this.json = JSON.parse(text)
  }
}
