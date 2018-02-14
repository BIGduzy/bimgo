#!flask/bin/python

from flask import Flask, jsonify, request
import random
import json

app = Flask(__name__)

bimList = []

def generateBingo():
    return random.sample(bimList, 16)

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

if __name__ == '__main__':
    with open("words.txt") as jsonFile:
        bimList = json.load(jsonFile)

    app.run(debug=True)
