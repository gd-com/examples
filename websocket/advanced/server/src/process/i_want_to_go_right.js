const { GdBuffer } = require('@gd-com/utils')
const packets = require("../packets")

module.exports = {
  packet: packets.I_WANT_TO_GO_RIGHT,
  process: (uuid, ws, recieve) => {
    let data = new GdBuffer(Buffer.from(recieve))
    let extra = data.getString()

    console.log(`With I_WANT_TO_GO_RIGHT packet i recieve : "${extra}"`)

    console.log(`[${uuid}] >> Send packet code`, packets.OK_GO_RIGHT)

    let packet = new GdBuffer()
    packet.putU16(packets.OK_GO_RIGHT)
    packet.putString('thanks !')

    ws.send(packet.getBuffer())
  }
}



