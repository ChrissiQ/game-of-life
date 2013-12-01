define(['jquery'],

    function($){

        return function(x, y, alive){ 
            return {

                x: x,
                y: y,

                alive: alive,

                neighbours: function(context, wrap) {
                    var neighbours = [],    kin = [-1, 0, 1],
                        seeds      = this,  checkX,     checkY;

                    kin.forEach( function(i) {
                        kin.forEach( function(j) {
                            if (i !== 0 || j !== 0){ // you are not your own neighbour

                                checkX = seeds.x + i;
                                checkY = seeds.y + j;

                                if (wrap){
                                    if (checkX >= context.length)   checkX = 0;
                                    else if (checkX < 0)            checkX = context.length - 1;
                                    if (checkY > context[checkX].length) checkY = 0;
                                    else if (checkY < 0)            checkY = context[checkX].length - 1;
                                }
                                if (context[checkX]
                                &&  context[checkX][checkY]){
                                    neighbours.push(context[checkX][checkY]);
                                }

                            }
                        });
                    });
                    return neighbours;
                },

                livingNeighbours : function(context, wrap) {
                    var neighbours = [];
                    $.each(this.neighbours(context, wrap), function(index, neighbour){
                        if (neighbour.alive){
                            neighbours.push(neighbour);
                        }
                    });
                    return neighbours;
                },

                draw : function(size, ctx) {
                    if (this.alive){
                        ctx.fillRect(this.x*size.width,
                                     this.y*size.height,
                                     size.width,
                                     size.height
                        );
                    }
                }

            }; // returned object
        }; // returned factory

    }
);