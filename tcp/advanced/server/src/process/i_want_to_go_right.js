const { GdBuffer, addLengthFront } = require('@gd-com/utils')
const packets = require("../packets")

module.exports = {
  packet: packets.I_WANT_TO_GO_RIGHT,
  process: (uuid, socket, recieve) => {

    console.log(`[${uuid}] >> Send packet code`, packets.OK_GO_RIGHT)

    let packet = new GdBuffer()
    packet.putU16(packets.OK_GO_RIGHT)

    socket.write(addLengthFront(packet.getBuffer()))
  }
}



