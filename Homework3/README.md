# Homework 3:  Visualization Dashboard Pt 2 (Interactivty)

## Assignment Checklist

- Three visualizations.
- One overview visualization.
- One advanced visualization.
- Two interaction techniques:
  - Brushing for the parallel coordicates.
  - Zooming for the pie chare.
- One transition technique:
  - Ordering for the bar chart.

<!-- For Homework 3, you will be extending your Homework 2 dashboard to include interactions and animated transitions. You are encouraged to select a new dataset You will use JavaScript with [D3.js](https://d3js.org/)

## Resources
You may select a dataset from the list below or use any other dataset that you want:

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

These are some tutorials and explanations for using Animation and Transitions with D3.js
* [d3 animation](https://observablehq.com/@d3/learn-d3-animation)
* [d3 animation and transitions](https://observablehq.com/@cesandoval/week-12-interaction-and-animation-d3-transitions-behavior)

Animations can help users see transitions from one state to the next and enable them to more easily track changes as parts of the visualizations move from one point to another.

The following are types of transitions between data graphics:

* View Transition: View transformations consist of a change in viewpoint, often modeled as the movement of a camera through a virtual space. (e.g. zoom and pan).
* Substrate Transformation:  These consist of changes to the spatial substrate in which marks are embedded. (e.g. axis rescaling and log transforms as well as bifocal and graphical fisheye distortions).
* Filtering: These transitions apply a predicate specifying which elements should be visible. In response, visible items are added or removed from the display. Filtering doesn't change encodings or data schema but axis may need to be rescaled.
* Ordering: These transitions spatially rearrange ordinal data dimensions. (e.g. include sorting on attribute values and manual re-ordering).
* Timestep: These transitions apply temporal changes to data values. Apart from the sample point from which data is drawn, the data schema does not change.
* Visualization Change: These transitions consist of changes to the visual mappings applied to the data. For example, data represented in a bar chart may instead be represented in a pie chart, or a user might edit the palettes used for color, size, or shape encodings.
* Data Schema Change: These transitions change the data dimensions being visualized. For example, starting from a univariate (observing a single variable e.g. Age ) bar chart, one might wish to visualize an additional data column, resulting in a number of possible bivariate (observing two variables e.g. Age and Height) graphs. Such transitions may be accompanied by changes to the visual mappings, as the bivariate graph may be presented as a stacked or grouped bar chart, a scatterplot, or a small multiples display.

Some design considerations to make before crafting your animated transitions:

* Maintain valid data graphics during transitions. 
  * Avoid uninformative animation, and considering the relation between axes and the data marks during transitions
* Use consistent semantic-syntactic mappings.
  * To aid understanding, similar semantic operators should have suitably similar transitions across different types of data graphics. For example, the filtering of items in and out of the display could be standardized across graphic types. That is if in one view you apply a fade animation to filter items out other views that also filter in and out items also fade them in and out. Consistency is key.
* Respect semantic correspondence.
  * Marks representing specific data points should not be reused to depict different data points across a transition.
* Avoid ambiguity.
* Group similar transitions.
  * The Gestalt principle of Common Fate states that objects that undergo similar visual changes are more likely to be perceptually grouped, helping viewers to understand that elements are simultaneously undergoing the same operation.
* Minimize occlusion.
  * If objects occlude each other during a transition, they will be more difficult to track, potentially harming perception.
* Maximize predictability.
  * If the target state of a transitioning item is predictable after viewing a fraction of its trajectory, this will reduce cognitive load and improve tracking. This suggests slow-in slow-out timing—not only are starting and ending states emphasized, the use of acceleration should improve spatial and temporal predictability. 
* Use simple transitions.
  * Complicated transforms with unpredictable motion paths or multiple simultaneous changes result in increased cognitive load.  Keep transitions simple and direct.
* Use staging for complex transitions.
  * In the cases where a complex transition is unavoidable, one can break up the transition into a set of simple subtransitions, allowing multiple changes to be easily observed. (e.g. separating axis rescaling from value changes may help).
* Make transitions as long as needed, but no longer.
  * Transition stages and dwells between them must be long enough for accurate change tracking, but when too slow can result in longer task times and diminished engagement. This isn't easy to determine all the time but use your best judgment.

For more details about these principles refer to:
Heer, Jeffrey, and George Robertson. "Animated transitions in statistical data graphics." IEEE Transactions on Visualization and Computer Graphics 13.6 (2007): 1240-1247.



# Requirements
In the previous homework, you designed and implemented a dashboard with three visualization views.  **The goal of this homework is to learn how to incorporate interaction techniques to drill-down data as well as make use of animation techniques to explore and understand a dataset.**
* One of your views must represent an overview of the dataset.
* As with the previous homework, one of your views must be an advanced visualization.
* Implement two of the following interaction techniques into your dashboard.
  * Selection: select one or multiple data points (they do not need to be neighboring data points or in sequence).
  * Brushing: is the selection of a subset of the displayed data in the visualization by either dragging the mouse over the data of interest or using a bounding shape to isolate this subset.
  * Pan and Zoom: like cameras, rescale the plot to focus on a part of the visualization
* Incorporate one or more of the transitions listed above in your dashboard using animation. Consider which transition could lead to an understanding of the data or offer an interesting insight rather than just simply applying animation.

As with the previous homework, you will continue to use the design paradigm of focus + context. The basic idea with focus+context visualizations is to enable users to have the object of primary interest presented in detail while at the same time having an overview or a context available. 

For example, let's take a map showing where fires have occurred in California using a marker with its size indicating the total acreage burnt. This view could serve as our overview. From this view, we could then select one of these fires and update a couple of focus views. One view could show us an animation of how the perimeter evolved from the start of the fire till it was put out.  Another view could provide a heat map showing how several weather variables (e.g., wind speed, temperature, and humidity) changed over the duration of the fire. 

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
After you pushed your code to your repository, follow the instruction [here](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork) to create a pull request for this repository. Finally, submit the hyperlink of the pull request to UCD Canvas. The hyperlink should look like - "https://github.com/ucdavis/ECS272-Winter2021/pull/{your-pull-request-id}". -->
