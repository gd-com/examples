extends Node

onready var NETWORK = get_node("/root/network")
onready var STORAGE = get_node("/root/storage")

func _ready():
	STORAGE.connect("data_updated", self, "data_updated")
	$Username.editable = false
	$Button_Disconnect.visible = false

func _on_Button_pressed():
	if STORAGE.get_id() != null:
		NETWORK.send_packet_connect($Username.text)
	else:
		NETWORK.init_connection($Url.text)

func data_updated():
	if STORAGE.get_id() == null:
		$Url.editable = true
		$Username.editable = false
		$Username.text = ''
		$Button_Disconnect.visible = false
		$Button_Connect.text = 'Connect'
	
	if STORAGE.get_id() != null && STORAGE.get_username() == null:
		$Url.editable = false
		$Username.editable = true
		$Button_Disconnect.visible = true
		$Button_Connect.text = 'Continue with username'
	
	if STORAGE.get_id() != null && STORAGE.get_username() != null:
		get_tree().change_scene('res://scenes/Tchat.tscn')

func _on_Button_Disconnect_pressed():
	if STORAGE.get_id() != null:
		NETWORK.send_packet_disconnect()
