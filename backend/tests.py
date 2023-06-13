from RiotApi import Riot
from SummonerStats import *

'''
The process of fetching and processing data is getting long,
so it's lowkey unavoidable to write atleast SOME tests.
'''

riot_api = Riot()

def TEST_calculate_average_ranks():
    '''
    This will test the calculate_average_ranks using live data pulled from the riot API
    '''
    region = 'NA'
    summoner_name = 'SL1MEBALL'

    summoner_data = riot_api.get_summoner_profile(summoner_name, region)
    match = summoner_data['summoner_data']['match_history'][0]
    summoners_teams = riot_api.get_summoner_profiles_from_match(match, region)
    averages = calculate_average_ranks_for_match(summoners_teams, 'soloduo')
    print(averages)

if __name__ == "__main__":
    TEST_calculate_average_ranks()