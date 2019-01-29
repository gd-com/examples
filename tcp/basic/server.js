const net = require('net')
const { StreamTcp, GdBuffer, addLengthFront } = require('@gd-com/utils')

let server = net.createServer((socket) => {
  const tcpSplit = new StreamTcp()
  socket.pipe(tcpSplit).on('data', async (data) => {
    const packet = new GdBuffer(data)

    const decoded = await packet.getVar()
    console.log('receive :', decoded)

    const packetToSend = new GdBuffer()
    await packetToSend.putVar(Math.random())

    let toSend = addLengthFront(packetToSend.getBuffer())

    console.log('send :', toSend)
    socket.write(toSend)
  })

  socket.on('error', () => console.log('Bye :('))
})

server.on('error', (err) => {
  throw err
})

server.listen(8090, '127.0.0.1', () => {
  console.log(`Server launched TCP 127.0.0.1:${8090}`)
})
