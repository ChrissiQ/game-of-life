define(['jquery'],

    function($){

        return function(element, options){

            var
            ctx     = element.getContext('2d'),
            clear   = function(ctx, element, color, backgroundColor){
                element.width = element.width;

                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0,0,element.width,element.height);

                ctx.fillStyle = color;
            };
            clear(ctx, element, options.color, options.backgroundColor);

            return {

                element         : element,
                width           : options.offset.x + element.width,
                height          : options.offset.y + element.height,
                ctx             : ctx,
                color           : options.color             || "rgb(0,0,0)",
                backgroundColor : options.backgroundColor   || "rgb(255,255,255)",
                clear: function(){
                    clear(this.ctx, this.element, this.color, this.backgroundColor);
                }

            }; // return object

        } // return factory

    }
);