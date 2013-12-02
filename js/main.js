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
requirejs(['domready', 'jquery', 'canvas',     'seed', 'config', 'step', 'each2darray', 'cell',  'gametypes', 'modernizr',  'plugins', 'fullscreen'],
function   (domReady,   $,        makeCanvas,   seed,   CONF,     step,   each2DArray,   newcell, gametypes) {

    domReady(function () {

        // set up window
        var lessWindow  = { x : $('#config').innerWidth(), y : 0 };
        $('#gameoflife').fullscreen(lessWindow);

        // set up game variables
        var
        ui     = {
            run     : $('button#run'),
            reset   : $('button#reset'),
            step    : $('button#step'),
            clear   : $('button#clear'),
            speed   : $('input#speed'),
            size    : $('input#size'),
            density : $('input#density')
        },
        canvas      = makeCanvas($('#gameoflife')[0]),
        cellsize    = function(){ return CONF.appearance.cell; },
        cellcount   = { x : function(){ return Math.floor(canvas.width / cellsize().width); },
                        y : function(){ return Math.floor(canvas.height / cellsize().height); }
                      },
        population  = seed(cellcount.x(), cellcount.y()),
        speed       = function(){ return CONF.appearance.speed; },
        game        = {
            running : false,
            type    : gametypes.seed,

            // the core running function of the game
            run     : function(){
                if (game.running){
                    population = step(population);
                    canvas.draw(population); } },

            // use game.togglerun() to toggle simulation running
            togglerun: function(){
                game.running ? game.stop() : game.start(); },

            // use game.start() to start simulating
            start   : function(){
                game.running = true;
                ui.run.text('Stop')
                      .removeClass('start')
                      .addClass('stop'); },

            // use game.stop() to stop simulating
            stop    : function(){
                game.running = false;
                ui.run.text('Run')
                      .removeClass('stop')
                      .addClass('start'); }

        };
        drawing     = false;
        lastDrawn   = { x : -1, y : -1 };

        game.runner = setInterval(game.run, speed());

        // show start random generation
        canvas.draw(population);

        ui.size.val(    cellsize().width);
        ui.speed.val(   CONF.appearance.speed);
        ui.density.val( CONF.seed.density);

        // trigger game start by clicking
        ui.run.on('click.runGame', function(){
            game.togglerun();
        });

        ui.reset.on('click.resetGame', function(){

            game.type = gametypes.seed;
            game.stop();

            population  = seed(cellcount.x(), cellcount.y());
            canvas.draw(population);

        });

        ui.step.on('click.stepGame', function(){
            game.stop();

            population = step(population);
            canvas.draw(population);
        });

        ui.size.on('change.changeSize', function(event){
            CONF.appearance.cell.width  = $(this).val();
            CONF.appearance.cell.height = $(this).val();
            canvas.resize(population, game.type, cellcount.x(), cellcount.y());
            canvas.draw(population);
        });

        ui.speed.on('change.changeSpeed', function(event){
            clearInterval(game.runner);
            CONF.appearance.speed   = $(this).val();
            game.runner = setInterval(game.run, speed());
        });

        ui.density.on('change.changeDensity', function(event){
            CONF.seed.density = parseFloat($(this).val());
        });

        ui.clear.on('click.clearGame', function(event){
            game.type = gametypes.blank;
            game.stop();
            each2DArray(population, function(cell){
                cell.alive = false;
            });
            canvas.draw(population);
        });

        $(canvas.element).on('mousedown.drawCanvas', function(event){

            drawing = true;
            var x = Math.floor(event.offsetX / cellsize().width),
                y = Math.floor(event.offsetY / cellsize().height);

            if (!population[x]){
                population[x] = [];
            }
            if (!population[x][y]){
                population[x][y] = newcell(x, y, false);
            }

            population[x][y].alive = !population[x][y].alive;
            canvas.draw(population);
            lastDrawn = { x: x, y: y };

            //unselectable(canvas.element);
        });

        $(canvas.element).on('mousemove', function(event){

            var FFX = event.originalEvent.layerX - event.currentTarget.offsetLeft,
                FFY = event.originalEvent.layerY - event.currentTarget.offsetTop;

            if (drawing){
                var x = Math.floor((event.offsetX||FFX) / cellsize().width),
                    y = Math.floor((event.offsetY||FFY) / cellsize().height);

                // If the last thing drawn was not this one

                if (lastDrawn.x !== x || lastDrawn.y !== y){

                    //between({x:x,y:y}, {lastDrawn}).foreach(function(element, index, array){
                        population[x][y].alive = !population[x][y].alive;
                    //});
                    canvas.draw(population);

                    lastDrawn = { x: x, y: y };
                }
            }

        });

        $(window).on('mouseup', function(event){
            drawing = false;
            lastDrawn = { x : -1, y : -1 };
        });

    });

});