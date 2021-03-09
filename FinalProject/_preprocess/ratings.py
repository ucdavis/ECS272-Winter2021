# -*- coding: utf-8 -*-
"""Reformat the processed anime data.

This script reformats the processed anime dataset's rating column.

Attributes:
    PATH_DATA_DIR (str): The absolute path to the data folder.

Authors:
    Fangzhou Li - https://github.com/fangzhouli

Todo:
    - move analysis code to somewhere else.
    - docstring.

"""

from os import path
import itertools

import pandas as pd
# import seaborn as sns
# import matplotlib.pyplot as plt

PATH_DATA_DIR = path.abspath(path.dirname(__file__)) + '/../data'


if __name__ == '__main__':

    data = pd.read_csv(PATH_DATA_DIR + '/processed.csv')

    # Generate genre csv data.
    rating_list = []
    data['rating'].apply(lambda x: rating_list.append(x))
    rating_set = sorted(set(rating_list))

    # Generate year-rating dataset.
    data = data.sort_values('year_from')
    year_set = set(data['year_from'].tolist())

    def rating_dict_counter_helpler(rating, row_dict):
        row_dict[rating] += 1

    data_year_rating_list = []
    for year in year_set:
        row_dict = dict(zip(rating_list, itertools.repeat(0)))
        se_year_rating = data.loc[data['year_from'] == year, 'rating']
        se_year_rating.apply(
            lambda rating: rating_dict_counter_helpler(rating, row_dict))
        row_dict['year'] = year
        data_year_rating_list.append(row_dict)

    data_year_rating = pd.DataFrame(data_year_rating_list)
    data_year_rating = data_year_rating.reindex(
        ['year', 'G', 'PG', 'PG-13', 'R', 'R+', 'Rx'], axis=1)
    data_year_rating.to_csv(
        PATH_DATA_DIR + '/processed_year_rating.csv', index=False)
