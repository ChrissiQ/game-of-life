requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery      : 'jquery-1.10.2.min',
        modernizr   : 'modernizr-2.7.0.min'
    }
});

// Start the main app logic.
requirejs(['domready', 'jquery', 'modernizr',  'plugins'],
function   (domReady,   $) {

    domReady(function () {

        // Insert application here.
        console.log("Your DOM is ready.");
        
    });

});