define(['jquery', 'each2darray', 'config', 'gametypes', 'cell'],

    function($,    each2DArray,   CONF,     gametypes,   newcell){

        return function(element, options){

            var
            ctx     = element.getContext('2d'),
            clear   = function(ctx, element, color, backgroundColor){
                element.width = element.width;

                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0,0,element.width,element.height);

                ctx.fillStyle = color;
            };
            clear(ctx, element, CONF.canvas.color, CONF.canvas.backgroundColor);

            return {

                element         : element,
                width           : element.width,
                height          : element.height,
                ctx             : ctx,
                color           : CONF.canvas.color             || "rgb(0,0,0)",
                backgroundColor : CONF.canvas.backgroundColor   || "rgb(255,255,255)",
                clear: function(){
                    clear(this.ctx, this.element, this.color, this.backgroundColor);
                },
                draw: function(population){
                    var canvas = this.ctx;
                    this.clear();
                    each2DArray(population, function(cell){
                        cell.draw(CONF.appearance.cell, canvas);
                    });
                },
                resize: function(population, type, x, y){

                    for (var eachX = 0; eachX <= x; eachX++){
                        if (!population[eachX]) population[eachX] = [];
                        for (var eachY = 0; eachY <= y; eachY++){
                            if (!population[eachX][eachY]){

                                var alive = false;
                                if (type === gametypes.seed){
                                    alive = population.calculateAlive();
                                }
                                if (!population[eachX][eachY]){
                                    population[eachX][eachY] = newcell(eachX,eachY,alive);
                                }

                            } // end if population[x][y] doesn't exist
                        } // end column loop
                    } // end row loop

                } // end resize

            }; // return object

        } // return factory

    }
);