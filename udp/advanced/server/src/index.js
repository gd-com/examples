const dgram = require('dgram')
const { GdBuffer } = require('@gd-com/utils')
const { v4 } = require('uuid')
const process = require('./process')

const server = dgram.createSocket('udp4')

let clients = {}

server.on('listening', () => {
  let address = server.address()
  console.log(`UDP Server listening on ${address.address}:${address.port}`)
})

server.on('message', (buf, remote) => {
  let client = null
  if (!clients.hasOwnProperty(`${remote.address}-${remote.port}`)) {
    clients[`${remote.address}-${remote.port}`] = {uuid: v4()}
    client = clients[`${remote.address}-${remote.port}`]
    console.log(`[${client.uuid}] New client from ${remote.address}:${remote.port}`)
  } else {
    client = clients[`${remote.address}-${remote.port}`]
  }

  let recieve = new GdBuffer(Buffer.from(buf))
  const type = recieve.getU16()

  console.log(`[${client.uuid}] << Recieve packet code`, type)
  if (process.hasOwnProperty(type)) {
    process[`${type}`](client, server, remote, recieve.getBuffer())
  } else {
    console.log(`[${client.uuid}] << Unknow packet code`, type)
  }
})

server.bind(9091, '127.0.0.1')
