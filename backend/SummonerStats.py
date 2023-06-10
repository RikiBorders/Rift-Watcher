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


def calculate_average_rank(summoner_list: list):
    '''
    calculate the average rank for the given summoner_list.
    not that each element of summoner list is expected to be 
    a summonerName value (ie compatible with the SUMMONER-V4 Endpoint)
    '''
    for summoner in summoner_list:
        pass




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


from RiotApi import Riot

if __name__ == "__main__":
    # Run local tests here. for now. a testing structure can be added later on
    riot_api = Riot('RGAPI-f2aadeef-01d3-4ee3-b940-83042699e1ad') #update this key before launch
    summoner_data = riot_api.get_summoner_profile('SL1MEBALL', 'NA')
    print(summoner_data['summoner_data']['match_history'][0])
    # calculate_avg_rank_per_game(summoner_data['summoner_data']['match_history'])

