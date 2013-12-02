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
requirejs(['domready', 'jquery', 'canvas',     'seed', 'config', 'step', 'each2darray', 'cell', 'modernizr',  'plugins', 'fullscreen'],
function   (domReady,   $,        makeCanvas,   seed,   CONF,     step,   each2DArray,   newcell) {

    domReady(function () {

        // set up window
        var lessWindow  = { x : $('#config').innerWidth(), y : 0 };
        $('#gameoflife').fullscreen(lessWindow);

        // set up game variables
        var
        canvasEl    = $('#gameoflife'),
        ui     = {
            run     : $('button#run'),
            reset   : $('button#reset'),
            step    : $('button#step'),
            clear   : $('button#clear'),
            speed   : $('input#speed'),
            size    : $('input#size'),
            density : $('input#density')
        },
        canvas      = makeCanvas(canvasEl[0]),
        cellsize    = CONF.appearance.cell,
        cellcount   = { x : Math.floor(canvas.width / cellsize.width),
                        y : Math.floor(canvas.height / cellsize.height) },
        population  = seed(cellcount.x, cellcount.y),
        speed       = function(){ return CONF.appearance.speed; },
        game        = {
            running : false,
            run     : function(){
                if (game.running){
                    population = step(population);
                    canvas.clear();
                    canvas.draw(population); 
                }
            }

        };
        drawing     = false;
        lastDrawn   = { x : -1, y : -1 };

        game.runner = setInterval(game.run, speed());

        function fixButton(){
            if (game.running){
                ui.run.text('Stop');
                ui.run.removeClass('start');
                ui.run.addClass('stop');
            } else {
                ui.run.text('Run');
                ui.run.removeClass('stop');
                ui.run.addClass('start');
            }
        }

        // show start random generation
        canvas.draw(population);

        ui.size.val(    cellsize.width);
        ui.speed.val(   CONF.appearance.speed);
        ui.density.val( CONF.seed.density);

        // trigger game start by clicking
        ui.run.on('click.runGame', function(){
            game.running = !game.running;
            fixButton();
        });

        ui.reset.on('click.resetGame', function(){
            game.running = false;
            fixButton();
            population  = seed(cellcount.x, cellcount.y);
            canvas.clear();
            canvas.draw(population);
        });

        ui.step.on('click.stepGame', function(){
            game.running = false;
            fixButton();
            population = step(population);
            canvas.clear();
            canvas.draw(population);
        });

        ui.size.on('change.changeSize', function(event){
            CONF.appearance.cell.width = $(this).val();
            CONF.appearance.cell.height = $(this).val();
            cellsize = CONF.appearance.cell;
            cellcount   = { x : Math.floor(canvas.width / cellsize.width),
                            y : Math.floor(canvas.height / cellsize.height) };
            canvas.clear();
            canvas.draw(population);
        });

        ui.speed.on('change.changeSpeed', function(event){
            clearInterval(game.runner);
            CONF.appearance.speed   = $(this).val();
            game.runner = setInterval(game.run, speed());
        });

        ui.density.on('change.changeDensity', function(event){
            console.log(CONF.seed.density);
            console.log($(this).val());
            CONF.seed.density = parseFloat($(this).val());
        });

        ui.clear.on('click.clearGame', function(event){
            game.running = false;
            fixButton();
            each2DArray(population, function(cell){
                cell.alive = false;
            });
            canvas.clear();
            canvas.draw(population);
        });

        $(canvas.element).on('mousedown.drawCanvas', function(event){

            console.log("Mousedown!");

            drawing = true;
            var x = Math.floor(event.offsetX / cellsize.width),
                y = Math.floor(event.offsetY / cellsize.height);
            if (!population[x]){
                population[x] = [];
                if (!population[x][y]){
                    population[x][y] = newcell(x, y, false);
                }
            }
            population[x][y].alive = !population[x][y].alive;
            canvas.clear();
            canvas.draw(population);
            lastDrawn = { x: x, y: y };

            //unselectable(canvas.element);
        });

        $(canvas.element).on('mousemove', function(event){

            var FFX = event.originalEvent.layerX - event.currentTarget.offsetLeft,
                FFY = event.originalEvent.layerY - event.currentTarget.offsetTop;

            if (drawing){
                var x = Math.floor((event.offsetX||FFX) / cellsize.width),
                    y = Math.floor((event.offsetY||FFY) / cellsize.height);
                console.log("Mousemove!",event,event.offsetX||FFX,event.offsetY||FFY);

                // If the last thing drawn was not this one

                if (lastDrawn.x !== x || lastDrawn.y !== y){

                    //between({x:x,y:y}, {lastDrawn}).foreach(function(element, index, array){
                        population[x][y].alive = !population[x][y].alive;
                    //});
                    canvas.clear();
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