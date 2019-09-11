import { MessageError } from './errors'

export function isEventPayload (obj: any): obj is Record<string, any> {
  return typeof obj === 'object' && typeof obj.post_type === 'string'
}

export function isAPIResponse (obj: any): obj is Record<string, any> {
  return typeof obj === 'object' && typeof obj.retcode === 'number' && typeof obj.echo !== 'undefined'
}

export function parseMessage (msg: string): Record<string, any> {
  try {
    /**
     * @todo We have assumed here that
     * nothing is greater than `2^53 -1`, especially `user_id` and `group_id` though they are int64.
     * If the support of numbers greater than `2^53 -1` is required,
     * file an issue and the JSON parser will be updated.
     */
    return JSON.parse(msg)
  } catch (err) {
    throw new MessageError(msg, `invalid JSON: ${err.message}`)
  }
}
