'''
This file contains all backend logic related to the build calculator.
'''
import requests
import threading
from ThreadManager import *
from SummonerStats import get_champion_icon

def fetch_items():
    '''
    Fetch relevant item data such as price, stats, etc.
    '''
    base_item_url = 'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/items/'
    item_list_url = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json'
    item_list = requests.get(item_list_url).json()
    item_response = []
    item_fetching_threads = []

    for raw_item_data in item_list:
        id = raw_item_data['id']
        if id >= 222000 or id == 1104: # for some reason 1104 returns error 404
            break

        item_url = base_item_url+str(id)+'.json'
        thread = threading.Thread(target=fetch_item, args=[item_response, item_url])
        thread.start()
        item_fetching_threads.append(thread)

    monitor_thread_pool(item_fetching_threads)

    return item_response

def fetch_item(item_response: list, url: str):
    '''
    fetch item data from cdn
    '''
    raw_item_data = requests.get(url).json()
    item_data = {
        'name': raw_item_data['name'],
        'stats': raw_item_data['stats'],
        'passives': raw_item_data['passives'],
        'active': raw_item_data['active'],
        'icon': raw_item_data['icon'],
        'shop_info': raw_item_data['shop']
    }

    item_response.append(item_data)


def fetch_champions():
    '''
    Fetch champion base statistics
    '''
    champion_list_url = 'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json'
    champion_list_response = requests.get(champion_list_url)
    champion_list_json = champion_list_response.json()
    response = []

    for champion_data in champion_list_json.values():
        champ_info = {
            'name': champion_data['name'],
            'damage_style': champion_data['adaptiveType'],
            'roles': champion_data['roles'],
            'difficulty': champion_data['attributeRatings']['difficulty'],
            'icon_path': get_champion_icon(champion_data['name']),
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


def get_build_calculator_data():
    '''
    Fetch all necessary data to allow users to create and customize builds for champions
    '''
    champ_data = fetch_champions()
    item_data = fetch_items()
    response = {
        'champions': champ_data,
        'items': item_data
    }
    return response