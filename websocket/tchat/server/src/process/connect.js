const { GdBuffer } = require('@gd-com/utils')
const packets = require("../packets")

module.exports = {
  packet: packets.CONNECT_REQUEST,
  process: (uuid, ws, recieve) => {
    try {
      let data = new GdBuffer(Buffer.from(recieve))
      let login = data.getString()

      let packet = new GdBuffer()
      packet.putU16(packets.CONNECT_SUCCESS)
      packet.putString(login)

      console.log(`[${uuid}] >> Send packet code`, packets.CONNECT_SUCCESS)
      ws.send(packet.getBuffer())
    } catch (e) {
      let packet = new GdBuffer()
      packet.putU16(packets.CONNECT_ERROR)

      console.log(`[${uuid}] >> Send packet code`, packets.CONNECT_ERROR)
      ws.send(packet.getBuffer())
    }

  }
}