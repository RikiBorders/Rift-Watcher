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

    item.bin.json contains item stats we need
    items.json contains things like names, icons, etc
    '''
    item_bin_url = 'https://raw.communitydragon.org/latest/game/global/items/items.bin.json'
    items_json_url = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json'
    base_item_path = 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/'
    items_json = requests.get(items_json_url).json()
    item_bin = requests.get(item_bin_url).json()
    item_response = []
    item_fetching_threads = []

    for item in items_json:
        item_subpath = (item['iconPath'].split('/')[-1]).lower()
        item_object = {
            'name': item['name'],
            'id': item['id'],
            'icon_path': base_item_path+item_subpath,
            'stats': format_item_stats(item['mDataValues'])
        }
        item_bin_data = item_bin[f"Items/{item['id']}"]
        item_object['price'] = item_bin_data['price'] if 'price' in item_bin_data else ''
        item_object['categories'] = item_bin_data['mCategories']  if 'mCategories' in item_bin_data else ''
        print(item_bin_data)

        item_response.append(item_object)

    # monitor_thread_pool(item_fetching_threads)
    return item_response

def fetch_item(item_response: list, url: str):
    '''
    fetch item data from cdn
    '''
    raw_item_data = requests.get(url).json()
    # print(raw_item_data['name'])
    # print('-----------------')
    # print(raw_item_data['stats'].keys())
    item_data = {
        'name': raw_item_data['name'],
        'abilityPower': raw_item_data['stats']['abilityPower'],
        'attackDamage': raw_item_data['stats']['attackDamage'],
        'attackSpeed': raw_item_data['stats']['attackSpeed'],
        'criticalStrikeChance': raw_item_data['stats']['criticalStrikeChance'],
        'lethality': raw_item_data['stats']['lethality'],
        'lifesteal': raw_item_data['stats']['lifesteal'],
        'armor': raw_item_data['stats']['armor'],
        'magicResistance': raw_item_data['stats']['magicResistance'],
        'health': raw_item_data['stats']['health'],
        'healthRegen': raw_item_data['stats']['healthRegen'],
        'armorPenetration': raw_item_data['stats']['armorPenetration'],
        'magicPenetration': raw_item_data['stats']['magicPenetration'],
        'mana': raw_item_data['stats']['mana'],
        'manaRegen': raw_item_data['stats']['manaRegen'],
        'movespeed': raw_item_data['stats']['movespeed'],
        'abilityHaste': raw_item_data['stats']['abilityHaste'],
        'omnivamp': raw_item_data['stats']['omnivamp'],
        'tenacity': raw_item_data['stats']['tenacity'],
        'health': raw_item_data['stats']['health'],
        'health': raw_item_data['stats']['health'],

        'passives': raw_item_data['passives'],
        'active': raw_item_data['active'],
        'icon': raw_item_data['icon'],
        'shop_info': raw_item_data['shop']
    }
    item_response.append(item_data)


def format_item_stats(raw_item_stats: dict):
    '''
    return a standardized list of stats gained from a particular item.
    '''
    item_stats = {
        'health': 0,
        'armor': 0,
        'magic_resist': 0,
        'attack_damage': 0,
        'attack_speed': 0,
        'ability_power': 0,
        'critical_chance': 0,
        'omnivamp': 0,
        'lifesteal': 0,
        'ability_haste': 0,
        'lethality': 0,
        'armor_pen': 0,
        'magic_pen': 0,
        'movement_speed': 0,
        'mana': 0,
        'health_regen': 0,
        'mana_regen': 0,
    }

    return item_stats


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