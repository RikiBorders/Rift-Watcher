import os
import requests

class Riot(): 
    def __init__(self, api_key):
        self.request_headers = {
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://developer.riotgames.com",
            "X-Riot-Token": api_key
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
        
    def __get_summoner_by_name(self, summoner_name, region):
        '''
        Get summoner account info via summoner name & region
        '''
        url = f"https://{self.regions[region]}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summoner_name}"
        summoner_info = requests.get(url, headers=self.request_headers)

        return summoner_info.json()
    
    def __get_league_data_by_summoner_id(self, summoner_id, region):
        '''
        Get league of legends game info via summoner id. This will return info such as ranks for each queue, tiers, etc.
        '''
        url = f"https://{self.regions[region]}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner_id}"
        account_info = requests.get(url, headers=self.request_headers)

        return account_info.json()
    
    def __parse_account_data(self, account_data):
        '''
        Build a json object to send summoner info to the frontend. This json
        object will supply data that will be used to populate each user's page.
        '''
        # Flex data
        flex_account_data = account_data[1]
        flex_rank = [flex_account_data['tier'], flex_account_data['rank']]
        flex_wins = flex_account_data['wins']
        flex_losses = flex_account_data['losses']
        flex_lp = flex_account_data['leaguePoints']
        flex_data = {'rank': flex_rank, 'wins': flex_wins, 'losses': flex_losses, 'lp': flex_lp}

        # Solo/duo data
        solo_account_data = account_data[0]
        solo_rank = [solo_account_data['tier'], solo_account_data['rank']]
        solo_wins = solo_account_data['wins']
        solo_losses = solo_account_data['losses']
        solo_lp = solo_account_data['leaguePoints']
        solo_data = {'rank': solo_rank, 'wins': solo_wins, 'losses': solo_losses, 'lp': solo_lp}

        return {'flex_data': flex_data, 'solo_data': solo_data}

    def get_summoner_profile(self, summoner_name, region):
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
            # match_history = self.__get_summoner_matches(region, summoner_data['puuid'])
            match_history = None
            user_data = {'summoner_data': parsed_account_data, 'match_history': match_history}

            return {'status': 1, 'summoner_data': user_data}
        
    def __get_summoner_matches(self, region, puuid):
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

    def get_summoner_by_name(self, summoner_name, region):
        '''
        Public method for simply checking if a summoner exists or not
        '''
        url = f"https://{self.regions[region]}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summoner_name}"
        summoner_data = requests.get(url, headers=self.request_headers).json()

        if 'status' in summoner_data:
            return {'status': 0, 'summoner_data': None}
        else:
            return {'status': 1, 'summoner_data': None}
            

#Temporary function to test out riot api calls
def run_tests():
    riot_api = Riot('RGAPI-916d86bb-ba3a-4eff-9c13-c28b5649658d')
    riot_api.get_summoner_profile('SL1MEBALL', 'NA')



if __name__ == "__main__":
    run_tests()