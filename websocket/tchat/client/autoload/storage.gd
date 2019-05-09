extends Node

signal data_updated

var initial_data = {
	'id': null,
	'username': null,
	'users': {},
	'messages': []
}

var _data = initial_data.duplicate(true)

func set_id(id):
	_data.id = id
	emit_signal("data_updated")

func get_id():
	return _data.id
	
func set_username(username):
	_data.username = username
	emit_signal("data_updated")

func get_username():
	return _data.username

func set_users(users):
	_data.users = users
	emit_signal("data_updated")

func get_users():
	return _data.users

func add_message(message):
	_data.messages.push_back(message)
	emit_signal("data_updated")

func set_messages(messages):
	_data.messages = messages
	emit_signal("data_updated")

func get_messages():
	return _data.messages

func reset():
	_data = initial_data.duplicate(true)
	emit_signal("data_updated")