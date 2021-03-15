## Final Project
### Yuhan Huang, Haixin Liu


This visualization demonstrates the daily spread of Camp fire and visualize the corresponding pre-fire conditions and post-fire damages. 

When the map is first loaded, only a light pinkish polygon will show us roughly indicating the rough boundary of the burned area. All buildings will be rendered as black informing the unburned. We also provide a tip button for users to understand the main purpose of this visualization. Once users drag the slider, the cumulative perimeters of the burned areas starting from the first day of the fire to the day selected will show up, each day will be assigned a different color changing from light purple to dark purple. Moreover, colors of those buildings within the burned perimeters will also change at the same time based on their damage levels. The five classes of the damage include: no damage (black), affected, minor, major, and destroyed (red).

On the right side of the map, red texts were set up to show the summary of building and weather information. Texts were used in here so that users can quickly get a sense about the numeric value of the hotness, dryness, and the wind speed of the day. If interested, users can also find charts visualizing these environmental conditions of the fire day below the mapping area.  

Ancillary information about the wind, fuel moisture, and temperature was collected to show the potential cause of fire spread. At a daily scale, we show the summary of these information as the mean value in the red text on the right of the dashboard for building information, temperature, fuel moisture percentage, and wind information. If the users are interested, they can further scroll down the cursor to view the corresponding charts for buildings or weather. For weather information, they were represented as the radar chart for wind direction and the scatter plot for air temperature vs. wind speed. These two factors were selected based on some supporting findings indicating the effects of high temperature and fast wind on fire progression speed. For building information, we first implemented a donut chart to give a general idea of the level of building destructions. Then we decided to use a stream chart to show the different levels of building destructions that happened each day. From a stream chart, we can see the trends of the destruction of the buildings. And since the building data does not have building damage information after November 13, 2018. We only focus on the building destructions that happened on the first five days.  






