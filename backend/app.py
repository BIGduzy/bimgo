#!flask/bin/python

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import random
import json

app = Flask(__name__)
CORS(app)

bimList = []

def generateBingo():
    random_words = random.sample(bimList, 16);
    return [random_words[0:4], random_words[4:8], random_words[8:12], random_words[12:16]]

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
