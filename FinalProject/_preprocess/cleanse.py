# -*- coding: utf-8 -*-
"""Cleanse the raw anime data.

This script removes unwanted columns and rows with missing values.

Example:
    $ python cleanse.py

Attributes:
    PATH_DATA_DIR (str): The absolute path to the data folder.

Authors:
    Fangzhou Li - https://github.com/fangzhouli

"""

from os import path
from ast import literal_eval
import pandas as pd

PATH_DATA_DIR = path.abspath(path.dirname(__file__)) + '/../data'


# def refine_genres(df):
#     """
#     """
#     def merge_genres(genres, main_genre, sub_genres):
#         """
#         """
#         sub_exists = False
#         for sub in sub_genres:
#             try:
#                 genres.remove(sub)
#                 sub_exists = True
#             except ValueError:
#                 pass

#         if sub_exists and main_genre not in genres:
#             genres += [main_genre]
#         return genres

#     # Merge highly correlated genres.
#     se_genre_refined = df['genre']

#     # Action <- Martial Arts
#     se_genre_refined = se_genre_refined.apply(
#         lambda row: merge_genres(row, 'Action', ['Martial Arts']))

#     # Sci-Fi <- Mecha, Space
#     se_genre_refined = se_genre_refined.apply(
#         lambda row: merge_genres(row, 'Sci-Fi', ['Mecha', 'Space']))

#     # Romance <- Harem
#     se_genre_refined = se_genre_refined.apply(
#         lambda row: merge_genres(row, 'Romance', ['Harem']))

#     # Supernatural <- Demons, Vampire
#     se_genre_refined = se_genre_refined.apply(
#         lambda row: merge_genres(row, 'Supernatural', ['Demons', 'Vampire']))

#     # Fantasy <- Magic
#     se_genre_refined = se_genre_refined.apply(
#         lambda row: merge_genres(row, 'Fantasy', ['Magic']))

#     se_genre_refined.name = 'genre_refined'
#     df = pd.concat([df, se_genre_refined], axis=1)
#     return df


if __name__ == '__main__':

    cols = ['name', 'source', 'genre', 'year_from', 'year_to', 'rating',
            'score', 'rank', 'popularity', 'members']

    data = pd.read_csv(PATH_DATA_DIR + '/raw.csv')

    # Rename columns for consistency.
    data.columns = [col.strip() for col in data.columns.tolist()]

    # Remove garbage rows.
    data = data[data['name'] != '404']

    # Reassign data types.
    data = data.astype({'rank': str, 'popularity': str, 'members': str})

    # Remove rows with missing values.
    data = data[(~pd.isnull(data['genre'])) & (data['genre'] != '[]')]
    data = data[data['rating'] != 'None']
    data = data[~data['aired'].str.startswith("{'from': None")]

    # Reassign values for simplicity.
    data['rating'] = data['rating'].apply(lambda x: x.split(' - ')[0])

    # Parse aired time for simplicity.
    data_aired_parsed = data['aired'].apply(literal_eval)
    data_year_from = data_aired_parsed.apply(
        lambda x: x['from'].split('-')[0]).astype(str)

    def helper_parse_aired_to(x):
        try:
            return x['to'].split('-')[0]
        except AttributeError:
            return ''
    data_year_to = data_aired_parsed.apply(helper_parse_aired_to).astype(str)
    data_year_from.name = 'year_from'
    data_year_to.name = 'year_to'

    data = pd.concat([data, data_year_from, data_year_to], axis=1)
    data = data.reindex(cols, axis=1)
    data.to_csv(PATH_DATA_DIR + '/processed.csv', index=False)
