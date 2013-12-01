define(['jquery', 'cell', 'config'],

    function($, cell,      CONF){

        return function(x, y){
            var population = [];

            for (var countx = 0; countx < x; countx++){
                population[countx] = [];
                for (var county = 0; county < y; county++){
                    population[countx][county] = cell(
                        countx,
                        county,
                        Math.round(Math.random() * (CONF.seed.density + 0.5)) === 1 ? true : false
                    );
                }
            }
            return population;
        };

    }
);