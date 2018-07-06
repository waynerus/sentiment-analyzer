import coinmarketcap
import pandas as pd    

def getCoinList():
    market = coinmarketcap.Market()
    coinList = pd.DataFrame(market.ticker(limit = 180)).set_index("id")
    coinList['percent_change_1h'] = coinList['percent_change_1h'].astype(float)
    coinList = coinList.sort_values('percent_change_1h', axis = 'index', ascending = 0)
    coinList['symbol'] = '$' + coinList['symbol']
    a = ['symbol','percent_change_1h','percent_change_24h','percent_change_7d',
         'price_btc','price_usd','market_cap_usd','24h_volume_usd']
    coinList = coinList[a]
    coinList.to_json(orient='records')
    return(coinList[a])

if __name__ == "__main__":
    getCoinList()