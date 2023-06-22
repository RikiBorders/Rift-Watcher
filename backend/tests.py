from RiotApi import Riot
from SummonerStats import *

'''
The process of fetching and processing data is getting long,
so it's lowkey unavoidable to write atleast SOME tests.
'''

riot_api = Riot()

def TEST_get_match_statistics():
    '''
    test the get_match_statistics function. This will only grab the last 5 games
    '''
    region = 'NA'
    summoner_name = 'SL1MEBALL'
    stats = get_match_statistics(riot_api, summoner_name, region)
    print(stats)
    
def TEST_calculate_average_ranks():
    '''
    This will test the calculate_average_ranks function using live data pulled from the riot API
    '''
    region = 'NA'
    summoner_name = 'PRIDEKITTEN'

    summoner_data = riot_api.get_summoner_profile(summoner_name, region)
    match = riot_api.get_summoner_matches(summoner_name, region)
    summoners_teams = riot_api.get_summoner_profiles_from_match(match, region)
    averages = calculate_average_ranks_for_match(summoners_teams, 'soloduo')
    print(averages)

def TEST_calculate_player_stats():
    '''
    This will test the calculate_player_stats function using live data pulled from the riot API
    '''
    region = 'NA'
    summoner_name = 'SL1MEBALL'

    summoner_data = riot_api.get_summoner_profile(summoner_name, region)
    match = summoner_data['summoner_data']['match_history'][0]
    per_minute_stats = calculate_player_stats(match)
    print(per_minute_stats)


if __name__ == "__main__":
    # TEST_calculate_average_ranks()
    # TEST_calculate_player_stats()
    TEST_get_match_statistics()