$.fn.fullscreen = function() {

	var elements = this;

	var fullscreen = function(){
		$.each(elements, function(index, element){
			$(element).attr('width', $(window).innerWidth() )
                   	  .attr('height', $(window).innerHeight() );
		});
	};

	fullscreen();
	$(window).resize(function(){ fullscreen(); });

};