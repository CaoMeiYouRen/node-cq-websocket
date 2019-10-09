module.exports.Socket = class Socket {
  constructor (url = 'ws://fake-url') {
    this.url = url
    this.messageQueue = []
  }

  createConnection (Clazz) {
    const socket = this
    this.connection = new Clazz({
      url: this.url,
      send (msg) {
        socket.messageQueue.push(msg)
      },
      close () { }
    })
    return this.connection
  }

  close (code = 1000, reason = 'normal closure') {
    this.connection.handleClose(code, reason)
  }

  recv (msg) {
    this.connection.handleMessage(typeof msg === 'string' ? msg : JSON.stringify(msg))
  }

  ack (resp = {}) {
    const request = JSON.parse(this.messageQueue.shift())
    this.recv({ echo: request.echo, ...resp })
  }
}
