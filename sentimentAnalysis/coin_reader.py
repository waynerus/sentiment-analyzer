import coinmarketcap
import json
import pandas as pd
import time
import tweepy
import textblob

market = coinmarketcap.Market()
coins = market.ticker()