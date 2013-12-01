define(['jquery', 'config', 'cell',     'each2darray'],

    function($,    CONF,     createcell, each2DArray){

        return function(population){

            var newpopulation = [],
                liveNeighbours;

            each2DArray(population, function(cell){

                // 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
                // 2. Any live cell with two or three live neighbours lives on to the next generation.
                // 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
                // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                liveNeighbours = cell.livingNeighbours(population, true).length;

                newpopulation[cell.x][cell.y] = createcell(cell.x, cell.y, cell.alive);

                // 1 & 3
                if (cell.alive && CONF.game.starve(liveNeighbours) ){
                    newpopulation[cell.x][cell.y].alive = false;

                // 4
                } else if (!cell.alive && CONF.game.resurrect(liveNeighbours)){
                    newpopulation[cell.x][cell.y].alive = true;
                }

            }, function(row, index){
                newpopulation[index] = [];
            });

            return newpopulation;

        };
    }
);