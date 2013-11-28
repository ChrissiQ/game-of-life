$.fn.fullscreen = function(lessWindow) {

	var elements = this;

	var fullscreen = function(lessWindow){
		$.each(elements, function(index, element){
			$(element).attr('width', $(window).innerWidth() - lessWindow.x )
                   	  .attr('height', $(window).innerHeight() - lessWindow.y );
		});
	};

	fullscreen(lessWindow);
	$(window).resize(function(){ fullscreen(lessWindow); });

};