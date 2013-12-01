define(['jquery', 'cell'],

    function($, cell){

        return function(x, y){
            var population = [];

            for (var countx = 0; countx < x; countx++){
                population[countx] = [];
                for (var county = 0; county < y; county++){
                    population[countx][county] = cell(
                        countx,
                        county,
                        Math.round(Math.random() * 0.6) === 1 ? true : false
                    );
                }
            }
            return population;
        };

    }
);