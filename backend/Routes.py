from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Resource, Api

app = Flask(__name__)
cors = CORS(app, origins=['http://localhost:3000']) # Update this origin when pushed to production


@app.route("/summoner_data")
def summonerData():
    return {"summonerData": ["name", "level", "champs"]}
    
@app.route("/get_summoner", methods=['POST'])
def get_summoner():
    response = request.get_json()
    print(response)
    return 'Fetched', 201


if __name__ == '__main__':
    app.run(debug = True)