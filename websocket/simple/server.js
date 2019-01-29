const WebSocket = require('ws')
const gdCom = require('@gd-com/utils')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  console.log('connected')
  ws.on('message', async (message) => {
    let recieve = new gdCom.GdBuffer(Buffer.from(message))
    console.log(await recieve.getVar())

    let buffer = new gdCom.GdBuffer()
    await buffer.putVar(Math.random())
    ws.send(buffer.getBuffer())
  })
})
