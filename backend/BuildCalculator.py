'''
This file contains all backend logic related to the build calculator.
'''
import requests
import threading
import re
from ThreadManager import *
from SummonerStats import get_champion_icon, parse_champ_name

def fetch_items():
    '''
    Fetch relevant item data such as price, stats, etc.
    Will return none if json urls are unavailable

    item.bin.json contains item stats we need
    items.json contains things like names, icons, etc
    '''
    item_bin_url = 'https://raw.communitydragon.org/latest/game/items.cdtb.bin.json'
    items_json_url = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json'
    base_item_path = 'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/items/icons2d/'
    try:
        items_json = requests.get(items_json_url).json()
        item_bin = requests.get(item_bin_url).json()
    except ValueError:
        return None

    item_response = []
    processed_items = {}
    items_json_map = {}
    for item in items_json:
        items_json_map[item['id']] = item

    for item in items_json:
        item_bin_key = f"Items/{item['id']}"
        item_object = build_item_object(items_json_map, item_bin, processed_items, base_item_path, item, item_bin_key)

        if item_object != None:
            processed_items[item['name']] = item_object
        
    for item_data in processed_items.values():
        item_response.append(item_data)
    return item_response


def build_item_object(items_json_map: dict, item_bin: dict, processed_items: dict, base_item_path: str, item: dict, item_bin_key):
    '''
    Construct the item object that will be sent to the frontend as a part of the fetch items endpoint
    '''
    item_subpath = (item['iconPath'].split('/')[-1]).lower()
    bin_data = item_bin[item_bin_key]
    if 'mItemDataAvailability' not in bin_data: # discard unavailable items
        return None
    
    recipe_item_keys = [name for name in bin_data['recipeItemLinks']] if 'recipeItemLinks' in bin_data else []
    recipe_items = []

    for key in recipe_item_keys:
        formatted_item_key = int(key[key.find('/')+1:])
        recipe_item = items_json_map[formatted_item_key]
        recipe_items.append(build_item_object(items_json_map, item_bin, processed_items, base_item_path, recipe_item, key))
    
    item_object = {
        'name': item['name'],
        'id': item['id'],
        'icon_path': base_item_path+item_subpath,
        'epicness': bin_data['epicness'] if 'epicness' in bin_data else None,
        'price': bin_data['price'] if 'price' in bin_data else None,
        'categories': bin_data['mCategories'] if 'mCategories' in bin_data else None,
        'epicness': bin_data['epicness'] if 'epicness' in bin_data else None,
        'subitems': recipe_items,
        'stats': format_item_stats(bin_data),
        'availability':  bin_data['mItemDataAvailability']['mInStore'] if 
            'mInStore' in bin_data['mItemDataAvailability'] else None,
        'description': parse_description(item['description']),
    }

    # Some items with in-game recipes have duplicates that don't include 
    # the recipe - we'll discard the no-recipe counterpart
    if item['name'] in processed_items:
        if len(item_object['subitems']) < len(processed_items[item['name']]['subitems']):
            return
        
    return item_object

def parse_description(raw_description: str):
    '''
    prase description to not include html tags.
    '''
    description = re.sub(r'<stats>.*?</stats>', '', raw_description)
    description = re.sub(r'<[^>]*>', '', description)

    if 'Mythic Passive':
        index = description.find('Mythic Passive')
        first_half = description[:index]
        second_half = description[index:]
        description = first_half+'\n'+second_half

    return description


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

    if 'mFlatHPPoolMod' in raw_item_stats:
        item_stats['health'] = raw_item_stats['mFlatHPPoolMod']
    if 'mFlatArmorMod' in raw_item_stats:
        item_stats['armor'] = raw_item_stats['mFlatArmorMod']
    if 'mFlatSpellBlockMod' in raw_item_stats:
        item_stats['magic_resist'] = raw_item_stats['mFlatSpellBlockMod']
    if 'mFlatPhysicalDamageMod' in raw_item_stats:
        item_stats['attack_damage'] = raw_item_stats['mFlatPhysicalDamageMod']
    if 'mPercentAttackSpeedMod' in raw_item_stats:
        item_stats['attack_speed'] = raw_item_stats['mPercentAttackSpeedMod']
    if 'mFlatMagicDamageMod' in raw_item_stats:
        item_stats['ability_power'] = raw_item_stats['mFlatMagicDamageMod']
    if 'mFlatCritChanceMod' in raw_item_stats:
        item_stats['critical_chance'] = raw_item_stats['mFlatCritChanceMod']
    if 'PercentOmnivampMod' in raw_item_stats:
        item_stats['omnivamp'] = raw_item_stats['PercentOmnivampMod']
    if 'mPercentLifeStealMod' in raw_item_stats:
        item_stats['lifesteal'] = raw_item_stats['mPercentLifeStealMod']
    if 'mAbilityHasteMod' in raw_item_stats:
        item_stats['ability_haste'] = raw_item_stats['mAbilityHasteMod']
    if 'mPercentArmorPenetrationMod' in raw_item_stats:
        item_stats['armor_pen'] = raw_item_stats['mPercentArmorPenetrationMod']
    if 'mFlatMagicPenetrationMod' in raw_item_stats:
        item_stats['magic_pen'] = raw_item_stats['mFlatMagicPenetrationMod']
    if 'mFlatMovementSpeedMod' in raw_item_stats:
        item_stats['movement_speed'] = raw_item_stats['mFlatMovementSpeedMod']
    if 'flatMPPoolMod' in raw_item_stats:
        item_stats['mana'] = raw_item_stats['flatMPPoolMod']
    if 'mPercentBaseHPRegenMod' in raw_item_stats:
        item_stats['health_regen'] = raw_item_stats['mPercentBaseHPRegenMod']
    if 'percentBaseMPRegenMod' in raw_item_stats:
        item_stats['mana_regen'] = raw_item_stats['percentBaseMPRegenMod']

    if 'mDataValues' in raw_item_stats:
        for value in raw_item_stats['mDataValues']:
            if value['mName'] == 'LethalityAmount':
                item_stats['lethality'] = value['mValue']

    return item_stats


def fetch_champions():
    '''
    Fetch champion base statistics
    '''
    champion_list_url = 'https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json'
    champion_list_response = requests.get(champion_list_url)
    champion_list_json = champion_list_response.json()
    champ_threads = []
    response_data = []

    # the .abilities key has keys that correspond to ability keys (i.e, the keys for each ability is P,Q,W,E,R (P for passive))
    # ['name', 'icon', 'effects', 'cost', 'cooldown', 'targeting', 'affects', 'spellshieldable', 'resource', 'damageType', 
    # 'spellEffects', 'projectile', 'onHitEffects', 'occurrence', 'notes', 'blurb', 'missileSpeed', 'rechargeRate', 
    # 'collisionRadius', 'tetherRadius', 'onTargetCdStatic', 'innerRadius', 'speed', 'width', 'angle', 'castTime', 
    # 'effectRadius', 'targetRange']

    for champion_data in champion_list_json.values():
        
        champ_thread = threading.Thread(target=fetch_champion_data, args=[champion_data, response_data])
        champ_threads.append(champ_thread)
        champ_thread.start()

    monitor_thread_pool(champ_threads)
    return response_data


def fetch_champion_data(champion_data: dict, response_data: list):
    response_data.append({
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
        })

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