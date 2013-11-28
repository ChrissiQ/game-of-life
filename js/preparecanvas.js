define(['jquery'],

    function($){

        return function(element, colour){


            console.log("I am preparing the canvas:", element);

            var ctx = element.getContext('2d');
            ctx.fillStyle = colour;
            return ctx;

        }

    }
);