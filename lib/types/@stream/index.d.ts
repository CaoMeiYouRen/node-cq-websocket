declare module 'stream' {
  export interface DuplexOptions {
    writableHighWaterMark?: number
    readableHighWaterMark?: number
  }
}
