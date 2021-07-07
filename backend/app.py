#!flask/bin/python

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, emit, send
import random
import json

app = Flask(__name__)
CORS(app)

socket = SocketIO(app)

bimList = []
# TODO: Create rooms
rooms = {
    10: { 'name': 'System Enjeering', 'current_players': 32, 'max_players': 32, 'password': 'Dat plaatje met die schommel en die boom' },
    5: { 'name': 'ICOR', 'current_players': 23, 'max_players': 24, 'password': None },
    8: { 'name': 'Ti lab', 'current_players': 10, 'max_players': 32, 'password': 'R2D2' },
    67: { 'name': 'Capita selecta', 'current_players': 56, 'max_players': 64, 'password': 'Killme' },
}

def generateBingo():
    random_words = random.sample(bimList, 16);
    return [random_words[0:4], random_words[4:8], random_words[8:12], random_words[12:16]]

# ROUTES

@app.route('/bimgo/api/newBingo', methods=['GET'])
def getNewBingo():
    return jsonify({'bimgo': generateBingo()})

@app.route('/bimgo/api/addWord', methods=['POST'])
def enterNewWord():
    if not request.json or not 'word' in request.json:
        abort(400)

    newWord = {
            'id': bimList[-1]['id'] + 1,
            'word': request.json['word']
    }

    if newWord not in bimList:
        bimList.append(newWord)

    with open("words.txt", "w") as jsonFile:
        data = json.dump(bimList, jsonFile, indent=4)

    return jsonify({'word': newWord}), 201


# SOCKETS
@socket.on('message')
def handle_message(message):
    # TODO: Handle disconnect
    # TODO: Better user id
    if message['type'] == 'room':
        if message['action'] == 'connect':
            if message['room_id'] in rooms:
                room = rooms[message['room_id']]
                if room['current_players'] < room['max_players'] - 1:
                    if room['password'] == message['password']:
                        room['current_players'] += 1
                        print('Player ' + str(room['current_players']) + ' joined room ' + str(message['room_id']))
                        emit('player_connect', {
                            'success': True,
                            'user_id': room['current_players'],
                        })
                    else:
                        print('Player could not join: ', 'Incorrect password')
                        emit('player_connect', {
                            'success': False,
                            'error': 'Incorrect password',
                        })
                else:
                    print('Player could not join: ', "Room full")
                    emit('player_connect', {
                        'success': False,
                        'error': 'Room full',
                    })
            else:
                print('Player attempt to join a non existing room', message['room_id'])
                emit('player_connect', {
                    'success': False,
                    'error': 'Could not find room',
                })
        if message['action'] == 'victory':
            if message['room_id'] in rooms:
                room = rooms[message['room_id']]
                if room['password'] == message['password']:
                    # TODO: Validate winner
                    print('Player ' + str(message['user_id']) + ' wins!')
                    emit('victory', {
                        'success': bool(random.randint(0,1)),
                        'user_id': message['user_id']
                    }, broadcast = True)
                else:
                    print('Player victory invalid: ', 'Incorrect password')
                    emit('player_connect', {
                        'success': False,
                        'error': 'Incorrect password',
                    })
            else:
                print('Player attempt to win a non existing room', message['room_id'])
                emit('player_connect', {
                    'success': False,
                    'error': 'Could not find room',
                })


@socket.on('my event')
def handle_my_custom_event(json):
    emit('my response', json)

if __name__ == '__main__':
    with open("words.txt") as jsonFile:
        bimList = json.load(jsonFile)

    # app.run(debug=True)
    socket.run(app)
