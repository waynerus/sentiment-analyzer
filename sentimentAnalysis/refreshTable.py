import coinmarketcap
import numpy as np
import pandas as pd
import os
import textblob
import tweepy
import re
from textblob import TextBlob
from twitter_credentials import *


def getCoinList():
    market = coinmarketcap.Market()
    coinList = pd.DataFrame(market.ticker(limit=300)).set_index("id")
    coinList['percent_change_1h'] = coinList['percent_change_1h'].astype(float)
    coinList = coinList.sort_values('percent_change_1h', axis = 'index', ascending = 0)
    coinList['symbol'] = '$' + coinList['symbol']
    a = ['symbol','percent_change_1h','percent_change_24h','percent_change_7d',
         'price_btc','price_usd','market_cap_usd','24h_volume_usd']
    return(coinList[a])

def twitter_setup():
    #from twitter_credentials import *
    """
    Utility function to setup the Twitter's API
    with our access keys provided.
    """
    # Authentication and access using keys:
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

    # Return API with authentication:
    api = tweepy.API(auth, wait_on_rate_limit=False)
    return api

def clean_tweet(tweet):
    '''
    Utility function to clean the text in a tweet by removing 
    links and special characters using regex.
    '''
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", tweet).split())

def analyze_sentiment(tweet):
    '''
    Utility function to classify the polarity of a tweet
    using textblob.
    '''
    from textblob import TextBlob
    analysis = TextBlob(clean_tweet(tweet))
    if analysis.sentiment.polarity > 0:
        return 1
    elif analysis.sentiment.polarity == 0:
        return 0
    else:
        return -1
    

    