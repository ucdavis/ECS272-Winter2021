# Homework 3:  Visualization Dashboard Pt 2 (Interactivty)
In this assignment, you will be extending your Homework 2 dashboard to include interactions and animated transitions. 
You may also start over and select a new dataset. You will use JavaScript with [D3.js](https://d3js.org/)

## Resources
If you choose to not use your Homework 2 dashboard you can select a dataset from the list below or use any other dataset that you want:

* [List of historical ballot measures in SF](https://data.sfgov.org/City-Management-and-Ethics/List-of-Historical-Ballot-Measures/xzie-ixjw)
* [The Movie Database (metadata for 5,000 movies)](https://www.kaggle.com/tmdb/tmdb-movie-metadata)
* [Student alcohol consumption link](https://www.kaggle.com/uciml/student-alcohol-consumption)
* [Pokemon dataset link](https://www.kaggle.com/alopez247/pokemon)
* [freeCodeCamp 2017 Survey](https://www.kaggle.com/fccuser/the-freecodecamp-2017-new-coder-survey)
* [Young people survey link](https://www.kaggle.com/miroslavsabo/young-people-survey)

To implement interactions in your own visualizations, you may find the following links useful:

* [Interactive Plots with Selection in Vega-Lite](https://vega.github.io/vega-lite/docs/selection.html)
* [Event handling in D3.js]()
* [d3-drag](https://github.com/d3/d3-drag), [d3-zoom](https://github.com/d3/d3-zoom), [d3-brush](https://github.com/d3/d3-brush)
* Demos for the use of [d3-drag](https://bl.ocks.org/mbostock/22994cc97fefaeede0d861e6815a847e), [d3-zoom](https://observablehq.com/@d3/zoomable-bar-chart), [d3-brush](https://observablehq.com/@d3/brushable-scatterplot)

D3 animation and transitions
* [d3 animation](https://observablehq.com/@d3/learn-d3-animation)
* [d3 animation and transitions](https://observablehq.com/@cesandoval/week-12-interaction-and-animation-d3-transitions-behavior)

# Requirements
In the previous homework, we created two visualization views. For this homework, you can either use your previous assignment as a starter or start again with a different dataset. The goal of this assignment is to learn how to incorporate interaction design to filter down data and support the exploration of a dataset.

* One of your views must represent an overview of the dataset.
* One of your views must be an advanced visualization.

As with homework 2 the design paradigm you be will implementing is referred to as context + focus, we will now incorporate interaction with this pardaigm. 

* A focus view is where the data of most interest is displayed at full size or with full details. 
* A context view is a peripheral zone, an overview,  where elements are displayed at reduced size or in a simplified way.

For example, let's take a histogram depicting fires in California and their total acreage burnt. This histogram will be our context view. Upon clicking a bar in our histogram a secondary view,  the focus view will update and depict the activity of the selected fire until it was contained as a line chart. 

# Submission
To submit for this assignment, you need to first [fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) this [repository](https://github.com/ucdavis/ECS272-Winter2021). After the fork, clone the forked repository using the following commands: 
```bash
  git clone https://github.com/<your-github-account-name>/ECS272-Winter2021
  cd ECS272-Winter2021/Homework3
```

Create a new folder inside the Homework 3 directory in the forked repository. The name of the folder should be the same as your UC Davis email account name (without ' @ucdavis.edu'). Put all your codes inside this folder, and use "git add" to add all your codes, and then commit. 
```bash
git add <your-filename> 
git commit -m "Homework3" 
git push
```
After you pushed your code to your repository, follow the instruction [here](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) to create a pull request for this repository. Finally, submit the hyperlink of the pull request to UCD Canvas. The hyperlink should look like - "https://github.com/ucdavis/ECS272-Winter2021/pull/{your-pull-request-id}".
