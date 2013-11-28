define(['jquery'],

    function($){

        return function(x,y){

            var

            seed = function(x, y){ return { 
                x: x,
                y: y,
                alive: Math.round(Math.random()) === 1 ? true : false,
                neighbours: function(context, wrap){
                    var neighbours = [],
                        checkX,
                        checkY;
                    for(var i = -1; i <= 1; i++){
                        for (var j = -1; j <= 1; j++){
                            if (i !== 0 || j !== 0){ // don't count self

                                checkX = this.x + i;
                                checkY = this.y + j;

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

                    }}} // end two for loops and a check against counting self

                    //context[x+1][y-1],
                    //context[x]  [y-1],
                    //context[x-1][y-1],
                    //context[x+1][y],
                    ////context[x]  [y],
                    //context[x-1][y],
                    //context[x+1][y+1],
                    //context[x]  [y+1],
                    //context[x-1][y+1]

                    return neighbours;
                },
                livingNeighbours : function(context, wrap){
                    var neighbours = [];
                    $.each(this.neighbours(context, wrap), function(index, neighbour){
                        if (neighbour.alive){
                            neighbours.push(neighbour);
                        }
                    });
                    return neighbours;
                }
            } },

            seeds = function(x, y){
                var seeds = [];

                for (var countx = 0; countx < x; countx++){
                    seeds[countx] = [];
                    for (var county = 0; county < y; county++){
                        seeds[countx][county] = seed( countx, county );
                    }
                }
                return seeds;
            };

            return seeds(x, y);
        };

    }
);