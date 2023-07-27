from RiotApi import Riot
from SummonerStats import *
from BuildCalculator import *
from testData import *
import time

'''
The process of fetching and processing data is getting long,
so it's lowkey unavoidable to write atleast SOME tests.
'''

riot_api = Riot()

def TEST_get_match_statistics():
    '''
    test the get_match_statistics function.
    '''
    start_time = time.time()
    region = 'NA'
    summoner_name = 'YONKLE'
    stats = get_match_statistics(riot_api, summoner_name, region)
    print(f'took {time.time() - start_time} seconds to execute')
    # print(stats)
    
def TEST_calculate_average_ranks():
    '''
    This will test the calculate_average_ranks function using live data pulled from the riot API
    '''
    region = 'NA'
    summoner_name = 'pridekitt3n'

    summoner_data = riot_api.get_summoner_profile(summoner_name, region)
    match = riot_api.get_summoner_matches(summoner_name, region)
    summoners_teams = riot_api.get_summoner_profiles_from_match(match, region)
    averages = calculate_average_ranks_for_match(summoners_teams, 'soloduo')
    print(averages)

def TEST_get_matchup_info():
    '''
    This will test the get_matchup_info function 
    '''
    region = 'NA'
    summoner_name = 'FIYAH MARSHALL'
    match_history = riot_api.get_summoner_matches(summoner_name, region)
    match= match_history[0]

    player_list = get_match_participants(match)
    player_stats = calculate_player_stats(match, player_list)
    matchup_info = get_matchup_info(player_stats)
    # print(matchup_info)

def TEST_calculate_player_stats():
    '''
    This will test the calculate_player_stats function using live data pulled from the riot API
    '''
    region = 'NA'
    summoner_name = 'YONKLE'

    summoner_data = riot_api.get_summoner_profile(summoner_name, region)
    match = summoner_data['summoner_data']['match_history'][0]
    per_minute_stats = calculate_player_stats(match)
    print(per_minute_stats)

def TEST_build_item_dict():
    '''
    this tests build_item_dict
    '''
    response = build_item_dict([6672, 3006, 1053, 1038, 1054, 3340])
    print(response)

def TEST_get_rune_paths():
    '''
    this tests get_rune_paths
    '''
    response = get_rune_paths(8214, 8369)
    print(response)

def TEST_get_champion_icon():
    '''
    this tests get_champion_icon
    '''
    response = get_champion_icon("KSante")
    print(response)

def TEST_get_summoner_profile():
    '''
    this tests get_summoner_profile
    '''
    region = 'NA'
    summoner_name = 'YONKLE'

    summoner_data = riot_api.get_summoner_profile(summoner_name, region)
    print(summoner_data)

def TEST_fetch_champions():
    '''
    this tests get_summoner_profile
    '''
    start_time = time.time()
    champ_info = fetch_champions()
    print(champ_info)
    print(f'champ info fetched in {time.time()-start_time} seconds')

def TEST_fetch_items():
    '''
    this tests get_summoner_profile
    '''
    start_time = time.time()
    item_info = fetch_items()
    print(item_info)
    print(f'champ info fetched in {time.time()-start_time} seconds')

def TEST_get_build_calculator_data():
    '''
    this tests get_build_calculator_data
    '''
    start_time = time.time()
    response = get_build_calculator_data()
    print(f'champ & item info fetched in {time.time()-start_time} seconds')
    # print(response)
    print(response['champions'][0])

def TEST_parse_abilities():
    '''
    this tests get_build_calculator_data
    '''
    response = parse_abilities(RAW_ABILITY_DATA)
    print(response)

if __name__ == "__main__":
    # TEST_calculate_average_ranks()
    # TEST_calculate_player_stats()
    # TEST_get_matchup_info()
    # TEST_fetch_champions()
    # TEST_fetch_items()
    # TEST_get_build_calculator_data()
    TEST_parse_abilities()
    # TEST_get_match_statistics()
    # TEST_build_item_dict()
    # TEST_get_champion_icon()
    # TEST_get_rune_paths()
    # TEST_get_summoner_profile()


'''
big test data
'''