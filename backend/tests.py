from RiotApi import Riot
from SummonerStats import *

'''
The process of fetching and processing data is getting long,
so it's lowkey unavoidable to write atleast SOME tests.
'''

riot_api = Riot('RGAPI-3a6ad5d2-cd5a-4699-8918-be037d694228') #update this key before launch

def TEST_calculate_average_ranks():
    region = 'NA'
    summoner_name = 'SL1MEBALL'

    summoner_data = riot_api.get_summoner_profile(summoner_name, region)
    match = summoner_data['summoner_data']['match_history'][0]
    summoners = riot_api.get_summoner_profiles_from_match(match, region)
    calculate_average_ranks(summoners)