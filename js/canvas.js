define(['jquery', 'each2darray', 'config'],

    function($,    each2DArray,   CONF){

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
                    each2DArray(population, function(cell){
                        cell.draw(CONF.appearance.cell, canvas);
                    });
                }

            }; // return object

        } // return factory

    }
);