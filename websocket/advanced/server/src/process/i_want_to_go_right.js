const { GdBuffer } = require('@gd-com/utils')
const packets = require("../packets")

module.exports = {
  packet: packets.I_WANT_TO_GO_RIGHT,
  process: async (uuid, ws, recieve) => {
    let data = new GdBuffer(Buffer.from(recieve))
    let extra = await data.getString()

    console.log(`With I_WANT_TO_GO_RIGHT packet i recieve : "${extra}"`)

    console.log(`[${uuid}] >> Send packet code`, packets.OK_GO_RIGHT)

    let packet = new GdBuffer()
    await packet.putU16(packets.OK_GO_RIGHT)
    await packet.putString('thanks !')

    ws.send(packet.getBuffer())
  }
}



