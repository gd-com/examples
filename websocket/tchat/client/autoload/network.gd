extends Node

onready var STORAGE = get_node('/root/storage')

signal message_accepted

var ws = null

func _ready():
	ws = WebSocketClient.new()
	ws.connect("connection_established", self, "_connection_established")
	ws.connect("connection_closed", self, "_connection_closed")
	ws.connect("connection_error", self, "_connection_error")

func _connection_established(protocol):
	print("Connection Established With Protocol: ", protocol)

func _connection_closed(was_clean_close):
	if was_clean_close:
		print("Connection Closed properly")
	else:
		print("Connection Closed")
	STORAGE.reset()
	ws = WebSocketClient.new()

func _connection_error():
	print("Connection Error")

func _process(delta):
	if ws.get_connection_status() == ws.CONNECTION_CONNECTING || ws.get_connection_status() == ws.CONNECTION_CONNECTED:
		ws.poll()

	if ws.get_peer(1).is_connected_to_host() && ws.get_peer(1).get_available_packet_count() > 0:
		var packet = ws.get_peer(1).get_packet()
		var buffer = StreamPeerBuffer.new()
		buffer.set_data_array(packet)

		var type = buffer.get_u16()
		print("We recieve packet type : %s" % type)
		match type:
			1:
				var id = buffer.get_utf8_string()
				STORAGE.set_id(id)
			1001:
				var login = buffer.get_utf8_string()
				STORAGE.set_username(login)
			1002:
				print("Connexion failed .... !")
			2001:
				ws.disconnect_from_host()
				STORAGE.reset()
			3001:
				emit_signal("message_accepted")
				STORAGE.add_message({
					"user": STORAGE.get_id(),
					"time": buffer.get_utf8_string(),
					"message": buffer.get_utf8_string()
				})
			3003:
				STORAGE.add_message({
					"user": "coucou",
					"time": "coucou",
					"message": "coucou"
				})

func init_connection(url):
	print("Connecting to " + url)
	ws.connect_to_url(url)

func send_packet(data):
	if ws && ws.get_peer(1).is_connected_to_host():
		ws.get_peer(1).put_packet(data)
	else:
		print('Cannot send packet to unconnected server')
		
func send_packet_connect(login):
	var buffer = StreamPeerBuffer.new()
	buffer.put_u16(1000)
	buffer.put_string(login)
	send_packet(buffer.get_data_array())
	
func send_packet_disconnect():
	var buffer = StreamPeerBuffer.new()
	buffer.put_u16(2000)
	send_packet(buffer.get_data_array())
	
func send_packet_message(message):
	var buffer = StreamPeerBuffer.new()
	buffer.put_u16(3000)
	buffer.put_string(message)
	send_packet(buffer.get_data_array())
