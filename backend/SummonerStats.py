'''
Statistics calculations for each summoner. Examples include solo/duo and flex winrates,
match history analyzations, etc.
'''

def calculate_winrate(wins: int, losses: int):
    '''
    Calculate the users winrate (as a PERCENTAGE) for the given wins and losses
    '''
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

    return {'team_1_avg': lp_to_rank(team_1_avg), 'team_2_avg': lp_to_rank(team_2_avg), 'combined_avg': lp_to_rank(game_average)}


def lp_to_rank(lp_value):
    '''
    This function is to be used when calculating average rank values using total LP value.
    '''
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


def calculate_player_stats(match: dict, player_list: list):
    '''
    calculate stats per player
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
            per_minute_stats[key] = per_minute_stats[key] / total_match_time

        player_stats[player['summonerName']] = {
            'per_minute_stats': per_minute_stats,
            'position': player['teamPosition'],
            'kills': player['kills'],
            'deaths': player['deaths'],
            'assists': player['assists'],
            'champion': player['championName'],
            'win': player['win'],
            'team_id': player['teamId'],

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
    historical_match_data = []

    print("number of games: 2")
    for i in range(2): # Fetch the last 3 matches (this should be updated later. details in ticket)
        match = match_history[i]
        # Match data
        summoners_teams = riot_api.get_summoner_profiles_from_match(match, region)
        player_list = get_match_participants(match)
        player_stats = calculate_player_stats(match, player_list)
        average_ranks = calculate_average_ranks_for_match(summoners_teams, 'soloduo') # average rank per team is here
        if not match['info']['gameEndTimestamp']:
            total_match_time = (match['info']['gameDuration'] * 1000) / 60 # convert milliseconds (per riot docs) to minutes
        else:
            total_match_time = (match['info']['gameDuration']) / 60 # convert seconds to minutes
        queue_type = get_queue_type(match['info']['queueId'])

        # Get information related to the target summoner
        target_summoner_info = get_summoner_info_for_match(summoner_name, summoners_teams, player_list, match)
        
        historical_match_data.append({
            'player_stats': player_stats, 
            'average_ranks': average_ranks, 
            'match_length': total_match_time,
            'target_summoner_info': target_summoner_info,
            'queue_type': queue_type
        })

        print(f'match {i} fetched')

    return historical_match_data


def get_summoner_info_for_match(summoner_name: str, summoners_teams: dict, player_list: list, match: dict):
    '''
    Get the information of a particular summoner. This is intended to be used with the
    get_summoner_profiles_from_match function
    '''
    summoner_info = {}

    for summoner in player_list:
        if summoner_name.upper() == summoner['summonerName'].upper():
            summoner_info['champion'] = summoner['championName']
            summoner_info['position'] = summoner['teamPosition']
            summoner_info['win'] = summoner['win']


    for team in summoners_teams.values():
        for summoner in team:
            if summoner['summoner_name'] == summoner_name:

                # Get rank
                if match['info']['queueId'] == 420:
                    summoner_info['rank'] = summoner['solo_data']['rank']
                elif match['info']['queueId'] == 440:
                    summoner_info['rank'] = summoner['flex_data']['rank']
                else:
                    summoner_info['rank'] = 'N/A'

    return summoner_info

def get_queue_type(queueId: int):
    '''
    convert integer queue type to its integer representation
    '''
    if queueId == 400:
        return 'Draft Pick'
    elif queueId == 420:
        return 'Ranked Solo'
    elif queueId == 440:
        return 'Blind Pick'
    elif queueId == 440:
        return 'Ranked Flex'
    elif queueId == 450:
        return 'Aram'
    else:
        return 'unsupported gamemode'


# Summoner stats file. To test the functions in this file, please use the tests.py file