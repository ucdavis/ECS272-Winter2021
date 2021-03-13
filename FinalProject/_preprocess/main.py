# -*- coding: utf-8 -*-
"""Cleanse the raw anime data.

This script removes unwanted columns and rows with missing values.

Example:
    $ python main.py

Attributes:
    PATH_DATA_DIR (str): The absolute path to the data folder.
    PATH_APP_DATA_DIR (str): The absolute path to the app data folder.

Authors:
    Fangzhou Li - https://github.com/fangzhouli

"""

from os import path
from ast import literal_eval

import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

PATH_DATA_DIR = path.abspath(path.dirname(__file__)) + '/../data'
PATH_APP_DATA_DIR = path.abspath(path.dirname(__file__)) + '/../app/src/data'
FILTER_YEAR_MAX = 2018
FILTER_YEAR_MIN = 1990


def refine_genres(data):
    """Merge highly-correlated genres into one and remove the duplicated genres
    from the dataset.

    Args:
        data (pd.DataFrame): The raw data.

    Returns:
        (pd.DataFrame): The raw data with refined genres.

    """
    genres_major = ['Action', 'Adult', 'Adventure', 'Comedy', 'Drama',
                    'Fantasy', 'Kids', 'Romance', 'School', 'Sci-Fi',
                    'Seinen', 'Shounen', 'Slice of Life',
                    'Supernatural']

    def helper_separate_genres(row):
        genre_list = []
        element_list = []
        for x in row['genre']:
            if x not in genres_major:
                element_list.append(x)
            else:
                genre_list.append(x)
        if not genre_list:
            row['genre_list'] = ['Other']
        else:
            row['genre_list'] = genre_list
        row['element_list'] = element_list
        return row
        # sub_exists = False
        # for sub in sub_genres:
        #     try:
        #         genres.remove(sub)
        #         sub_exists = True
        #     except ValueError:
        #         pass

        # if sub_exists and main_genre not in genres:
        #     genres += [main_genre]
        # return genres

    # Separate genre and elements.
    data = data.apply(helper_separate_genres, axis=1)

    # Sci-Fi
    # se_genre_refined = se_genre_refined.apply(
    #     lambda row: helper_merge_genres(
    #         row,
    #         'Sci-Fi',
    #         ['Mecha', 'Space']))

    # Romance
    # se_genre_refined = se_genre_refined.apply(
    #     lambda row: helper_merge_genres(
    #         row,
    #         'Romance',
    #         ['Ecchi', 'Harem', 'Shoujo Ai', 'Shounen Ai', 'Yaoi', 'Yuri']))

    # Supernatural
    # se_genre_refined = se_genre_refined.apply(
    #     lambda row: helper_merge_genres(
    #         row,
    #         'Supernatural',
    #         ['Demons', 'Vampire']))

    # Fantasy <- Magic
    # se_genre_refined = se_genre_refined.apply(
    #     lambda row: helper_merge_genres(
    #         row, 'Fantasy', ['Magic']))

    # data['genre'] = se_genre_refined
    # se_genre_refined_copy = se_genre_refined.copy()
    # se_genre_refined_copy.name = 'genre_list'
    # data = pd.concat([data, se_genre_refined_copy], axis=1)
    return data


def plot_correlation_matrix(data):
    """Plot the correlation matrix for genres to help observe the correlation
    between major and minor genres.

    Args:
        data (pd.DataFrame): The processed data.

    Plots:
        A Seaborn correlation matrix figure.

    """
    data_year = data['year_from'].astype(int)
    data = data[(data_year >= FILTER_YEAR_MIN) & (
        data_year <= FILTER_YEAR_MAX)]

    data_genre = data.loc[:, 'Action':]
    corr_mat = data_genre.corr()
    sns.heatmap(corr_mat, annot=True, xticklabels=True, yticklabels=True)
    plt.show()


def print_analysis_results(data):
    """
    """
    data_year = data['year_from'].astype(int)
    data = data[(data_year >= FILTER_YEAR_MIN) & (
        data_year <= FILTER_YEAR_MAX)]

    print("Animes aired between 1980 and 2018")
    print(' ' * 4 + "The number of animes: {}".format(len(data)))
    print(' ' * 4 + "The summary of genre:\n{}".format(
        data.loc[:, 'Action':].sum(axis=0)))
    print(' ' * 4 + "The number of animes without major genres: {}".format(
        len(data[data['genre_list'].apply(lambda x: len(x) == 0)])))


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

    # Expand genre column.
    genre_list = []
    data['genre'] = data['genre'].apply(
        lambda x: x.strip("[]").replace(
            'Hentai', 'Adult').replace("'", '').split(", "))
    data = refine_genres(data)
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
        axis=1).sort_values(by='year_from')

    data.to_csv(PATH_APP_DATA_DIR + '/processed.csv', index=False)
    print_analysis_results(data)
    # plot_correlation_matrix(data)
