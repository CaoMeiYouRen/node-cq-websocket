/**
 * @module transport.ws.browser
 */
import { WSTransportEventMap } from '../WSTransport'

/**
 * @asMemberOf WebSocketNodeClient
 * @event
 */
export type reconnect = WSTransportEventMap['reconnect']

/**
 * @asMemberOf WebSocketNodeClient
 * @event
 */
export type open = WSTransportEventMap['open']

/**
 * @asMemberOf WebSocketNodeClient
 * @event
 */
export type close = WSTransportEventMap['close']

/**
 * @asMemberOf WebSocketNodeClient
 * @event
 */
export type error = WSTransportEventMap['error']

/**
 * @asMemberOf WebSocketNodeClient
 * @event
 */
export type message = WSTransportEventMap['message']
