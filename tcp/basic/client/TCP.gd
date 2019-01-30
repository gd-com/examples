extends Node

var connection = null
var peerstream = null
var values = [
    true,false,
    1, -1, 500, -500,
    1.2, -1.2, 50.1, -50.1, 80.852078542,
    "test1", "test2", "test3"
]
var test = null

func _ready():
    print("Start client TCP")
    # Connect
    connection = StreamPeerTCP.new()
    connection.connect_to_host("127.0.0.1", 9090)
    peerstream = PacketPeerStream.new()
    peerstream.set_stream_peer(connection)

func _process(delta):
    if connection.is_connected_to_host():
        if connection.get_available_bytes() > 0 :
            test = connection.get_var()
            print(test)
        if values.size() > 0 :
           peerstream.put_var(values.pop_front())