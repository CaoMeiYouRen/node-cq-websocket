module.exports.Socket = class Socket {
  constructor (options = {}) {
    this.options = Object.assign({
      url: 'ws://fake_url',
      closeDelay: 500,
      responseDelay: 500,
      responsePayload: {}
    }, options)
  }

  createConnection (Clazz) {
    const socket = this
    const {
      responseDelay,
      closeDelay
    } = socket.options
    this.connection = new Clazz({
      url: this.options.url,
      send (msg) {
        setTimeout(() => socket.send(msg), responseDelay)
      },
      close (code, reason) {
        setTimeout(() => socket.close(code, reason), closeDelay)
      }
    })
    return this.connection
  }

  close (code = 1000, reason = 'normal closure') {
    this.connection.handleClose(code, reason)
  }

  send (msg) {
    this.connection.handleMessage(JSON.stringify({
      ...this.options.responsePayload,
      echo: JSON.parse(msg).echo
    }))
  }

  recv (msg) {
    this.connection.handleMessage(typeof msg === 'string' ? msg : JSON.stringify(msg))
  }
}
