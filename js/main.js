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
requirejs(['domready', 'jquery', 'canvas',     'seed', 'each2DArray', 'config', 'cell',     'modernizr',  'plugins', 'fullscreen'],
function   (domReady,   $,        makeCanvas,   seed,   each2DArray,   CONF,    createcell) {

    domReady(function () {
        var 
        lessWindow  = { x : 0, y : 0 };

        $('#gameoflife').fullscreen(lessWindow);

        var
        canvasEl    = $('#gameoflife'),
        offset      = { x : 0, y : 0 },
        canvas      = makeCanvas(canvasEl[0], {
            color           : CONF.canvas.color,
            backgroundColor : CONF.canvas.backgroundColor,
            offset          : offset
        }),
        cellsize    = CONF.appearance.cell,
        cellcount   = { x : Math.floor(canvas.width / cellsize.width),
                        y : Math.floor(canvas.height / cellsize.height) },
        speed       = CONF.appearance.speed,
        population  = seed(cellcount.x, cellcount.y),
        game;

        each2DArray(population, function(cell){
            cell.draw(cellsize, offset, canvas.ctx);
        });

        game = setInterval(function(){

            var newpopulation = [],
                liveNeighbours;

            each2DArray(population, function(cell){

                // 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
                // 2. Any live cell with two or three live neighbours lives on to the next generation.
                // 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
                // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                liveNeighbours = cell.livingNeighbours(population, true).length;

                newpopulation[cell.x][cell.y] = createcell(cell.x, cell.y, false);

                // 1 & 3
                if (cell.alive && CONF.game.starve(liveNeighbours) ){
                    newpopulation[cell.x][cell.y].alive = false;

                // 4
                } else if (!cell.alive && CONF.game.resurrect(liveNeighbours)){
                    newpopulation[cell.x][cell.y].alive = true;

                // 2
                } else {
                    newpopulation[cell.x][cell.y].alive = cell.alive;
                }

            }, function(row, index){
                newpopulation[index] = [];
            });

            population = newpopulation;

            // re-draw
            canvas.clear();
            each2DArray(population, function(cell){

                cell.draw(cellsize, offset, canvas.ctx);

            });

        }, speed);

        $(window).on('click.stopGame', function(){
            clearInterval(game);

            var div     = $('<div />').attr('id', 'init-game').addClass('modal fixed').appendTo('body'),
                child   = $('<div />').text('Hello!').appendTo(div);

            $(window).off('click.stopGame');
        });

    });

});