from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Resource, Api
from RiotApi import Riot
import os
from SummonerStats import get_match_statistics
from BuildCalculator import get_build_calculator_data
from dotenv import load_dotenv

# Implementation and usage notes:
# Each endpoint from the riot API should be called AT MOST ONCE per route in this file.
# If an endpoint is called multiple times in a single route, then there has been a serious
# architectural flaw, or (more likely) the route logic should be re-written 


app = Flask(__name__)
load_dotenv('.env')
cors = CORS(app, origins=[os.getenv('FLASK_API_ORIGIN')]) # Update this origin when pushed to production
riot_api = Riot()

@app.route("/get_summoner", methods=['POST'])
def get_summoner():
    # Get summoner data INCLUDING match history
    query = request.get_json()
    if not query:
        return {'status': 0, 'summoner_data': None}
    else:
        summoner_profile = riot_api.get_summoner_profile(query['username'], query['region'])
        if not summoner_profile['status']:
            return {}, 404
        else:
            summoner_profile = summoner_profile['summoner_data']

        response = {
            'status': 1, 
            'summoner_data': summoner_profile, 
        }
        return response, 200
    
@app.route("/get_match_data", methods=['POST'])
def get_match_data():
    '''
    Get match history + statistics for a given summoner
    '''
    query = request.get_json()
    match_history = get_match_statistics(riot_api, query['username'], query['region']) # VERY DANGEROUS, PASSING THE API IS BAD.
    response = {'status': 1, 'match_history': match_history}
    return response, 201

@app.route("/get_data_for_build_calculator", methods=['GET'])
def get_data_for_build_calculator():
    '''
    Get match history + statistics for a given summoner
    '''
    response = get_build_calculator_data()
    return {'status': 1, 'calculator_data': response}, 201

@app.route("/summoner_exists_by_name", methods=['POST'])
def summoner_exists_by_name():
    # Get summoner account information via summonerName
    query = request.get_json()
    if not query:
        return {'status': 0, 'summoner_data': None}
    else:
        response = riot_api.summoner_exists(query['username'], query['region'])
        return response, 201

@app.route("/tft_summoner_exists", methods=['POST'])
def tft_summoner_exists_by_name():
    query = request.get_json()
    if not query:
        return {'status': 0, 'summoner_data': None}
    else:
        response = riot_api.tft_summoner_exists(query['username'], query['region'])
        return response, 201

@app.route("/get_tft_summoner", methods=['POST'])
def get_tft_summoner():
    query = request.get_json()

    if not query:
        return {'status': 0, 'summoner_data': None}
    else:
        response = riot_api.get_tft_summoner_profile(query['username'], query['region'])
        return response, 201
    
if __name__ == '__main__':
    app.run()