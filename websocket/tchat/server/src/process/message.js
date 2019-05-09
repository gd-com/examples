const { GdBuffer } = require('@gd-com/utils')
const packets = require("../packets")

module.exports = {
  packet: packets.MESSAGE_REQUEST,
  process: (uuid, ws, recieve, wss) => {
    try {
      let data = new GdBuffer(Buffer.from(recieve))
      let message = data.getString()

      let packet = new GdBuffer()
      packet.putU16(packets.MESSAGE_SUCCESS)
      packet.putString(message)
      packet.putString(message)
      packet.putString(message)
      console.log(`[${uuid}] >> Send packet code`, packets.MESSAGE_SUCCESS)
      console.log(packet.getBuffer())
      ws.send(packet.getBuffer())

      let packetToOther = new GdBuffer()
      packetToOther.putU16(packets.NEW_MESSAGE_REQUEST)
      packetToOther.putString(uuid)
      packetToOther.putString(message)
      packetToOther.putString(message)
      console.log(`[${uuid}] >> Send packet code`, packets.NEW_MESSAGE_REQUEST)

      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(packetToOther.getBuffer())
        }
      })
    } catch (e) {
      let packet = new GdBuffer()
      packet.putU16(packets.MESSAGE_ERROR)

      console.log(`[${uuid}] >> Send packet code`, packets.MESSAGE_ERROR)
      ws.send(packet.getBuffer())
    }
  }
}