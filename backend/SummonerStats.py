'''
Statistics calculations for each summoner. Examples include solo/duo and flex winrates,
match history analyzations, etc.
'''
import time
import threading
import requests
import json
from ThreadManager import *
import re
ITEM_DATA_CONTENT_REGEX = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});') 

def calculate_winrate(wins: int, losses: int):
    '''
    Calculate the users winrate (as a PERCENTAGE) for the given wins and losses
    '''
    if not wins:
        return 0
    total_games = wins+losses
    win_ratio = wins/total_games

    return round(win_ratio * 100, 1)

def calculate_winrates(total_wins: int, total_losses: int, recent_wins: int, recent_losses: int):
    '''
    calulate the immediate & seasonal winrates for a player as well as the winrate discrepancy
    discrepancy formula: compare the immediate versus the season win rate (difference)
    '''
    seasonal_wr = calculate_winrate(total_wins, total_losses)
    immediate_wr = calculate_winrate(recent_wins, recent_losses)
    discrepancy = ((seasonal_wr - immediate_wr) / seasonal_wr) * 100

    return {'seasonal_winrate': seasonal_wr, 'immediate_winrate': immediate_wr, 'discrepancy': discrepancy}


def calculate_average_ranks_for_match(rank_data: dict, queue_type: str):
    '''
    calculate the average rank for each team, as well as the entire match (both
    teams combined). 
    '''
    #Riot MATCH V5 api designates team 1 as 100, and team 2 as 200
    if queue_type == 'soloduo':
        team_1_ranks = []
        team_2_ranks = []
        # Get rank of each player on team 1 and team 2
        for rank in rank_data[100]:
            if 'solo_data' in rank:
                team_1_ranks.append(rank['solo_data'])
            else:
                pass # unranked in this particular queue

        for rank in rank_data[200]:
            if 'solo_data' in rank:
                team_2_ranks.append(rank['solo_data'])
            else:
                pass # unranked in this particular queue

    elif queue_type == 'flex':
        team_1_ranks = []
        team_2_ranks = []
        # Get rank of each player on team 1 and team 2
        for rank in rank_data[100]:
            if 'flex_data' in rank:
                team_1_ranks.append(rank['flex_data'])
            else:
                pass # unranked in this particular queue

        for rank in rank_data[200]:
            if 'flex_data' in rank:
                team_2_ranks.append(rank['flex_data'])
            else:
                pass # unranked in this particular queue
    
    else: # if this isnt soloduo or flex, we don't care
        return {'team_1_avg': 1, 'team_2_avg': 1, 'combined_avg': 1}

    # handle unranked lobbies. This can occur during offseason, season start, etc.
    if team_1_ranks and team_2_ranks:
        team_1_avg = 0
        for rank in team_1_ranks:
            normalized_rank = normalize_rank(rank['rank'], rank['lp'])
            team_1_avg += normalized_rank
        
        team_1_avg = team_1_avg // len(team_1_ranks)

        team_2_avg = 0
        for rank in team_2_ranks:
            normalized_rank = normalize_rank(rank['rank'], rank['lp'])
            team_2_avg += normalized_rank

        team_2_avg = team_2_avg // len(team_2_ranks)
        game_average = (team_1_avg + team_2_avg) // 2

    else:
        team_1_avg, team_2_avg = -500, -500
        game_average = -500

    return {'team_1_avg': lp_to_rank(team_1_avg), 'team_2_avg': lp_to_rank(team_2_avg), 'combined_avg': lp_to_rank(game_average)}


def lp_to_rank(lp_value):
    '''
    This function is to be used when calculating average rank values using total LP value.
    We use the special (and impossible for a player to have) value of -500 to identify unranked players
    '''
    if lp_value == -500:
        return "UNRANKED"

    # Borderline ranks (0 lp within division or currently in promotional series)
    if lp_value == 400: # iron/bronze
        return "IRON/BRONZE"
    elif lp_value == 800: # bronze/silver
        return "BRONZE/SILVER"
    elif lp_value == 1200: # silver/gold
        return "SILVER/GOLD"
    elif lp_value == 1600: # gold/plat
        return "GOLD/PLATINUM"
    elif lp_value == 2000: # plat/diamond
        return "PLATINUM/DIAMOND"
    elif lp_value == 2400: # diamond/masters
        return "DIAMOND/MASTERS"

    # Get tier, then get division
    rank = []
    if 0 <= lp_value < 400: # iron
        rank = 'IRON'
        division = get_division(lp_value, 0, 399, 100, 200, 300)

    elif 400 < lp_value < 800: # bronze
        rank =  'BRONZE'
        division = get_division(lp_value, 400, 799, 500, 600, 700)

    elif 800 < lp_value < 1200: # silver
        rank = 'SILVER'
        division = get_division(lp_value, 800, 1199, 900, 1000, 1100)

    elif 1200 < lp_value < 1600: # gold
        rank = 'GOLD'
        division = get_division(lp_value, 1200, 1599, 1300, 1400, 1500)
            
    elif 1600 < lp_value < 2000: # plat
        rank = 'PLATINUM' 
        division = get_division(lp_value, 1600, 1999, 1700, 1800, 1900)
    elif 2000 < lp_value < 2400: # diamond
        rank = 'DIAMOND'
        division = get_division(lp_value, 2000, 2399, 2100, 2200, 2300)

    return f'{rank} {division}'


def calculate_kd(kills: int, deaths: int):
    '''
    calculate the kill/death ratio. 
    '''
    return round(kills/deaths, 1) if deaths else 0


def calculate_kda(kills: int, assists: int, deaths: int):
    '''
    calculate the kill&assist/death ratio. 
    '''
    return round((kills+assists)/deaths, 1) if (kills or assists) else 0


def calculate_player_stats(match: dict, player_list: list):
    '''
    calculate stats per player in a league of legends match
    '''
    player_stats = {}
    if not match['info']['gameEndTimestamp']:
        total_match_time = (match['info']['gameDuration'] * 1000) / 60 # convert milliseconds (per riot docs) to minutes
    else:
        total_match_time = (match['info']['gameDuration']) / 60 # convert seconds to minutes

    for player in player_list:
        per_minute_stats = {
            'assists_pm': int(player['assists']),
            'deaths_pm': int(player['deaths']),
            'kills_pm': int(player['kills']),
            'gold_earned_pm': int(player['goldEarned']),
            'vision_score_pm': int(player['visionScore']),
            'wards_killed_pm': int(player['wardsKilled']),
            'ward_placed_pm': int(player['wardsPlaced']),
        }

        for key in per_minute_stats:
            per_minute_stats[key] = round(per_minute_stats[key] / total_match_time, 1)

        player_stats[player['summonerName']] = {
            'name': player['summonerName'],
            'per_minute_stats': per_minute_stats,
            'position': player['teamPosition'],
            'kills': player['kills'],
            'deaths': player['deaths'],
            'assists': player['assists'],
            'champion': player['championName'],
            'champ_icon': get_champion_icon(player['championName']),
            'win': player['win'],
            'team_id': player['teamId'],
            'items': build_item_dict([
                player['item0'],
                player['item1'],
                player['item2'],
                player['item3'],
                player['item4'],
                player['item5'],
                player['item6'],
            ]),

            'dragons_taken': int(player['dragonKills']),
            'barons_taken': int(player['baronKills']),
            'dragons_taken': int(player['dragonKills']),
            'turrets_destroyed': int(player['turretKills']),
            'total_damage_dealt_to_turrets': int(player['damageDealtToTurrets']),
            'total_cs': int(player['totalMinionsKilled']),
            'total_gold_earned': int(player['goldEarned']),
            'total_gold_spent': int(player['goldSpent']),
            'total_damage_dealt': int(player['totalDamageDealt']),
            'total_damage_dealt_to_champs': int(player['totalDamageDealtToChampions']),
            'total_damage_taken': int(player['totalDamageTaken']),
        }

    return player_stats # key = player identifier (summonerName), val = dict of stats


def get_matchup_info(player_list: list):
    '''
    order matchup info
    '''
    matchup_data = {
        'top_matchup': [],
        'jungle_matchup': [],
        'mid_matchup': [],
        'bot_matchup': [],
        'support_matchup': []
    }
    
    team_1, team_2 = [], []
    for player_name in player_list.keys():
        player = player_list[player_name]
        if player['team_id'] == 100:
            team_1.append(player)                
        else:
            team_2.append(player)

    for player in team_1:
        if player['position'] == 'TOP':
            matchup_data['top_matchup'].append(player)
        elif player['position'] == 'MIDDLE':
            matchup_data['mid_matchup'].append(player)
        elif player['position'] == 'JUNGLE':
            matchup_data['jungle_matchup'].append(player)
        elif player['position'] == 'BOTTOM':
            matchup_data['bot_matchup'].append(player)
        elif player['position'] == 'UTILITY':
            matchup_data['support_matchup'].append(player)
    
    for player in team_2:
        if player['position'] == 'TOP':
            matchup_data['top_matchup'].append(player)
        elif player['position'] == 'MIDDLE':
            matchup_data['mid_matchup'].append(player)
        elif player['position'] == 'JUNGLE':
            matchup_data['jungle_matchup'].append(player)
        elif player['position'] == 'BOTTOM':
            matchup_data['bot_matchup'].append(player)
        elif player['position'] == 'UTILITY':
            matchup_data['support_matchup'].append(player)

    return [matchup for matchup in matchup_data.values()]

def normalize_rank(full_rank, lp):
    '''
    Take a player's rank and normalize it. This formula was provided by Marvin
    '''
    tier = full_rank[0]
    division = full_rank[1]
    rank_value = 0

    #tier calculations
    if 'iron' in tier.lower():
        rank_value += 0
    if 'bronze' in tier.lower():
        rank_value += 400
    elif 'silver' in tier.lower():
        rank_value += 800
    elif 'gold' in tier.lower():
        rank_value += 1200
    elif 'platinum' in tier.lower():
        rank_value += 1600
    elif 'diamond' in tier.lower():
        rank_value += 2000

    # divisional calculations
    if division == 'IV':
        rank_value += 0
    if division == 'III':
        rank_value += 100
    elif division == 'II':
        rank_value += 200
    elif division == 'I':
        rank_value += 300

    # Consider lp standing within division
    rank_value += lp

    return rank_value


# Below are 'Get' functions (generally data wrangling functions)

def get_match_participants(match: dict):
    '''
    Return a list of participants from a particular match.

    Note: this list will include the ENTIRE participant entry from the match
    '''
    return [participant for participant in match['info']['participants']]


def get_match_participants_as_teams(match: dict):
    '''
    Get participants for team 1 and 2 respectively from a match object.
    Documentation here: https://developer.riotgames.com/apis#match-v5/GET_getMatch
    Note that the participant object is named 'ParticipantDto'
    '''
    team_1, team_2 = [], []
    participants = match['info']['participants']

    for participant in participants:
        if participant['team_id'] == 100:
            team_1.append(participant)
        else:
            team_2.append(participant)
                
    return (team_1, team_2)


def get_division(lp_value, minimum, maximum, tier_4, tier_3, tier_2):
    '''
    This function is used with the lp_to_rank function. This calculates what division
    a player is in given an lp value and thresholds. You MUST subtract 1 from the minimum and 
    maximum parameters before calling this function, and delegate borderline ranks (i.e 0 lp) to the lp_to_rank function
    
    Note that ALL PARAMETERS ARE INCLUSIVE
    '''
    if tier_2 <= lp_value <= maximum:
        return 'I'
    elif tier_3 <= lp_value <= tier_2:
        return 'II'
    elif tier_4 <= lp_value <= tier_3:
        return 'III'
    elif minimum <= lp_value <= tier_4:
        return 'IV'
    else:
        return None # Values are invalid 


def get_match_statistics(riot_api: object, summoner_name: str, region: str):
    '''
    Calculate and return statistics (AND OTHER DATA WE WILL DISPLAY) for each match in a player's match history.
    This process is very slow (20+ seconds)
    '''
    match_history = riot_api.get_summoner_matches(summoner_name, region)
    summoner_profile_fetching_threads = []
    historical_match_data = []
    interval = 0 # Handle rate limits by waiting this time (in seconds) between match fetching

    # Handle exceeding rate limits
    if match_history == 0:
        print('Rate limit exceeded')
        return 'Rate limit exceeded'

    for i in range(3): # Fetch the last 3 matches (this should be updated later. details in ticket)
        match = match_history[i]
        if 'message' in match and match['message'] == 'Rate limit exceeded':
            print('Rate limit exceeded')
            continue
        try:
            thread = threading.Thread(target=fetch_match_data, args=[riot_api, match, summoner_name, region, historical_match_data])
            thread.start()
        except:
            print('Exception caught within thread.')

        time.sleep(interval)
        summoner_profile_fetching_threads.append(thread)

    monitor_thread_pool(summoner_profile_fetching_threads)

    # print(f'match objects fetched in {time.time() - start_time} seconds')
    return historical_match_data

def fetch_match_data(riot_api, match, summoner_name, region, historical_match_data):
    '''
    build a match object to be appeneded to the record of historical match data
    '''
    summoners_teams = riot_api.get_summoner_profiles_from_match(match, region)
    
    player_list = get_match_participants(match)
    player_stats = calculate_player_stats(match, player_list)
    average_ranks = calculate_average_ranks_for_match(summoners_teams, 'soloduo') # average rank per team is here
    if not match['info']['gameEndTimestamp']:
        total_match_time = (match['info']['gameDuration'] * 1000) / 60 # convert milliseconds (per riot docs) to minutes
    else:
        total_match_time = (match['info']['gameDuration']) / 60 # convert seconds to minutes
    queue_type = get_queue_type(match['info']['queueId'])

    matchup_info = get_matchup_info(player_stats)

    # Get information related to the target summoner
    target_summoner_info = get_summoner_info_for_match(summoner_name, summoners_teams, player_list, match, total_match_time)
    
    if queue_type != 'unsupported':
        historical_match_data.append({
            'player_stats': player_stats, 
            'average_ranks': average_ranks, 
            'match_length': total_match_time,
            'target_summoner_info': target_summoner_info,
            'matchup_info': matchup_info,
            'queue_type': queue_type
        })
    return historical_match_data


def get_summoner_info_for_match(summoner_name: str, summoners_teams: dict, player_list: list, match: dict, total_match_time: int):
    '''
    Get the information of a particular summoner. This is intended to be used with the
    get_summoner_profiles_from_match function
    '''
    summoner_info = {}
    summoner_name = summoner_name.replace(' ', '')

    for summoner in player_list:
        name = summoner['summonerName'].replace(' ', '')
        name = name.upper()
        if summoner_name.upper() == name:
            summoner_info['champion'] = summoner['championName']
            summoner_info['champion_img_link'] = get_champion_icon(summoner['championName'])
            summoner_info['position'] = summoner['teamPosition']
            summoner_info['cs'] = summoner['totalMinionsKilled']
            summoner_info['wards_placed'] = summoner['wardsPlaced']
            summoner_info['control_wards_placed'] = summoner['detectorWardsPlaced']
            summoner_info['wards_destroyed'] = summoner['wardsKilled']
            summoner_info['vision_score'] = summoner['visionScore']

            summoner_info['cs_pm'] = round((summoner_info['cs'] / total_match_time), 1)
            summoner_info['win'] = summoner['win']
            summoner_info['kills_assists_deaths'] = [
                summoner['kills'],
                summoner['assists'],
                summoner['deaths']
            ]
            summoner_info['kd'] = calculate_kd(summoner['kills'], summoner['deaths'])
            summoner_info['kda'] = calculate_kda(
                summoner['kills'], 
                summoner['assists'], 
                summoner['deaths']
            )
            summoner_info['items'] = build_item_dict([
                summoner['item0'],
                summoner['item1'],
                summoner['item2'],
                summoner['item3'],
                summoner['item4'],
                summoner['item5'],
                summoner['item6'],
            ])
            summoner_info['summoner_spells'] = get_summoner_spell_paths(summoner['summoner1Id'], summoner['summoner2Id'])
            summoner_info['runes'] = get_rune_paths(summoner['perks']['styles'][0]['selections'][0]['perk'], 
                                                    summoner['perks']['styles'][1]['selections'][0]['perk']
                                                    )
            break

    for team in summoners_teams.values():
        for summoner in team:
            if summoner['summoner_name'] == summoner_name:

                # Get rank
                if match['info']['queueId'] == 420 and 'solo_data' in summoner:
                    summoner_info['rank'] = summoner['solo_data']['rank']
                elif match['info']['queueId'] == 440 and 'flex_data' in summoner:
                    summoner_info['rank'] = summoner['flex_data']['rank']
                else:
                    summoner_info['rank'] = 'N/A'

    return summoner_info


def get_summoner_spell_paths(summoner_id1: int, summoner_id2: int):
    '''
    Get paths for summoner spell icons
    '''
    url = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells.json'
    base_summoner_path = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/'
    response = requests.get(url)
    json = response.json()
    summoner_spell_response = []
    for icon_data in json:
        if summoner_id1 == icon_data['id'] or summoner_id2 == icon_data['id']:
            subpath = icon_data['iconPath'].lower().split('/')[-1]
            summoner_spell_response.append(base_summoner_path+subpath)

        if len(summoner_spell_response) == 2:
            break

    return summoner_spell_response


def get_champion_icon(champ_name: str):
    '''
    get the icon for a given champion name
    '''
    url = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json'
    base_icon_path = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/'
    response = requests.get(url)
    json = response.json()
    for champ_data in json:
        if champ_data['alias'].lower() == parse_champ_name(champ_name):
            subpath = champ_data['squarePortraitPath']
            return base_icon_path+subpath.split('/')[-1]


def parse_champ_name(name: str):
    '''
    Convert champion name to its cdragon equivalent so we can pull loading screen art, portraits, etc
    in the get_champion_splash_icon function and get_champ_icon function
    '''
    name = name.replace("'", "")
    name = name.replace(' ', '').replace('.', '')
    return name.lower()


def get_rune_paths(rune1: int, rune2: int):
    '''
    Get paths for summoner rune icons
    '''
    url = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json'
    base_rune_path = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/'
    response = requests.get(url)
    json = response.json()
    rune_response = []

    for rune_data in json:
        if rune_data['id'] == rune1:
            raw_asset_subpath = rune_data['iconPath'].lower()
            asset_subpath = raw_asset_subpath[raw_asset_subpath.find('styles'):]

            rune_response.append(base_rune_path+asset_subpath)

        elif rune_data['id'] == rune2: # For secondary runes, we'll just show what tree (i.e Inspiration) it belongs to
            raw_asset_subpath = rune_data['iconPath'].lower()
            if 'inspiration' in raw_asset_subpath:
                tree_icon_path = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7203_whimsy.png'
            elif 'domination' in raw_asset_subpath:
                tree_icon_path = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7200_domination.png'
            elif 'precision' in raw_asset_subpath:
                tree_icon_path = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7201_precision.png'
            elif 'resolve' in raw_asset_subpath:
                tree_icon_path = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7204_resolve.png'
            else: # sorcery tree
                tree_icon_path = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7202_sorcery.png'
            rune_response.append(tree_icon_path)

        if len(rune_response) == 2:
            break
            
    return rune_response


def build_item_dict(items: list):
    '''
    Get the image links for each item, along with their description.
    Note that the item response is ordered (and will be rendered of the 
    frontend in the order the dict is constructed here)
    '''
    url = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json'
    base_item_path = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/'
    response = requests.get(url)
    json = response.json()
    item_response = []
    for item_data in json:
       for item_id in items:
            if item_id == item_data['id']:
                asset_subpath = item_data['iconPath'].lower().split('/')[-1]
                response = {
                    'icon_path': base_item_path+asset_subpath,
                    'name': item_data['name'],
                    'description': remove_html_tags(item_data['description'])
                }
                if 'Mythic Passive' in response['description']:
                    response['tier'] = 'mythic'
                else:
                    response['tier'] = 'basic'

                if (response['tier'] == 'mythic'):
                    item_response = [response] + item_response
                else:
                    item_response.append(response)


    return item_response


def remove_html_tags(raw_html: str):
    '''
    Remove html tags from raw string text to get only the content
    '''
    cleantext = re.sub(ITEM_DATA_CONTENT_REGEX, '', raw_html)
    return cleantext


def get_queue_type(queueId: int):
    '''
    convert integer queue type to its integer representation
    '''
    if queueId == 400:
        return 'Draft Pick'
    elif queueId == 420:
        return 'Ranked Solo'
    elif queueId == 430:
        return 'Blind Pick'
    elif queueId == 440:
        return 'Ranked Flex'
    elif queueId == 450:
        return 'Aram'
    else:
        return 'unsupported'


# Summoner stats file. To test the functions in this file, please use the tests.py file