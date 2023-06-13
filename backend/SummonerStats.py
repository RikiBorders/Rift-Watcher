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

    return win_ratio * 100

def calculate_winrates(total_wins: int, total_losses: int, recent_wins: int, recent_losses: int):
    '''
    calulate the immediate & seasonal winrates for a player as well as the winrate discrepancy
    discrepancy formula: compare the immediate versus the season win rate (difference)
    '''
    seasonal_wr = calculate_winrate(total_wins, total_losses)
    immediate_wr = calculate_winrate(recent_wins, recent_losses)
    discrepancy = (seasonal_wr - immediate_wr) / seasonal_wr

    return discrepancy * 100


def calculate_average_ranks_for_match(rank_data: dict, queue_type: str):
    '''
    calculate the average rank for each team, as well as the entire match (both
    teams combined). 
    '''
    #Riot MATCH V5 api designates team 1 as 100, and team 2 as 200
    if queue_type == 'soloduo':
        team_1_ranks = [rank['solo_data'] for rank in rank_data[100]]
        team_2_ranks = [rank['solo_data'] for rank in rank_data[200]]
    elif queue_type == 'flex':
        team_1_ranks = [rank['flex_data'] for rank in rank_data[100]]
        team_2_ranks = [rank['flex_data'] for rank in rank_data[200]]

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

def get_match_participants(match: dict):
    '''
    Return a list of participants from a particular match.

    Note: this list will include the ENTIRE participant entry from the match
    '''
    return [participant for participant in match['info']['participants']]


# Below functions rely on match data

def calculate_per_minute_stats(match: dict):
    player_list = get_match_participants(match)
    player_stats = {}
    if not match['info']['gameEndTimestamp']:
        total_match_time = (match['info']['gameDuration'] * 1000) / 60 # convert milliseconds (per riot docs) to minutes
    else:
        total_match_time = (match['info']['gameDuration']) / 60 # convert seconds to minutes

    print(total_match_time)
    for player in player_list:
        per_minute_stats = {
            'assists_pm': int(player['assists']),
            'deaths_pm': int(player['deaths']),
            'kills_pm': int(player['kills']),
            'gold_earned_pm': int(player['goldEarned']),
            'total_minions_killed_pm': int(player['totalMinionsKilled']),
            'turret_kills_pm': int(player['turretKills']),
            'vision_score_pm': int(player['visionScore']),
            'wards_killed_pm': int(player['wardsKilled']),
            'ward_placed_pm': int(player['wardsPlaced'])
        }

        for key in per_minute_stats:
            per_minute_stats[key] = per_minute_stats[key] / total_match_time

        player_stats[player['summonerName']] = per_minute_stats

    return player_stats # key = player identifier, val = dict of stats


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


def integer_to_timestamp(time: int):
    '''
    Convert an integer representing seconds to a timestamp format.
    '''
    if time < 3600:
        hours = 0
    else:
        hours = time // 3600
        time = time % 3600

    if time < 60:
        minutes = 0
    else:
        minutes = time // 60
        time = time % 60
        
    total_duration = str(hours)+':' if hours > 0 else ''
    total_duration += str(minutes)+':' if minutes > 0 else '00:'
    if len(str(time)) < 2:
        total_duration += '0'+str(time)
    else:
        total_duration += str(time)
        
    return total_duration 



if __name__ == "__main__":
    print('Summoner stats file. To test the functions in this file, please use the tests.py file')