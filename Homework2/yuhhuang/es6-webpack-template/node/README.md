## ECS272 Homework 2
### Yuhan Huang

This dashboard focuses on the Spotify Dataset. It analysis changes of popular songs and their evaluation metrics through the time as well as the characteristics of those most popular songs.

visualizations:
1. Scatter Plot 
2. Spider Chart
3. Time series of metrics

<br>scripts:
<br>./node/src/js
<br>barchart.js: functions for visualization
<br>data_munging.py: python code for data processing. The size of the file 'data.csv' makes it slow to load visualizations so use this script to extract some subsets of the data.
<br>./node/dist
<br>index.html: dashboard for visualization
<br>./node/src
<br>index.js: run functions and load data
<br>./node/src/css
<br>style.css: adjusting attributes of html elements

<br>data: Soptify Data Archive
<br>./node/src/assets/data
<br>data.csv and data_year_popularity.csv: files from the Spotify dataset, one for all songs and the other for annual summary of some song metrics.
<br>data_year_popularity.csv: generated by the script 'data_munging.py' from the 'data.csv' file; includes 50 most popular songs for each year and was used for the scatter plot.
<br>popular_song.json: generated by the script 'data_munging.py' from the data.csv file; includes the 4 most popular songs since 1920 and was used for the Spider chart.

<br>result snapshot:
<br>./node/OutputScreenshot.PNG: a snapshot of the dashboard taken from a full-screen 14" display


