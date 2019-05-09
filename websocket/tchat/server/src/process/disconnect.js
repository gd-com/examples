const { GdBuffer } = require('@gd-com/utils')
const packets = require("../packets")

module.exports = {
  packet: packets.DISCONNECT_REQUEST,
  process: (uuid, ws,) => {
    try {
      let packet = new GdBuffer()
      packet.putU16(packets.DISCONNECT_SUCCESS)

      console.log(`[${uuid}] >> Send packet code`, packets.DISCONNECT_SUCCESS)
      ws.send(packet.getBuffer())
    } catch (e) {
      let packet = new GdBuffer()
      packet.putU16(packets.DISCONNECT_ERROR)

      console.log(`[${uuid}] >> Send packet code`, packets.DISCONNECT_ERROR)
      ws.send(packet.getBuffer())
    }

  }
}