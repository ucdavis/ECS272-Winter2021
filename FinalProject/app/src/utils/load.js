/* A module contains all the data loading functions.
* @Author: fangzhouli
* @Date:   2021-03-14 14:47:15
* @Last Modified by:   fangzhouli
* @Last Modified time: 2021-03-14 14:58:37
*/

/*
 * Function:
 *   loadYearToRatingData(d)
 *
 * Description:
 *   Format the original raw data for visualizing rating-year plot.
 *
 * Inputs:
 *   d (Object): The raw data.
 *
 * Outputs:
 *   dataYearToRating (Object): Each row is a year, and each year contains data
 *     for each rating.
 *
 */
export function loadYearToRatingData(d) {
  const dataYearToRating = [];
  const yearStart = Number(d[0]['year_from']);
  const yearEnd = Number(d[d.length - 1]['year_from']);

  for (let year = yearStart; year <= yearEnd; year++) {
    let item = {
      'year': year,
      'G': [],
      'PG': [],
      'PG-13': [],
      'R': []
      // 'R+': [],
      // 'Rx': []
    };
    d.forEach(row => {
      if (row['year_from'] == year) {
        if (['R', 'R+', 'Rx'].includes(row['rating'])) {
          item['R'].push(row);
        } else {
          item[row['rating']].push(row);
        }
      }
    });
    dataYearToRating.push(item);
  }
  return dataYearToRating;
}

/*
 * Function:
 *   loadYearToGenreByRatingData(d)
 *
 * Description:
 *   Format the rating-year data for visualizing genre-year plot.
 *
 * Inputs:
 *   d (Object): The rating-year data.
 *
 * Outputs:
 *   dataYearToGenreByRating (Object): Each row is a year, and each year
 *     contains data for each genre.
 *
 */
export function loadYearToGenreByRatingData(d) {
  const rating = d['key'];
  // const genres = ["Action", "Adventure", "Cars", "Comedy", "Dementia",
  //   "Demons", "Drama", "Ecchi", "Fantasy", "Game", "Harem", "Hentai",
  //   "Historical", "Horror", "Josei", "Kids", "Magic", "Martial Arts",
  //   "Mecha", "Military", "Music", "Mystery", "Parody", "Police",
  //   "Psychological", "Romance", "Samurai", "School", "Sci-Fi", "Seinen",
  //   "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai", "Slice of Life",
  //   "Space", "Sports", "Super Power", "Supernatural", "Thriller",
  //   "Vampire", "Yaoi", "Yuri"];
  const genres = [
    'Action', 'Adult', 'Adventure', 'Comedy', 'Drama',
    'Fantasy', 'Kids', 'Romance', 'School', 'Sci-Fi',
    'Seinen', 'Shounen', 'Slice of Life',
    'Supernatural', 'Other'];
  const dataYearToGenreByRating = [];

  d.forEach(d => {
    let item = {
      'year': d.data['year']
    };
    genres.forEach(genre => {
      item[genre] = [];
    });

    genres.forEach(genre => {
      d.data[rating].forEach(dd => {
        if (dd[genre] == 1) {
          item[genre].push(dd);
        }
      })
    });
    dataYearToGenreByRating.push(item);
  })
  dataYearToGenreByRating.key = rating;
  return dataYearToGenreByRating;
}

/*
 * Function:
 *   loadElementByGenreData(d, e)
 *
 * Description:
 *   Format the genre-year data for visualizing tool-tip element bar plot.
 *
 * Inputs:
 *   d (Object): The genre-year data.
 *   e (Object): The d3.event object used to determine the indices of data.
 *
 * Outputs:
 *   dataElement (Object): Each row is a element.
 *
 */
export function loadElementByGenreData(d, year) {
  const dataElement = [];
  const dataByGenre = loadYearToGenreByRatingData(d);
  const genreSelected = d['key'];
  const elements = ["Cars", "Dementia",
    "Demons", "Ecchi", "Game", "Harem",
    "Historical", "Horror", "Josei", "Magic", "Martial Arts",
    "Mecha", "Military", "Music", "Mystery", "Parody", "Police",
    "Psychological", "Samurai",
    "Shoujo", "Shoujo Ai", "Shounen Ai",
    "Space", "Sports", "Super Power", "Thriller",
    "Vampire", "Yaoi", "Yuri"];

  // Extract selected year's data.
  let dataRaw;
  for (let i = 0; i < dataByGenre.length; i++) {
    if (dataByGenre[i]['year'] == year) {
      dataRaw = dataByGenre[i];
      break;
    }
  }

  elements.forEach(elem => {
    let item = {
      'key': elem,
      'value': []
    };
    dataElement.push(item);
  })
  dataRaw[genreSelected].forEach(anime => {
    for (let i = 0; i < elements.length; i++) {
      if (anime[elements[i]] == 1) {
        dataElement[i]['value'].push(anime)
      }
    }
  });

  return dataElement;
}