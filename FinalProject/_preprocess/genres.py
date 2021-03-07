# -*- coding: utf-8 -*-
"""Reformat the processed anime data.

This script reformats the processed anime dataset's genre column.

Example:
    $ python genres.py

Attributes:
    PATH_DATA_DIR (str): The absolute path to the data folder.

Authors:
    Fangzhou Li - https://github.com/fangzhouli

Todo:
    - move analysis code to somewhere else.

"""

from os import path

import numpy as np
import pandas as pd
# import seaborn as sns
# import matplotlib.pyplot as plt

PATH_DATA_DIR = path.abspath(path.dirname(__file__)) + '/../data'


# def calculate_corr_mat(data):
#     """
#     """
#     # Extract unique genres in the data.
#     genre_list = []
#     data['genre'].apply(lambda row: genre_list.extend(row))
#     genre_set = sorted(set(genre_list))

#     # Generate binary vectors for each anime. '1' indicates the anime includes
#     #   that genre.
#     def generate_genre_vector(genres):
#         """
#         """
#         genre_vec = np.zeros(len(genre_set))
#         for i, genre in enumerate(genre_set):
#             if genre in genres:
#                 genre_vec[i] = 1
#         return pd.Series(genre_vec)

#     df_genre_binary = data['genre'].apply(generate_genre_vector)
#     df_genre_binary.columns = genre_set
#     corr_mat = df_genre_binary.corr()

#     sns.heatmap(corr_mat, annot=True, xticklabels=True, yticklabels=True)
#     plt.show()


if __name__ == '__main__':

    data = pd.read_csv(
        PATH_DATA_DIR + '/processed.csv',
        converters={
            'genre':
                lambda x: x.strip("[]").replace("'", '').split(", ")})

    # Generate genre csv data.
    genre_list = []
    data['genre'].apply(lambda row: genre_list.extend(row))
    genre_set = sorted(set(genre_list))

    def helper_generate_genre_vector(genres):
        genre_vec = np.zeros(len(genre_set), dtype=int)
        for i, genre in enumerate(genre_set):
            if genre in genres:
                genre_vec[i] = 1
        return pd.Series(genre_vec)
    df_genre_binary = data['genre'].apply(helper_generate_genre_vector)
    df_genre_binary.columns = genre_set

    data = pd.concat(
        [data.drop('genre', axis=1), df_genre_binary],
        axis=1)

    data.to_csv(PATH_DATA_DIR + '/processed_genre.csv', index=False)

    # Generate year-genre dataset.
    data_year_genre_list = []
    data = data.sort_values('year_from')
    year_set = set(data['year_from'].tolist())
    for year in year_set:
        se_genre = data.loc[data['year_from'] == year,
                            'Action':'Yuri'].sum(axis=0)
        se_year_genre = pd.concat([pd.Series({'year': year}), se_genre])
        data_year_genre_list.append(se_year_genre)
    data_year_genre = pd.concat(data_year_genre_list, axis=1).T
    data_year_genre.to_csv(
        PATH_DATA_DIR + '/processed_year_genre.csv', index=False)
