'''
1) for each year, extract the most popular 50 songs as csv for the scatter plot
2) for all the songs, etract the most 10 popular songs as json files for the radar chart
3) for the 10 singers have most released songs after 1970, count their total number of songs each
year since 1920.
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

#%%
#get the # of song released each year for most productive singers after 1970
artist_count=data.loc[data['year']>1970].groupby(['artists']).count()
top_artist=artist_count.nlargest(10,'popularity').index
data_subset=data.loc[data['artists'].isin(top_artist)]
art_year=data_subset.groupby(['year','artists']).count()['popularity']
#top_artist.values
#%%
def nameExtract(row):
    '''remove [ and ' in the artist name'''
    return row.artists[2:-2]
#%%
art_year=art_year.reset_index()
art_year['artists']=art_year.apply(nameExtract,axis=1)
#%%
art_year_data=pd.DataFrame(columns=['year']+art_year.artists.unique().tolist())
art_year_data['year']=range(np.min(art_year['year']),2022)
for ind,value in art_year.iterrows():
    art_year_data.loc[art_year_data['year']==value.year,value.artists]=value.popularity
art_year_data=art_year_data.fillna(0)   
#%%
art_year_data.to_csv(r"./../assets/data/data_year_artist.csv",index=False)
#%%
#extract the most popular 30 songs for each year
popular_year=pd.DataFrame()
for value in data.year.unique():
    subset=data.loc[data['year']==value]
    popular_year=pd.concat([popular_year,subset.nlargest(30,'popularity')])
#%%
popular_year.to_csv(r"./../assets/data/data_year_popularity.csv",index=False)
#%%
#drop no need columns
data=data.drop(columns=['duration_ms','explicit','id','key','loudness','mode','release_date','tempo'])

#%%
#get the 13 most popular songs
popular_5=data.nlargest(10,'popularity')
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
#def time_period(row):
#    '''
#    aggregate data by every 25 years
#    '''
#    if row.year<=1945:
#        return '1920-1945'
#    if (row.year<=1970)&(row.year>1945):
#        return '1946-1970'
#    if (row.year<=1995)&(row.year>1970):
#        return '1971-1995'
#    if row.year>1995:
#        return '1996-2021'
#%%
#summarize the table for those artists have songs within the most 30 songs of any year, 
# the time period for that song and the 
#popular_year['period']=popular_year.apply(time_period,axis=1)
#artist_count=popular_year.groupby(['artists']).count()
#artist=artist_count.loc[artist_count['name']>15].index
#artist_data=popular_year.loc[popular_year['artists'].isin(artist)]
#artist_table=artist_data.groupby(['period','artists']).count()['name'].reset_index()
#artist_table=artist_table.rename(columns={'name':'value'})
# %%
#artist_table.to_csv(r"./../assets/data/data_year_artist.csv",index=False)
# %%
