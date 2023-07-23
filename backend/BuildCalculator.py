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


    for champion_data in champion_list_json:
        champ_info = {
            'name': champion_data['name'],
            'health': champion_data['health'],
            'healthRegen': champion_data['healthRegen'],
            'mana': champion_data['mana'],
            'manaRegen': champion_data['manaRegen'],
            'armor': champion_data['armor'],
            'magicResistance': champion_data['magicResistance'],
            'attackDamage': champion_data['attackDamage'],
            'movespeed': champion_data['movespeed'],
            'criticalStrikeDamage': champion_data['criticalStrikeDamage'],
            'criticalStrikeDamageModifier': champion_data['criticalStrikeDamageModifier'],
            'attackSpeed': champion_data['attackSpeed'],
            'attackSpeedRatio': champion_data['attackSpeedRatio'],
            'attackRange': champion_data['attackRange'],
            '': champion_data[''],
            '': champion_data[''],
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