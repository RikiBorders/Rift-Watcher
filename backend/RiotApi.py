import os
import requests
# from SummonerStats import *

class Riot(): 
    def __init__(self):
        self.request_headers = {
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",                 # update the below 'riot token' key before launch
            "X-Riot-Token": 'RGAPI-3cfc43dd-fab9-4982-80ed-6b94576d8072' # API KEY FROM .ENV SHOULD GO HERE
        }
        self.regions = {
            "NA" : "na1",
            "BR" : "br1",
            "EUN" : "eun1",
            "EUW" : "euw1",
            "JP" : "jp1",
            "KR" : "kr",
            "LA1" : "la1",
            "LA2" : "la2",
            "OC" : "oc1",
            "TR" : "tr1",
            "RU" : "ru"
        }
        self.queue_types = {
            "SOLO" : "RANKED_SOLO_5x5",
            "FLEX" : "RANKED_FLEX_SR"
        }
        self.division = {
            "ONE" : "I",
            "TWO" : "II",
            "THREE" : "III",
            "FOUR" : "IV"
        }
        
    def __get_summoner_by_name(self, summoner_name: str, region: str):
        '''
        Get summoner account info via summoner name & region via the RiotAPI
        '''
        url = f"https://{self.regions[region]}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summoner_name}"
        summoner_info = requests.get(url, headers=self.request_headers)

        return summoner_info.json()
    
    def __get_league_data_by_summoner_id(self, summoner_id: str, region: str):
        '''
        Get league of legends game info via summoner id. This will return info such as ranks for each queue, tiers, etc. via RiotAPI
        '''
        url = f"https://{self.regions[region]}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner_id}"
        account_info = requests.get(url, headers=self.request_headers)

        return account_info.json()
    
    def __parse_account_data(self, account_data):
        '''
        Build a json object to send summoner info to the frontend. This json
        object will supply data that will be used to populate each user's page.
        '''
        parsed_account_data = {}
        for gamemode_data in account_data:
            rank = [gamemode_data['tier'], gamemode_data['rank']]
            wins = gamemode_data['wins']
            losses = gamemode_data['losses']
            lp = gamemode_data['leaguePoints']
            data = {'rank': rank, 'wins': wins, 'losses': losses, 'lp': lp}

            if gamemode_data['queueType'] == 'RANKED_SOLO_5x5': # Ranked Solo/duo
                parsed_account_data['solo_data'] = data
            elif gamemode_data['queueType'] == 'RANKED_FLEX_SR':
                parsed_account_data['flex_data'] = data
        
        return parsed_account_data

    def get_summoner_profile(self, summoner_name: str, region: str):
        '''
        Get a specific player's profile data (summoner level, rank, most played champions, etc).
        This info is used on a player's specific page
        '''
        summoner_data = self.__get_summoner_by_name(summoner_name, region)
        # If status == 0, then a summoner could not be found
        if 'status' in summoner_data:
            return {'status': 0, 'summoner_data': None}
        else:
            account_data = self.__get_league_data_by_summoner_id(summoner_data['id'], region)
            parsed_account_data = self.__parse_account_data(account_data)
            parsed_account_data['profileIcon'] = summoner_data['profileIconId']

            match_history = self.__get_summoner_matches(region, summoner_data['puuid'])
            user_data = {'summoner_data': parsed_account_data, 'match_history': match_history}

            return {'status': 1, 'summoner_data': user_data}

    def get_summoner_profiles_from_match(self, match: dict, region: str):
        '''
        Get each summoner's game info from a given match. This info will include info such as ranks, tiers, etc
        
        Note: This function will return a DICTIONARY where key = teamID and value = list of summoners on that particular team
        '''
        summoner_teams = {}
        for participant in match['info']['participants']:
            summoner_name = participant['summonerName']
            team_id = participant['teamId']
            if team_id not in summoner_teams:
                summoner_teams[team_id] = [self.__get_summoner_by_name(summoner_name, region)]
            else:
                summoner_teams[team_id].append(self.__get_summoner_by_name(summoner_name, region))

        summoner_accounts = {}
        for teamId in summoner_teams.keys():
            summoner_accounts[teamId] = []

        for teamId in summoner_teams.keys():
            for summoner_data in summoner_teams[teamId]:
                account_data = self.__get_league_data_by_summoner_id(summoner_data['id'], region)
                parsed_account_data = self.__parse_account_data(account_data)
                summoner_accounts[teamId].append(parsed_account_data)
        
        return summoner_accounts

    def __get_summoner_matches(self, region: str, puuid: str):
        '''
        Get the last 20 games for the given player. This function takes a while to complete
        '''

        if (region in ['NA', 'BR', 'LAN', 'LAS']):
            routing_value = "AMERICAS"
        elif (region in ['KR', 'JP']):
            routing_value = "ASIA"
        elif (region in ['EUNE', 'EUW', 'TR', 'RU']):
            routing_value = "EUROPE"
        else:
            routing_value = "SEA"

        url = f"https://{routing_value}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids"
        match_ids = requests.get(url, headers=self.request_headers).json()
        
        matches = []
        for match_id in match_ids:
            url = f"https://{routing_value}.api.riotgames.com/lol/match/v5/matches/{match_id}"
            match_data = requests.get(url, headers=self.request_headers).json()
            matches.append(match_data)

        return matches

    def summoner_exists(self, summoner_name: str, region: str):
        '''
        Public method for simply checking if a summoner exists or not
        '''
        url = f"https://{self.regions[region]}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summoner_name}"
        summoner_data = requests.get(url, headers=self.request_headers).json()

        if 'status' in summoner_data:
            return {'status': 0, 'summoner_data': None}
        else:
            return {'status': 1, 'summoner_data': None}
        
    def fetch_match_statistics(self, summoner_name: str, region: str):
        '''
        Calculate and return statistics for a player's match history 
        '''
        summoner_data = self.get_summoner_profile(summoner_name, region)
        match_list = summoner_data['summoner_data']['match_history']
        for match in match_list:
            team_1, team_2 = get_match_participants(match)
            team_1_avg_rank = calculate_average_rank([participant['summonerName'] for participant in team_1])
            team_2_avg_rank = calculate_average_rank([participant['summonerName'] for participant in team_2])
        return {}
            