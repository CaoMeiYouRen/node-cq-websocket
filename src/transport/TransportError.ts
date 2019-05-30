/**
 * @module transport
 */
import { TransportReadyState } from './Transport'

export abstract class TransportError extends Error { }

export class StateError extends TransportError {
  public readonly name = 'StateError'
  constructor (current: TransportReadyState,
    expected: TransportReadyState[]) {
    super(StateError.formatMessage(current, expected))
  }

  static formatMessage (current: TransportReadyState,
    expected: TransportReadyState[]): string {
    const expectedStr = (!Array.isArray(expected) ? [ expected ] : expected)
      .map(TransportReadyState.toString)
      .join(', ')
      .replace(/, (?=[^,]+$)/, ' and ')
    return `expect ${expectedStr}, got ${TransportReadyState.toString(current)}`
  }
}

export class ConnectionError extends TransportError {
  public readonly name = 'ConnectionError'
  constructor (err: Error | string) {
    super(typeof err === 'string' ? err : err.message)
  }
}

export class MessageError extends TransportError {
  public readonly name = 'MessageError'
}
