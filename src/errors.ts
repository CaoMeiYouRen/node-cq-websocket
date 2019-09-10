import { TimeoutError } from 'p-timeout'

export class CQWebSocketError extends Error { }
export class DriverError extends CQWebSocketError { }
export class ConnectionError extends CQWebSocketError { }

export { TimeoutError }
