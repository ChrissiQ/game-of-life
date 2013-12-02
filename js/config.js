define(['jquery'],
    function($){
        return {


            canvas  : {
                color           : "rgb(100,100,100)",
                backgroundColor : "rgb(200,200,200)"
            },
            appearance          : {
                cell            : {
                    width       : 20,
                    height      : 20
                },
                speed           : 200
            },
            game    : {
                starve          : function(liveNeighbours) {
                                    return liveNeighbours < 2 ||  liveNeighbours > 3;
                },
                resurrect       : function(liveNeighbours) {
                                    return liveNeighbours === 3;
                }
            },
            seed    : {
                density         : 0.1
            }



        }; // return factory
    }
);