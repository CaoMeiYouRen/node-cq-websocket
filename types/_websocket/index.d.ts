export {}

declare module "websocket" {
  interface connection {
    close (code?: number, reason?: string): void
  }
}
