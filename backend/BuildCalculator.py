'''
This file contains all backend logic related to the build calculator.
'''
import requests

def fetch_items():
    '''
    Fetch raw item response data
    '''
    item_list_url = 'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/items/'
    response = requests.get(item_list_url)
    json = response.json()


def fetch_champions():
    '''
    Fetch raw champion response data
    '''
    champion_list_url = 'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json'
    champion_list_response = requests.get(champion_list_url)
    champion_list_json = champion_list_response.json()
    response = []

    for champion_data in champion_list_json.values():
        champ_info = {
            'name': champion_data['name'],
            'health': champion_data['stats']['health'],
            'healthRegen': champion_data['stats']['healthRegen'],
            'mana': champion_data['stats']['mana'],
            'manaRegen': champion_data['stats']['manaRegen'],
            'armor': champion_data['stats']['armor'],
            'magicResistance': champion_data['stats']['magicResistance'],
            'attackDamage': champion_data['stats']['attackDamage'],
            'abilityPower': 0, # Base AP is 0 for everyone
            'movespeed': champion_data['stats']['movespeed'],
            'criticalStrikeDamage': champion_data['stats']['criticalStrikeDamage'],
            'criticalStrikeDamageModifier': champion_data['stats']['criticalStrikeDamageModifier'],
            'attackSpeed': champion_data['stats']['attackSpeed'],
            'attackSpeedRatio': champion_data['stats']['attackSpeedRatio'],
            'attackRange': champion_data['stats']['attackRange'],
        }

        response.append(champ_info)

    return response

def build_item_dict():
    '''
    Build the response containing all item information/data
    '''
    item_response = fetch_items()

def build_champ_dict():
    '''
    Build the response containing all relevant champion information/data
    pertaining to builds.
    '''
    pass

def get_build_calculator_data():
    '''
    Fetch all necessary data to allow users to create and customize builds for champions
    '''
    pass