from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Resource, Api
from RiotApi import Riot

app = Flask(__name__)
cors = CORS(app, origins=['http://localhost:3000']) # Update this origin when pushed to production
riot_api = Riot('RGAPI-916d86bb-ba3a-4eff-9c13-c28b5649658d') #update this key before launch
    
@app.route("/get_summoner", methods=['POST'])
def get_summoner():
    query = request.get_json()
    response = riot_api.get_summoner_profile(query['username'], query['region'])
    return response, 201

@app.route("/get_summoner_by_name", methods=['POST'])
def get_summoner_by_name():
    query = request.get_json()
    response = riot_api.get_summoner_by_name(query['username'], query['region'])
    return response, 201


if __name__ == '__main__':
    app.run(debug = True)