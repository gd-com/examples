const net = require('net')
const { StreamTcp, GdBuffer, addLengthFront } = require('@gd-com/utils')
const { v4 } = require('uuid')
const process = require('./process')

let server = net.createServer((socket) => {
  let uuid = v4()

  console.log(`[${uuid}] Connected`);
  Promise.resolve().then(async () => {
    // send is uuid
    let uuidPacket = new GdBuffer()
    await uuidPacket.putU16(1)
    await uuidPacket.putString(uuid)
    socket.write(addLengthFront(uuidPacket.getBuffer()))
  })

  const tcpSplit = new StreamTcp()
  socket.pipe(tcpSplit).on('data', async (data) => {
    let recieve = new GdBuffer(Buffer.from(data))

    const type = await recieve.getU16()
    console.log(`[${uuid}] << Recieve packet code`, type)
    if (process.hasOwnProperty(type)) {
      process[`${type}`](uuid, socket, recieve.getBuffer())
    } else {
      console.log(`[${uuid}] << Unknow packet code`, type)
    }

  })

  socket.on('end', () => {
    console.log('Bye :(')
  })
  socket.on('error', () => {
    console.log('Bye :(')
  })
})

server.on('error', (err) => {
  throw err
})

server.listen(9090, '127.0.0.1', () => {
  console.log(`Server launched TCP 127.0.0.1:${9090}`)
})
