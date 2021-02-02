# Homework 2: Visualization Dashboard: Layout Design + Visual Encoding
For homework 2, you will create a dashboard with three visualization views. This homework will not be using Observable. Instead, you will be developing a visualization dashboard system in JavaScript with [D3.js](https://d3js.org/)

To begin, you need to first fork (Links to an external site.) this repository (Links to an external site.). After the fork, clone the forked repository using the following commands:


    git clone https://github.com/<your-github-account-name>/ECS272-Winter2021
    cd ECS272-Winter2021/Homework2
    
Create a new folder inside the Homework 2 directory in the forked repository. The name of the folder should be the same as your UC Davis email account name (without ' @ucdavis.edu'). Inside this folder, you will add all your code. 

Before coding, please go over one of the following tutorials:
* D3: [Introduction](https://d3js.org/#introduction), [Bar Chart Example](http://bost.ocks.org/mike/bar/), [Selection](http://bost.ocks.org/mike/selection/), [Update Patterns](https://www.d3indepth.com/enterexit/)

If you need to learn more about JavaScript, you can refer to [A re-introduction to JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)


# Datasets 
In this assignment, you can choose one of the following datasets:

* [LAX Passenger Counts by Terminal](https://data.lacity.org/A-Prosperous-City/Los-Angeles-International-Airport-Passenger-Traffi/g3qu-7q2u)
* [Film Locations in San Francisco](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am)
* [List of Historical Ballot Measures in San Francisco](https://data.sfgov.org/City-Management-and-Ethics/List-of-Historical-Ballot-Measures/xzie-ixjw)
* [Louisville Restaurant Health Inspections](https://data.louisvilleky.gov/dataset/restaurant-inspection-data)
* [SF Crime Dataset](https://www.kaggle.com/roshansharma/sanfranciso-crime-dataset)
* [Global Terrorism Database](https://www.kaggle.com/START-UMD/gtd)
  
To use a dataset, download the data file from the respective URL above and put it in the "datasets" folder under the Homework 2 directory.


### Coding template
To get started, you can use one of the provided templates for setting up the application and loading the dataset. These templates can be found in the "Templates" directory under  Homework 2  directory on Github.

You are free to use other existing frameworks and libraries outside of vanilla javascript to implement the system. Some common frameworks and libraries include:
* [Vue](https://vuejs.org/v2/guide/)
  *  Vue is designed from the ground up to be incrementally adoptable. The core library is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications when used in combination with modern tooling and supporting libraries.
* [React](https://reactjs.org/tutorial/tutorial.html)  (Links to an external site.)is a JavaScript library for building user interfaces.
    * React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.

If you use a framework or library to create your system, please provide a README.md file explaining all the steps to run and view your system.

# Requirements
Your task is to create a visualization dashboard. The design of this dashboard should facilitate the exploration of a dataset in an effective or interesting way.

* This dashboard must have three visualization views.
* Your visualizations should include at least one advanced visualization method.
* The visualizations should depict different dimensions or aspects of the dataset to be examined. 
* The three visualizations should fit on a fullscreen browser. Consider where each view should be placed while designing the layout of your dashboard.
* Legends for each view need to be provided as well as labels for axis.
* One of your three views should serve as an overview of the data.
* Choose appropriate visual encodings.
* Color choice matters and has an effect on the interpretability of the visualization. Depending on the data the type of color scale you will use will change (categorical, linear, etc).
* Carefully consider the design for each encoding that you will use and its effectiveness for portraying the data.  Depending on the data you are visualizing, certain pairings of marks and channels will be more effective.

The design paradigm you will be following is referred to as focus + context. 

* A focus view is where the data of most interest is displayed at full size or with full details.
* A context view is a peripheral zone, an overview,  where elements are displayed at reduced size or in a simplified way.
For each view, you need to provide one or more visual interface widgets (e.g., a dropdown menu or slider) for changing the parameters of the visualization. For example, a drop-down menu can be provided for selecting the data dimension that maps to the x-axis of a scatter plot or the color encoding used in a 2D heatmap.

## Examples of basic visualization methods
* Bar chart
* Pie or donut chart
* Line and area chart
* 2D heatmap or matrix view
* Scatter plot
* Node-link diagram
* Geographical map

## Examples of more advanced visualization methods
* Parallel set or parallel coordinates plot
* Sankey or alluvial diagram
* Star coordinates or plot
* Chord diagram
* Stream graph
* Arc diagram

# Submission
To submit for this assignment, you need to first [fork](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) this [repository](https://github.com/ucdavis/ECS272-Winter2021). After the fork, clone the forked repository using the following commands: 
```bash
  git clone https://github.com/<your-github-account-name>/ECS272-Winter2021
  cd ECS272-Winter2021/Homework2
```

Create a new folder inside the Homework 2 directory in the forked repository. The name of the folder should be the same as your UC Davis email account name (without ' @ucdavis.edu'). Put all your codes inside this folder, and use "git add" to add all your codes, and then commit. 
```bash
git add <your-filename> 
git commit -m "Homework2" 
git push
```
After you pushed your code to your repository, follow the instruction [here](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) to create a pull request for this repository. Finally, submit the hyperlink of the pull request to UCD Canvas. The hyperlink should look like - "https://github.com/ucdavis/ECS272-Winter2021/pull/{your-pull-request-id}".
