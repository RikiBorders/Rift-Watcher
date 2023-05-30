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
        print(account_data)
        # Flex data
        flex_data = account_data[0]
        flex_rank = f"{flex_data['tier']} {flex_data['rank']}"
        flex_wins = flex_data['wins']
        flex_losses = flex_data['losses']
        flex_lp = flex_data['leaguePoints']
        # Solo/duo data
        solo_data = account_data[1]
        solo_rank = f"{solo_data['tier']} {solo_data['rank']}"
        solo_wins = solo_data['wins']
        solo_losses = solo_data['losses']
        solo_lp = solo_data['leaguePoints']


    def get_summoner_profile(self, summoner_name, region):
        '''
        Get a specific player's profile data (summoner level, rank, most played champions, etc).
        This info is used on a player's specific page
        '''
        summoner_data = self.__get_summoner_by_name(summoner_name, region)
        account_data = self.__get_league_data_by_summoner_id(summoner_data['id'], region)
        self.__parse_account_data(account_data)
        


#Temporary function to test out riot api calls
def run_tests():
    riot_api = Riot('RGAPI-50fd2d51-8af1-4e7c-b567-b7ccf2c232a6')
    riot_api.get_summoner_profile('SL1MEBALL', 'NA')



if __name__ == "__main__":
    run_tests()