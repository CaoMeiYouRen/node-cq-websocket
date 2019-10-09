export {}

declare module 'websocket' {
  export namespace connection {
    export const CLOSE_DESCRIPTIONS: Record<number, string>
  }
}
