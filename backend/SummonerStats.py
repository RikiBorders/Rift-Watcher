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


def calculate_average_ranks_for_match(rank_data, queue_type):
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

    for rank in team_1_ranks:
        normalized_rank = normalize_rank(rank['rank'], rank['lp'])


# Below functions rely on match data

def get_per_minute_stats(match: dict):
    '''
    calculate statistics per minute for a given match. returns a hashmap of data
    '''
    per_minute_stats = {
        'assists_pm': int(match['assists']),
        'deaths_pm': int(match['deaths']),
        'kills_pm': int(match['kills']),
        'gold_earned_pm': int(match['goldEarned']),
        'total_minions_killed_pm': int(match['totalMinionsKilled']),
        'turret_kills_pm': int(match['turretKills']),
        'vision_score_pm': int(match['visionScore']),
        'wards_killed_pm': int(match['wardsKilled']),
        'ward_placed_pm': int(match['wardPlaced'])
    }
    total_match_time = (match['endTime'] - match['startTime']) / 60 # in minutes

    for stat, value in per_minute_stats.values():
        per_minute_stats[stat] = value / total_match_time

    return per_minute_stats


def get_match_participants(match: dict):
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


def normalize_rank(rank, lp):
    '''
    Take a player's rank and normalize it. This formula was provided by Marvin
    '''
    rank_value = 0
    if 'bronze' in rank.lower():
        rank_value += 0
    elif 'silver' in rank.lower():
        rank_value += 0
    elif 'gold' in rank.lower():
        rank_value += 0
    elif 'platinum' in rank.lower():
        rank_value += 0
    elif 'diamond' in rank.lower():
        rank_value += 0



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