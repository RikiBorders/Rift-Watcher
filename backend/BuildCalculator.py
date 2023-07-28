'''
This file contains all backend logic related to the build calculator.
'''
import requests
import threading
from ThreadManager import *
from SummonerStats import get_champion_icon, parse_champ_name

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

    # the .abilities key has keys that correspond to ability keys (i.e, the keys for each ability is P,Q,W,E,R (P for passive))
    # ['name', 'icon', 'effects', 'cost', 'cooldown', 'targeting', 'affects', 'spellshieldable', 'resource', 'damageType', 
    # 'spellEffects', 'projectile', 'onHitEffects', 'occurrence', 'notes', 'blurb', 'missileSpeed', 'rechargeRate', 
    # 'collisionRadius', 'tetherRadius', 'onTargetCdStatic', 'innerRadius', 'speed', 'width', 'angle', 'castTime', 
    # 'effectRadius', 'targetRange']

    for champion_data in champion_list_json.values():
        champ_info = {
            'name': champion_data['name'],
            'damage_style': parse_champ_damage(champion_data['adaptiveType']),
            'roles': parse_champ_roles(champion_data['roles']),
            'abilities': champion_data['abilities'],
            'difficulty': champion_data['attributeRatings']['difficulty'],
            'icon_path': get_champion_icon(champion_data['name']),
            'splash_icon': get_champion_splash_icon(champion_data['name']),
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


def parse_champ_roles(roles: list):
    '''
    Convert raw champion roles into a more readable format
    '''
    roles_text = roles[0].title()
    for i in range(1, len(roles)):
        roles_text += '/'+roles[i].title()

    return roles_text


def parse_champ_damage(dmg_type: str):
    '''
    Convert raw champion damage style data into a more readable format
    '''
    formatted_dmg = dmg_type.replace('_', ' ')
    return formatted_dmg.title()


def get_champion_splash_icon(champ_name: str):
    '''
    Get the loading screen art for the given champion. Many exceptions to handle
    '''
    name = parse_champ_name(champ_name)
    base_path = 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/characters/'
    
    if name == 'ahri':
        url = base_path+name+'/skins/base/ahriloadscreen_0.skins_ahri_asu_prepro.jpg'
    elif name == 'aurelion sol':
        url = base_path+name+'/skins/base/aurelionsolloadscreen.jpg'
    elif name == 'belveth':
        url = base_path+name+'/skins/base/belvethloadscreen_0.jpg'
    elif name == 'caitlyn':
        url = base_path+name+'/skins/base/caitlynloadscreen_0.jpg'
    elif name == 'gwen':
        url = base_path+name+'/skins/base/gwenloadscreen_0.jpg'
    elif name == 'drmundo':
        url = base_path+name+'/skins/base/drmundoloadscreen_0.jpg'
    elif name == 'hecarim':
        url = base_path+name+'/skins/base/hecarimloadscreen_0.pie_c_13_6.jpg'
    elif name == 'kassadin':
        url = base_path+name+'/skins/base/kassadinloadscreen_0.jpg'
    elif name == 'ksante':
        url = base_path+name+'/skins/base/ksanteloadscreen_0.ksante.jpg'
    elif name == 'milio':
        url = base_path+name+'/skins/base/milioloadscreen_0.milio.jpg'
    elif name == 'naafiri':
        url = base_path+name+'/skins/base/naafiriloadscreen_0.naafiri.jpg'
    elif name == 'nilah':
        url = base_path+name+'/skins/base/nilahloadscreen_0.nilah.jpg'
    elif name == 'nunu&willump':
        url = base_path+'nunu/skins/base/nunuloadscreen.jpg'
    elif name == 'renataglasc':
        url = base_path+'renata'+'/skins/base/renataloadscreen_0.jpg'
    elif name == 'sivir':
        url = base_path+name+'/skins/base/sivirloadscreen_0.jpg'
    elif name == 'udyr':
        url = base_path+name+'/skins/base/udyrloadscreen_0.udyrvgu.jpg'
    elif name == 'vex':
        url = base_path+name+'/skins/base/vexloadscreen_0.jpg'
    elif name == 'wukong':
        url = base_path+'monkeyking/skins/base/monkeykingloadscreen.jpg'
    elif name == 'zeri':
        url = base_path+name+'/skins/base/zeriloadscreen_0.jpg'
    else:
        url = base_path+name+'/skins/base/'+name+'loadscreen.jpg'
    return url


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