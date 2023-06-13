from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Resource, Api
from RiotApi import Riot

app = Flask(__name__)
cors = CORS(app, origins=['http://localhost:3000']) # Update this origin when pushed to production
riot_api = Riot()
    
@app.route("/get_summoner", methods=['POST'])
def get_summoner():
    # Get summoner data INCLUDING match history
    
    query = request.get_json()
    if not query:
        return {'status': 0, 'summoner_data': None}
    else:
        response = riot_api.get_summoner_profile(query['username'], query['region'])
        return response, 201

@app.route("/summoner_exists_by_name", methods=['POST'])
def summoner_exists_by_name():
    # Get summoner account information via summonerName
    query = request.get_json()
    if not query:
        return {'status': 0, 'summoner_data': None}
    else:
        response = riot_api.summoner_exists(query['username'], query['region'])
        return response, 201


if __name__ == '__main__':
    app.run(debug = True)