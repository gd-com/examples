#tcp.gd
extends SceneTree

var connection = null
var peerstream = null
var values = []
var test = null
var packetBuffer = null
var dataLength = null

func _init():
    print("Start client TCP")
    # Connect
    connection = StreamPeerTCP.new()
    connection.connect_to_host("127.0.0.1", 9090)
    peerstream = PacketPeerStream.new()
    peerstream.set_stream_peer(connection)

    var buffer = StreamPeerBuffer.new()
    buffer.put_u16(5)
    buffer.put_var('test')
    buffer.put_var('854162aqsd')
    values.push_back(buffer.get_data_array())

    while(true):

        if connection.is_connected_to_host() :
            if connection.get_available_bytes() > 0 && dataLength == null:
                dataLength = connection.get_u32()
                var packetType = connection.get_u16()
                if packetType == 6:
                    print("RECIEVE login SUCCESS")
                if packetType == 7:
                    print("RECIEVE login FAILED")
                dataLength = null

            if values.size() > 0:
                test = values.pop_front()
                peerstream.put_packet(test)
                print("SEND : " + str(test))

            if values.size() <= 0 :
                break
    quit()