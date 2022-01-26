// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function(){
  	
	$window = $(window);


	/* 
	 * Navbar Spy Function 
	 * */
	
	var $bar = $('#sec-navbar .navbar'),
		$barParent = $bar.parent(),
		navTop;
	
	function checkNavbar() {
		
		var scrollTop = $window.scrollTop();
		
		if((navTop - scrollTop) < 0) {
		
			$bar.addClass('navbar-fixed-top')
			$barParent.addClass('fill-navbar');
		
		} else {
		
			$bar.removeClass('navbar-fixed-top')
			$barParent.removeClass('fill-navbar');
		}
		
		$('section').each(function() {
		
			var $section = $(this), item;
			
			if ( $section.offset().top - (40 + scrollTop) <= 0 ) {
				item = $bar.find('[href=#'+$section[0].id+']')
				if(item.length) {
					$bar.find('.active').removeClass('active')
					$bar.find('[href=#'+$section[0].id+']').parent().addClass('active')
				}
			}
		})
	}
	
	/* return if navbar is fixed */
	function navbarIsFixed(){
		return $('#sec-navbar .navbar').hasClass('navbar-fixed-top');
	} 


	/* 
	 * Window load  
	 * */
	
	$window.load(function() {
		
		/* hide preloder */
		$('#site-preloader').fadeOut('slow')
		

		/* Lush Content Slider */
		$('.lush-slider').lush({
		    baseWidth: 1899,
		    baseHeight: 500,
		    slider: {
		    	shadow: false,
		    	navigation: false,
		    	fullPreload: true
		    }
		})		
		
		// get the navbar offset
		navTop = $bar.offset().top;
		// check if go off screen
		checkNavbar();
		
	})
	
	/* Gridex plugin */
	$('.gridex').gridex({
		offsetTop: 130
	});
	
	
	/* tooltips */
	$('.with-tooltip').tooltip()
	
    /* GMap */
    if(typeof google !== 'undefined')
    
	    $('.gmap').each(function(){
	      var d = $(this).data('markers').split(';'),
	          m = [];
	
	      for(a in d) 
	      	m.push({'address' : d[a]})
	
	      $(this).gMap({
	        zoom: $(this).data('zoom'),
	        markers: m,
	        scrollwheel: false
	      });
    })

    /* Tweet! */
    $(".tweet-feed").each(function(){
    	var username = $(this).data('username')
    	$(this).tweet({
          username: username,
          count: 1,
          template: '{text}<br/>{time}'
        });
	})
	
	$window
		.on('scroll', checkNavbar)
		.on('resize', function() {
			$bar.removeClass('navbar-fixed-top')
			navTop = $bar.offset().top
			checkNavbar();
		})

	$('.scroll-to > li > a').on('click', function(e){
		e.preventDefault();
		var anchor 		= $(this),
			linkParent 	= anchor.parent();  
		$('html, body').stop().animate({  
		        scrollTop: $(anchor.attr('href')).offset().top - (navbarIsFixed() ? 70 : 140)  
		    }, 1000, function() {
		    	linkParent.siblings('.active').removeClass('active');
		    	linkParent.addClass('active');
		    });
		  
	})
	
  })
	

}(window.jQuery)


