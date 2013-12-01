define(['jquery'],

    function($){

        return function(arr, runFunction, startRowFunction){

            $.each(arr, function(index1, arr1){
            	if (startRowFunction) startRowFunction(arr1, index1);
                $.each(arr1, function(index2, arr2){
                    runFunction(arr2, arr1, index1, index2);
                });
            });

            
        };

    }
);