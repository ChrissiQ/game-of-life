define(['jquery'],
    function($){
        return {


            canvas  : {
                color           : "rgb(100,100,100)",
                backgroundColor : "rgb(200,200,200)"
            },
            appearance          : {
                cell            : {
                    width       : 8,
                    height      : 8
                },
                speed           : 150
            },
            game    : {
                starve          : function(liveNeighbours) {
                                    return liveNeighbours < 2 ||  liveNeighbours > 3;
                },
                resurrect       : function(liveNeighbours) {
                                    return liveNeighbours === 3;
                }
            }



        } // return factory
    }
);