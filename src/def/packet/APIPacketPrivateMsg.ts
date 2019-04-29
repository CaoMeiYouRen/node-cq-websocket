namespace Packet {
  export interface APIPacketPrivateMsg {
    user_id: number
    message: string | Array<CQHTTPMessage> | CQHTTPMessage
    auto_escape?: boolean
  }
}
