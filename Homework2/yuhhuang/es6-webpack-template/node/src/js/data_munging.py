'''
1) for each year, extract the most popular 50 songs as csv for the scatter plot
2) for all the songs, etract the most 4 popular songs as json files for the radar chart
'''
#%%
import pandas as pd
import numpy as np
import os
import json
#%%
#load the raw Spotify data
data=pd.read_csv(r"./../assets/data/data.csv")
#acousticness, danceability, energy, instrumentalness,liveness,speechiness,valence
#drop no need columns
data=data.drop(columns=['duration_ms','explicit','id','key','loudness','mode','release_date','tempo'])
#%%
#extract the most popular 30 songs for each year
popular_year=pd.DataFrame()
for value in data.year.unique():
    subset=data.loc[data['year']==value]
    popular_year=pd.concat([popular_year,subset.nlargest(30,'popularity')])

#%%
popular_year.to_csv(r"./../assets/data/data_year_popularity.csv",index=False)

#%%
#get the 4 most popular songs
popular_5=data.nlargest(4,'popularity')
# %%
popular_json=[]
for _,item in popular_5.iterrows():
    song_json={}
    quantity=[]
    song_json['name']=item['name']
    quantity.append({'axis':'acousticness','value':item.acousticness})
    quantity.append({'axis':'danceability','value':item.danceability})
    quantity.append({'axis':'energy','value':item.energy})
    quantity.append({'axis':'instrumentalness','value':item.instrumentalness})
    quantity.append({'axis':'liveness','value':item.liveness})
    quantity.append({'axis':'speechiness','value':item.speechiness})
    quantity.append({'axis':'valence','value':item.valence})
    song_json['axes']=quantity
    popular_json.append(song_json)
    
# %%
with open('./../assets/data/popular_song.json', 'w') as fp:
    json.dump(popular_json, fp)
# %%
