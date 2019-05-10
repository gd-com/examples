extends Control

onready var NETWORK = get_node("/root/network")
onready var STORAGE = get_node("/root/storage")

func _ready():
	NETWORK.connect("message_accepted", self, 'message_accepted')
	STORAGE.connect("data_updated", self, "data_updated")
	
	for item in STORAGE.get_messages():
		var test = Label.new()
		test.text = item.message
		$MPannel/Scroll/MessagesList.add_child(test)

func data_updated():
	for item in STORAGE.get_messages():
		var message = preload("res://scenes/Message.tscn").instance()
		message.init(item.time, item.user, item.message)
		$MPannel/Scroll/MessagesList.add_child(message)

func message_accepted():
	$MPannel/Message.text = ''

func _on_Button_pressed():
	NETWORK.send_packet_message($MPannel/Message.text)
