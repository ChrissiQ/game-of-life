define(['jquery'],

    function($){

        return function(seeds, runFunction){

            $.each(seeds, function(row, rows){
                $.each(rows, function(column, s){
                    runFunction(s);
                });
            });

            
        };

    }
);