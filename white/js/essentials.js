//Owl Slider Control
$(document).ready(function() {
	
	$('#alert-slider').owlCarousel({
		items: 1,					
		margin: 0,
		loop: true,
		nav: true,
		dots: false,
		autoplay: false,
	});

	$('#hero-slider').owlCarousel({
		items: 1,					
		margin: 0,
		loop: true,
		nav: true,
		dots: false,
		autoplay: true,
		autoHeight:true,
	});
	
	
	$('#sliding-nav').owlCarousel({
		items: 1,					
		margin: 0,
		loop: false,
		nav: true,
		dots: false,
		autoplay: false,
		autoWidth:true,
	});

	var fixOwl = function(){
	if ($(window).width() > 1200) {	
        var $stage = $('#logo-band .owl-stage'),
            stageW = $stage.width(),
            $el = $('#logo-band .owl-item'),
            elW = 0;
        $el.each(function() {
            elW += $(this).width()+ +($(this).css("margin-right").slice(0, -2))+ +($(this).css("margin-left").slice(0, -2))
        });
        if ( elW > stageW ) {
            $stage.width( elW + 10);
        };
    }
    }

	var totalItems = $('#logo-band .item').length;
	var dotslg = true;
	if (totalItems < 5) {
		dotslg = false;
		$('#logo-band').addClass('bullet-disabled');
	}
	
	$('#logo-band').owlCarousel({
		items: 5,
		margin: 40,
		nav: true, 
		dots: false,
		autoplay: true, 
		autoplayTimeout: 3000,
		loop: true,
		autoWidth: true,
		autoHeight: true,
		responsive:{
			0:{
				items: 1,
				margin: 0,
				nav: true, 
				dots: false,
				autoWidth: false,
				autoHeight: false,
			},
			
			480:{
				items: 2,
				margin: 30,
				nav: true, 
				dots: false,
				autoWidth: false,
				autoHeight: false,
			},
			768:{
				items: 3,
				margin: 30,
				nav: true, 
				dots: false,
				autoWidth: false,
				autoHeight: false,
			},
			992:{
				items: 5,
				margin: 30,
				nav: true, 
				dots: false,
				autoWidth: false,
				autoHeight: false,
			},
			1200:{
				items: 5,
				margin: 40,
				nav: true, 
				dots: false,
				autoplay: true, 
				autoWidth: false,
				autoHeight: true,
			}
		},
		onInitialized: fixOwl,
        onRefreshed: fixOwl
	});
	
	
	$('.slider-carousel').owlCarousel({
		items: 1,					
		margin: 0,
		loop: false,
		nav: true,
		dots: true,
		autoplay: false,
	});
	
	$('.hero-slider-22').owlCarousel({
		items: 1,					
		margin: 0,
		loop: false,
		nav: true,
		dots: true,
		autoplay: false,
		autoHeight: false,
	});

});