# Rift-Watcher
League Statistics Website

Rift Watcher is a data-driven League of Legends tool that helps players improve using stats. All data Rift Watcher uses comes directly from the Riot API, where raw API data is then run through a variety of algorithms to show users useful information in order to improve their gameplay via analytics. The Hextech Build Calculator provides players with an intuitive tool to theory craft builds while seeing how the stats provided from each item interacts with a
champion's base stats. This tool also provides economic insights into the gold cost of items & their associated components. 

The Summoner search feature allows players to look at their match history, and other data that is relevant to their overall performance. Each summoners page offers graphs to visualize stats such as deaths per game, kda per game, etc. 
Game specific data is also offered through the match history feature, which is reminiscent of op.gg's match history feature.

## Repository Structure

The *client folder houses any and all frontend code, while *backend would host anything related to the backend, as the name would imply. The backend is written in Python while the frontend is written using React (more specifically NextJS). Note that the backend API uses Flask to send data to the frontend, while the frontend is written using NextJS.

### Backend Structure

Currently the backend doesn't host too many files, so there isnt a need to overcomplicate things with a variety of folders.

**RiotApi.py** - Any code that interfaces with the Riot api belongs in this file. By hosting all Riot API logic in this file, we're able to maintain absolute control over how Rift Watcher's code interfaces with the Riot api. Furthermore, this massively 
simplifies the debugging process when dealing with the data that comes from the API. Note that in this file, functions that *actually make calls to the Riot api via Requests. Functions in this file should ONLY  be called from Routes.py

**Routes.py** - Hosts all routes used to send data from the backend to the frontend. The routes are written in using Flask in the form of a restuful API. This file goes habd in hand with the Riot API. RiotApi.py functions should ONLY be called from this file.

**BuildCalculator.py** - This file houses all code used for the Hextech Build calculator page. This includes things such as fetching champion statistics, items, etc from community dragon and the riot api.

**SummonerStats.py** - Contains any and all calculations for data used in the summoners/[username].tsx file. This includes calculations such as average rank (per match), summoner rank, summoner match history fetching, etc. TftSummonerStats.py is the Tft counterpart
to this file.

**tests.py** - All tests are stored in this file. each function has *TEST_ at the start of the name, followed by the *exact* name of the function being tests (i.e *TEST_get_match_statistics). Each test can be called from the bottom of the file. Unused tests can
simply be commented out. As the project grows, when theres a need for a dedicated test suite, this system can be overhauled. Since each test is consolidated into a specific function, future scaling shouldn't be an issue.

**ThreadManager.py** - Used to manage threads. Generally, threads in the Rift Watcher app are used to make many requests (such as requests to match match info, lists of items, etc). This file contains functions that are used to manage thread pools/threads.


### Frontend Structure

**Public** Contains all app assets, including images, videos, and icons. Generally icons are stored in the public folder itself, and certain assets that can easily be grouped together are stored in sub folders. An example of such a sub folder would be the *ranked_icons subfolder, which holds, as you may have guessed, all ranked icons.

**pages** Contains all app pages. non-generated pages are stored in the *pages directory itself. Generated pages (which can also be referred to as templates) are stored in sub folders. the title of the subfolder denotes what the template within is for. For example, *pages/summoners contains \[username\].tsx, which is used with the summoner search engine to display player statistcs.

**components** Is structured similarly to pages. Generic components are stored in the *components folder itself, where other components that can easily be grouped are stored in sub folders. For example, components used with the build calculator are all stored within the *build_calculator folder.
