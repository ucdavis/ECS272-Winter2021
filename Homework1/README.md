# Homework 1: Static Visualizations with Observable Notebook
In this homework, you need to choose a dataset and create at least three visualizations leading to two or more insights of the data. For visualization, you will use [Observable Notebook](https://observablehq.com/). Observable introduces the notebook paradigm to JavaScript projects. If you are familiar with Jupyter notebooks, this is the equivalent with JavaScript instead of Python. 

This is an individual assignment, so you may not work in groups. Your final submission will take the form of a report including the visualizations you will create and the description of the insights you will gain from the visualizations.

A full example of visualization and analysis of a multidimensional dataset using D3 and Vega-Lite can be found in this [here](https://observablehq.com/d/2600cf5224a01f25)

* An Observable Tutorial:  [Five-Minute Introduction to Observable](https://observablehq.com/@observablehq/five-minute-introduction) 

### Step 0: Setting up Observable
Before you can begin creating and editing a notebook you will first need to create an account with [Observable Notebook](https://observablehq.com/). To do so open a web browser and navigate to[Observable Notebook](https://observablehq.com/) click sign in and continue with either your GitHub account or one of the other options. After successfully logging in, you can then create a new blank notebook. To open a blank notebook, click the icon next to your profile picture in the top right-hand corner of the page. The icon will be to the left of your profile picture.

### Step 1: Choose a dataset from the list below
Each of the following datasets can be downloaded as CSV files.

* [LAX Passenger Counts by Terminal](https://data.lacity.org/A-Prosperous-City/Los-Angeles-International-Airport-Passenger-Traffi/g3qu-7q2u)
* [Film Locations in San Francisco](https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am)
* [List of Historical Ballot Measures in San Francisco](https://data.sfgov.org/City-Management-and-Ethics/List-of-Historical-Ballot-Measures/xzie-ixjw)
* [Louisville Restaurant Health Inspections](https://data.louisvilleky.gov/dataset/restaurant-inspection-data)

##### Loading the data
For Observable notebook, you can attach datasets as CSV files. To do so, first make sure you have opened either an existing observable notebook or an empty notebook. Then select the (...) icon on the top right, which will open a drop-down menu. Select the option "File Attachments". You should now see a menu on the right-hand side where you can upload your data (Max file size: 15MB).

* After you make an account and create a new notebok look for the (...) which reveal notebook actions located next to Publish and Like Icons in the top right.
* Click (...) and select file attachments to add in your dataset.

### Step 3: Process the data
After attaching the chosen dataset into Observable, you can begin processing the data for visualization. For data processing, vanilla javascript should be sufficient. However, feel free to use any javascript library for processing and analyzing the data. A library that you could use for both analysis and visualization is [Vega-Lite](https://vega.github.io/vega-lite/) . Vega-Lite provides a more concise and convenient form to author common visualizations.


### Step 4: Analyze and visualize the data
After processing the data, you should now have some subsets of the data you seek to visualize. For visualizing the data please try to use D3 as it will be required for future homework. However, if you are having difficulty using D3 for this homework you may use [Vega-Lite](https://vega.github.io/vega-lite/).

A full example of visualization and analysis of a multidimensional dataset using D3 and Vega-Lite can be found in this [Observable Notebook](https://observablehq.com/d/2600cf5224a01f25). You may refer to this notebook; however, **if you submit this exact visualization and analysis you will not receive any credit**.

### Example
An example of visualization and analysis of a mutlidimensional dataset can be found in [Observable](https://observablehq.com/d/2600cf5224a01f25)

### Requirements
You need to create **at least three different visualizations**, and you need to describe at least two insights (e.g. useful or important information) from your visualizations. By inspecting both the individual visualizations and seeing these visualizations side by side you should be able to see relationships or patterns within the data that you wouldn't have noticed by staring at a CSV file. Comment on these relationships. For Observable notebooks, you can use the "Text" blocks to write down your insights.


### Submission
For Observable notebooks, enable link sharing for your notebook and submit the link to HW1 in UCD Canvas.


