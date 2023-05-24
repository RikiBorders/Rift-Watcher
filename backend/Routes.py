from flask import Flask, jsonify, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)


class SummonerData(Resource):
    # Summoner Specific Data
  
    def get(self):
        # call a function to get summoner data here
        return jsonify({'message': 'summoner data here'})
    

class LeagueData(Resource):
    # Meta-data related to league as a whole
  
    def get(self):
        # call a function to get summoner data here
        return jsonify({'message': 'summoner data here'})
    

api.add_resource(SummonerData, '/')


if __name__ == '__main__':
    app.run(debug = True)