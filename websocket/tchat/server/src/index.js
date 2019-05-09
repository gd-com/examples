const WebSocket = require('ws')
const { GdBuffer } = require('@gd-com/utils')
const { v4 } = require('uuid')
const packetProcessor = require('./process')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  let uuid = v4()

  console.log(`[${uuid}] Connected`)

  // send is uuid
  let uuidPacket = new GdBuffer()
  uuidPacket.putU16(1)
  uuidPacket.putString(uuid)
  ws.send(uuidPacket.getBuffer())

  ws.on('close', () => {
    console.log(`[${uuid}] Disconnected`)
  })

  ws.on('message', (message) => {
    let recieve = new GdBuffer(Buffer.from(message))
    console.log(recieve.getBuffer())

    const type = recieve.getU16()
    console.log(`[${uuid}] << Recieve packet code`, type)
    if (packetProcessor.hasOwnProperty(type)) {
      packetProcessor[`${type}`](uuid, ws, recieve.getBuffer(), wss)
    } else {
      console.log(`[${uuid}] << Unknow packet code`, type)
    }
  })
})
