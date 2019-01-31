const { GdBuffer } = require('@gd-com/utils')
const packets = require("../packets")

module.exports = {
  packet: packets.I_WANT_TO_GO_LEFT,
  process: async (client, server, remote, data) => {

    console.log(`[${client.uuid}] >> Send packet code`, packets.OK_GO_LEFT)

    let packet = new GdBuffer()
    await packet.putU16(packets.OK_GO_LEFT)

    server.send(packet.getBuffer(), remote.port, remote.address)
  }
}