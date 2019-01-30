const { GdBuffer, addLengthFront } = require('@gd-com/utils')
const packets = require("../packets")

module.exports = {
  packet: packets.I_WANT_TO_GO_LEFT,
  process: async (uuid, socket, recieve) => {

    console.log(`[${uuid}] >> Send packet code`, packets.OK_GO_LEFT)

    let packet = new GdBuffer()
    await packet.putU16(packets.OK_GO_LEFT)

    socket.write(addLengthFront(packet.getBuffer()))
  }
}