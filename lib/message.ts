import { InvalidMessageError } from './errors'

export class Message {
  public constructor (public readonly text: string) { }
}

export class RecordMessage extends Message {
  private constructor (
    text: string,
    public readonly record: Record<string, any>
  ) {
    super(text)
  }

  public static from (text: string): RecordMessage {
    let record: any

    try {
      /**
       * @todo We have assumed here that
       * nothing is greater than `2^53 -1`, especially `user_id` and `group_id` though they are int64.
       * If the support of numbers greater than `2^53 -1` is required,
       * file an issue and the JSON parser will be updated.
       */
      record = JSON.parse(text)
    } catch (e) {
      throw new InvalidMessageError(text, `invalid JSON: ${e.message}`)
    }

    if (typeof record !== 'object') {
      throw new InvalidMessageError(text, `the message is not a JSON object`)
    }

    return new RecordMessage(text, record as Record<string, any>)
  }
}

export interface APIResponse {
  retcode: number
  status: string
  data: Record<string, any>
  echo: string
}
