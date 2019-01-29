#tcp.gd
extends SceneTree

var connection = null
var peerstream = null
var values = [
    true,false,
    1, -1, 500, -500,
    1.2, -1.2, 50.1, -50.1, 80.852078542,
    "test1", "test2", "test3"
]
var test = null

func _init():
    print("Start client TCP")
    # Connect
    connection = StreamPeerTCP.new()
    connection.connect_to_host("127.0.0.1", 9090)
    peerstream = PacketPeerStream.new()
    peerstream.set_stream_peer(connection)
    peerstream.put_var(null)

    while(true):
        if connection.is_connected_to_host() && connection.get_available_bytes() > 0 :
            test = connection.get_var()
            print(test)
            peerstream.put_var(values.pop_front())
        if values.size() <= 0 :
            break
    quit()