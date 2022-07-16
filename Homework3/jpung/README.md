# Visualization desription & Dataset
This project visualizes the first-generation Pokemon base stats. I used the dataset `Pokémon for Data Mining and Machine Learning` which was suggested in the homework3 guidance. Since there are many Pokemons in the dataset, I filtered only 1st generation Pokemons during preprocessing.

# Dependencies
This project was built on react app. Used libraries are the same as the provided react-template.
First, run `npm i` to install the necessary dependencies. If done, run `npm start`.

# Views and interaction
There are three information visualizations: two context views, and one focus view.

The first context view is a brushable parallel coordinate chart. 
It show the overall base stats of entire Pokemons.
This view can be used to explore the possible correlation between stats.
You can brush Pokemons that have specific stats.

The second context view is a zoomable bar chart.
It shows the total scores of the entire Pokemons.
Since 151 Pokemons are quite many, I added pan and zoom function so that people can focus on their interested Pokemons.

Finally, the focus view is a bar chart with transition animation.
If you want to see detailed stats info of specific Pokemon, just type its Pokemon number in the textbox and click the view button.
As you change Pokemon number, the bar chart will be updated with animation.