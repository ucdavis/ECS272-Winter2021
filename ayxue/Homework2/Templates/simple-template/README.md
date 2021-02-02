Illustrates how to use Vladimir Agafonkin's clever [simpleheat](https://github.com/mourner/simpleheat)
JS library to overlay a heatmap of Hopper search destinations on a D3 map.

Just for fun we use a separate svg layer 'under' the canvas to display the map, although it's easy enough to have
D3 render direct to the canvas.  The default canvas (and svg) 'background' is transparent so we can see through layers,
making it easy to build up (say) an animated heatmap over a static map without continually redrawing the latter.
