$.fn.fullscreen = function() {

	var elements = this;

	var fullscreen = function(){
		$.each(elements, function(index, element){
			$(element).width(  $(window).innerWidth() - 1 )
                   	  .height( $(window).innerHeight() - 1 );
		});
	};

	fullscreen();
	$(window).resize(function(){ fullscreen(); });

};