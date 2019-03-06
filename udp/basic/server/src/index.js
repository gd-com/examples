const dgram = require('dgram')
const { GdBuffer } = require('@gd-com/utils')

const server = dgram.createSocket('udp4')

server.on('listening', () => {
  let address = server.address()
  console.log(`UDP Server listening on ${address.address}:${address.port}`)
})

server.on('message', (buf, remote) => {
  let buffer = new GdBuffer(Buffer.from(buf))

  console.log('Recieve ' , buffer.getVar())

  let send = new GdBuffer()
  send.putVar(Math.random())

  server.send(send.getBuffer(), remote.port, remote.host)
})

server.bind(9091, '127.0.0.1')
