requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery      : 'jquery-1.10.2.min',
        modernizr   : 'modernizr-2.7.0.min'
    },
    shim: {
        fullscreen     : ['jquery']
    }
});

// Start the main app logic.
requirejs(['domready', 'jquery', 'preparecanvas', 'seed', 'eachseed', 'modernizr',  'plugins', 'fullscreen'],
function   (domReady,   $,        prepareCanvas,   seed,   eachseed) {

    domReady(function () {

        $('#gameoflife').fullscreen();

        var
        canvasEl    = $('#gameoflife'),
        ctx         = prepareCanvas( canvasEl[0], "rgb(0,0,0)" ),
        canvas      = { width: canvasEl.innerWidth(), height: canvasEl.innerHeight() },
        cell        = { width   : 8,
                        height  : 8 },
        speed       = 150,
        seeds;

        cell.x      = Math.floor(canvas.width / cell.width);
        cell.y      = Math.floor(canvas.height / cell.height);

        seeds       = seed(cell.x, cell.y);

        eachseed(seeds, function(s){
            if (s.alive){
                ctx.fillRect(s.x*cell.width,
                             s.y*cell.height,
                             cell.width,
                             cell.height
                );
            }
        });

        setInterval(function(){
                // Refresh the canvas.
                canvasEl[0].width = canvasEl[0].width;

            eachseed(seeds, function(s){

                var liveNeighbours = s.livingNeighbours(seeds, true).length;

                if (s.alive){

                    // 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
                    // 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
                    if (liveNeighbours < 2
                    ||  liveNeighbours > 3){
                        s.alive = false;
                    }
                } else {
                    // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                    if (liveNeighbours === 3){
                        s.alive = true;
                    }
                }

                if (s.alive){
                    ctx.fillRect(s.x*cell.width,
                                 s.y*cell.height,
                                 cell.width,
                                 cell.height
                    );
                }
            });

        }, speed);

    });

});