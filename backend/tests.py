from RiotApi import Riot
from SummonerStats import *
from BuildCalculator import *
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
    # print(item_info)
    # print(item_info[100]['subitems']) # this should be wits end
    print(len(item_info))
    # print(f'champ info fetched in {time.time()-start_time} seconds')

def TEST_get_build_calculator_data():
    '''
    this tests get_build_calculator_data
    '''
    start_time = time.time()
    response = get_build_calculator_data()
    print(f'champ & item info fetched in {time.time()-start_time} seconds')
    # print(response)
    print(response['champions'][0])

def TEST_parse_description():
    description = '<mainText><stats><attention> 40</attention> Attack Damage<br><attention> 30%</attention> Attack Speed<br><attention> 20%</attention> Critical Strike Chance</stats><br><li><passive>Bring It Down:</passive> Every third Attack deals additional physical damage. Repeated triggers on the same target increase the damage dealt.</mainText><br>'
    description_2 = '<mainText><stats><ornnBonus> 500</ornnBonus> Health<br><ornnBonus> 40</ornnBonus> Armor<br><ornnBonus> 40</ornnBonus> Magic Resist<br><ornnBonus> 15</ornnBonus> Ability Haste</stats><br><li><passive>Guiding Light:</passive> Upon casting your Ultimate you Transcend, increasing your Max Health. While Transcended you and allies heal over time.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items Health.</mainText><br>'
    description_3 = '<mainText><stats><nerfedStat> 300</nerfedStat> Health<br><attention> 30</attention> Armor<br><attention> 30</attention> Magic Resist<br><nerfedStat> 10</nerfedStat> Ability Haste</stats><br><li><passive>Voidborn Resilience:</passive> For each second in champion combat gain a stack granting <scaleArmor>Armor</scaleArmor> and <scaleMR>Magic Resist</scaleMR>, up to 8 stacks max. At max stacks become empowered, instantly draining enemies around you for magic damage, healing yourself, and increasing your bonus resist until end of combat.<br><br><rarityMythic>Mythic Passive:</rarityMythic> Grants all other <rarityLegendary>Legendary</rarityLegendary> items <attention>  Armor and  Magic Resist</attention>.</mainText><br>'
    response = parse_description(description_2)
    print(response)

if __name__ == "__main__":
    # TEST_calculate_average_ranks()
    # TEST_calculate_player_stats()
    # TEST_get_matchup_info()
    # TEST_fetch_champions()
    # TEST_parse_description()
    TEST_fetch_items()
    # TEST_get_build_calculator_data()
    # TEST_get_match_statistics()
    # TEST_build_item_dict()
    # TEST_get_champion_icon()
    # TEST_get_rune_paths()
    # TEST_get_summoner_profile()

