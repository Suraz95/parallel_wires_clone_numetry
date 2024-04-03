//Sticky Header
$(document).ready(function() {
	var offset = $(".header-main").offset();
	var sticky = document.getElementById("header-main");
	var additionalPixels = 0;
	$(window).scroll(function () {
	    if ($(document).scrollTop() > offset.top - additionalPixels) {
		   $('.header-main').addClass('fixed');
	    } else {
		   $('.header-main').removeClass('fixed');
	    }
	});
});


//Offcanvas Menu
(function($) {
	$("#menu").mmenu({
		extensions: ["pagedim"],
		offCanvas: {
			position  : "right",
			zposition	: "front",
			width     : "290"
		},
		navbars		: {
			content : [ "prev", "close" ],
			height 	: 120
		}
	});
})(jQuery);

//Language Selector OnClick

$('body').on('click', '.header-right .language-dropdown span.select', function() {
 	$(this).parent().toggleClass('active');
});

$('body').on('click', '.header-right .language-dropdown span a', function() {
 	$('.language-dropdown').toggleClass('active');
		$('.language-dropdown').prepend($(this).parent());


});

function readCookie(name) {
    var c = document.cookie.split('; '),
    cookies = {}, i, C;

    for (i = c.length - 1; i >= 0; i--) {
        C = c[i].split('=');
        cookies[C[0]] = C[1];
     }

     return cookies[name];
}

// Custom Codes
$(document).ready(function() {
	if(readCookie('googtrans')){
		var lang = readCookie('googtrans').substring(4, 6);
		$('.language-dropdown').prepend($('.language-dropdown span.'+lang));
		console.log(lang);
	}
	
	$('.collapse').on('shown.bs.collapse', function () {
        $(this).parent().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).parent().removeClass('active');
    });	
	
	$('.header-right').clone().appendTo('.mm-menu .mm-panel:first-child').addClass('mm-apnt');
	$('.mega-menu').clone().appendTo('.main-menu .mega-menu-item').addClass('mega-menu-apnt');
	
	$('.main-menu .mega-menu-item').hover(function () {
		$('.megamenu-overlay').toggleClass('show-over');
	});
	
	$(function () {
		$('[data-toggle="tooltip"]').tooltip({html: true});
	});
	
	$('input,textarea').focus(function(){
		$(this).data('placeholder',$(this).attr('placeholder'))
	.attr('placeholder','');
	}).blur(function(){
		$(this).attr('placeholder',$(this).data('placeholder'));
	});
	
});


(function($) {
// Color the empty select
$.fn.selectColored = function(options) {
	var defaults = {
		def        : -1,
		classSel   : 'colorize',
		classEmpty : 'empty',
		classDef   : 'def'
	};
	// extend default options with those provided
	var opts = $.extend(defaults, options);

	// implementation code
	return this.each(function() {
		var $select = $(this);
		$select
			.addClass(opts.classSel)
			.find('option[value="' + opts.def + '"]')
			.addClass(opts.classDef);

		function color() {
			$select.toggleClass(opts.classEmpty, ($select.val() == opts.def));
		}

		$select.bind('change', function() {
			color();
		});

		// initialize
		color();
	});
};// end plugin definition
})(jQuery);

$(document).ready(function() {
	$('select').selectColored();
});



//Play oembed video onclick

$(document).ready(function() {
	$('.video-block figure.video-thumb').click(function () {
		var $container = $(this);
		var video = $container.attr('data-video');
		var oembed = '<div class="video-container"><iframe src="'+video+'" frameborder="0" '+
					 'allow="accelerometer; autoplay; encrypted-media; '+
					 'gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
		$container.parent().append(oembed);
		$(this).remove();

	});


});

jQuery(document).ready(function() {
  //ajax code to handle news request.
  jQuery('#load-news').click(function(e) {
    //alert (CoverageAjax.ajaxurl);
    e.preventDefault();
    $('div.loader').show();
    var offset = jQuery(".news-block").length; 
    //alert(offset);
    offset = parseInt(offset);
    jQuery.ajax({
      type: "GET",
      url: PWAjax.ajaxurl, // check the exact URL for your situation
      dataType: 'json',
      data: ({ action: 'getNews', offset: offset}),
      success: function(response){
        
        $(".news-section").append(response.body);
        
        if(response.remaining_post<=0) {
          $("#load-news").addClass('done');
          $("#load-news").unbind('click');
        } 
        $('div.loader').hide();
      },
      error: function(data)  
      {  
        alert("Your browser broke!");
        return false;
      }
    });
  });
});


jQuery(document).ready(function() {
  //ajax code to handle news request.
  jQuery('#load-press').click(function(e) {
    //alert (CoverageAjax.ajaxurl);
    e.preventDefault();
    $('div.loader').show();
    var offset = jQuery(".press-block").length; 
    //alert(offset);
    offset = parseInt(offset);
    jQuery.ajax({
      type: "GET",
      url: PWAjax.ajaxurl, // check the exact URL for your situation
      dataType: 'json',
      data: ({ action: 'getPressRelease', offset: offset}),
      success: function(response){
        
        $(".press-section").append(response.body);
        
        if(response.remaining_post<=0) {
          $("#load-press").addClass('done');
          $("#load-press").unbind('click');
        } 
        $('div.loader').hide();
      },
      error: function(data)  
      {  
        alert("Your browser broke!");
        return false;
      }
    });
  });
});


/*Translate Close*/
jQuery(document).ready(function() {
	$('#translate-close').click(function() {
		$('#translate-close').hide();
		$('#glt-translate-trigger').hide();
	})
});



/************************* Recent Press Release fixes - Jason 01/2022 ***************************/

jQuery( document ).ready(function() {
	var page = 1;
	if(document.querySelector('.post-nav')) {
		
		var tags = [];
		
		$.ajax({
			url: "/wp-json/wp/v2/tags",
		}).done(function( data ) { 
			tags = data;
		})
		
		function parseTags(itemTags, allTags) {
			var tagHTML = '';
			if(itemTags.length > 0) {
				itemTags.forEach(function(tag) {
					allTags.forEach(function(tag2) {
						if(tag2.id == tag) {
							tagHTML += `<li><a href="` + tag2.link + `">` + tag2.name + `</a></li>`;
						}
					})
				})
			return tagHTML;
				
			} else {
				return "";
			}
		}
		
		if(document.querySelectorAll('.colorize')[0]) {
			var dateF = document.querySelectorAll('.colorize')[0];
			if(document.querySelectorAll('.colorize')[1]) {
				var catF = document.querySelectorAll('.colorize')[1];
			} else {
				var catF = {};
				catF.value = [];
			}
		}
		
		function dateConvert(dateItem) {
			var someDate = new Date(dateItem);
			const monthNames = ["January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November", "December"
			];
			
			return "" + monthNames[someDate.getMonth()] + " " + someDate.getDate() + ", " + someDate.getFullYear() + "";
		}
		
		function dateConvert2(dateItem) {
			var someDate = new Date(dateItem);
			const monthNames = ["January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November", "December"
			];
			
			if((someDate.getMonth() + 1) < 10) {
				var month = '0' + (someDate.getMonth() + 1);
			} else {
				var month = (someDate.getMonth() + 1);
			}
			
			if(someDate.getDate() < 10) {
				var day = '0' + someDate.getDate();
			} else {
				var day = someDate.getDate();
			}
			
			return "" + month + "." + day + "." + someDate.getFullYear().toString().substr(-2) + "";
		}
		
		function changePage(pageNum) {
			$.ajax({
				url: "/wp-json/wp/v2/postS?per_page=4&page=" + (pageNum) + "",
			}).done(function( data ) {
				page = pageNum;
				document.querySelector('.post-nav').classList.toggle('disabled');
				document.querySelector('.post-band .container .row').style.opacity = 0;
				setTimeout(function() {
					document.querySelector('.post-band .container .post-list .row').innerHTML = '';
					data.forEach(function(item) {
						document.querySelector('.post-band .container .post-list .row').innerHTML +=
							`<div class="col-sm-6">
							<div class="post-content-wrap">
							<div class="post-date">` + dateConvert2(item.date) + `</div>
							<h2 class="post-title"><a href="` + item.link + '" />' + item.title.rendered + `</a></h2>
							<div class="post-excerpt">` + item.excerpt.rendered + `</div>
							<ul class="post-tags">
							` + parseTags(item.tags, tags) + `              
							</ul>
							<div class="btn-out"> 
							<a href="` + item.link + `">Read More
							<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8.6 16.9" style="enable-background:new 0 0 8.6 16.9;" xml:space="preserve">
							<path class="st0" d="M7.3,9.7c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2c-0.7,0-1.3,0.5-1.3,1.2C6.1,9.1,6.6,9.7,7.3,9.7z
							M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2
							c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M1.3,2.4c0.7,0,1.2-0.5,1.2-1.2C2.5,0.5,1.9,0,1.3,0
							C0.6,0,0,0.5,0,1.2C0,1.9,0.6,2.4,1.3,2.4z M3,12.1c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2
							C3.6,10.9,3,11.4,3,12.1z M0,15.7c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C0.6,14.5,0,15,0,15.7z"></path>
							</svg>
							</a> 
							</div>
							</div>
							</div>`
					});
					document.querySelector('.post-band .container .row').style.opacity = 1;
					document.querySelector('.post-nav').classList.toggle('disabled');
				}, 500)
			});
		}
		
		function changePage2(pageNum) {
			if(catF.value.length > 0) {
				var cat = "&press_release_categories=" + catF.value;
			} else {
				var cat = "";
			}

			if(dateF.value.length > 0) {
				var date = "&after=" + dateF.value + "-01-01T01:01:01&before=" + (parseInt(dateF.value)+1) + "-01-01T01:01:01"
			} else {
				var date = "";
			}
			if(page) {
				$.ajax({
					url: "/wp-json/wp/v2/press_release?per_page=3&page=" + (parseInt(pageNum)) + cat + date,
				}).done(function( data ) {
					page = pageNum;
					document.querySelector('.post-nav').classList.add('disabled');
					document.querySelector('.press-release-filtered .container .row').style.opacity = 0;
					setTimeout(function() {
						document.querySelector('.press-release-filtered .container .row div').innerHTML = '';
						data.forEach(function(item) {
							document.querySelector('.press-release-filtered .container .row div').innerHTML +=
								`<div class="press-release-item">
								<div class="post-date">` + dateConvert(item.date) + `</div>
								<h2 class="post-title"><a href="` + item.link + '" />' + item.title.rendered + `</a></h2>
								<div class="btn-out"> <a href="` + item.link + `">Read More
								<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8.6 16.9" style="enable-background:new 0 0 8.6 16.9;" xml:space="preserve">
								<path class="st0" d="M7.3,9.7c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2c-0.7,0-1.3,0.5-1.3,1.2C6.1,9.1,6.6,9.7,7.3,9.7z
								M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2
								c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M1.3,2.4c0.7,0,1.2-0.5,1.2-1.2C2.5,0.5,1.9,0,1.3,0
								C0.6,0,0,0.5,0,1.2C0,1.9,0.6,2.4,1.3,2.4z M3,12.1c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2
								C3.6,10.9,3,11.4,3,12.1z M0,15.7c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C0.6,14.5,0,15,0,15.7z"></path>
								</svg>
								</a> </div>
								</div>`
						});
						document.querySelector('.press-release-filtered .container .row').style.opacity = 1;
						//document.querySelector('.post-nav').classList.toggle('disabled');
					}, 500)
				});
			}
		}
		
		function setNavNums2(targetNum) {
			var checks = [false, false, false];
			var timer = []
			
			if(catF.value.length > 0) {
				var cat = "&press_release_categories=" + catF.value;
			} else {
				var cat = "";
			}
			
			if(dateF.value.length > 0) {
				var date = "&after=" + dateF.value + "-01-01T01:01:01&before=" + (parseInt(dateF.value)+1) + "-01-01T01:01:01"
			} else {
				var date = "";
			}
			
			$.ajax({
				url: "/wp-json/wp/v2/press_release?per_page=3&page=" + (parseInt(targetNum) - 1) + cat + date,
			}).done(function( data ) {
				checks[0] = true;
				timer.push('1');
				if(data.length == 0) {
					checks[0] = false;
					timer.push('1');
				}
			}).fail(function() {
				checks[0] = false;
				timer.push('1');
			})
			
			$.ajax({
				url: "/wp-json/wp/v2/press_release?per_page=3&page=" + (parseInt(targetNum)) + cat + date,
			}).done(function( data ) {
				checks[1] = true;
				timer.push('1');
				if(data.length == 0) {
					checks[1] = false;
					timer.push('1');
				}
			}).fail(function() {
				checks[1] = false;
				timer.push('1');
			})
			
			$.ajax({
				url: "/wp-json/wp/v2/press_release?per_page=3&page=" + (parseInt(targetNum) + 1) + cat + date,
			}).done(function( data ) {
				checks[2] = true;
				timer.push('1');
				if(data.length == 0) {
					checks[2] = false;
					timer.push('1');
				}
			}).fail(function() {
				checks[2] = false;
				timer.push('1');
			})
			
			document.querySelector('.post-nav').style.opacity = "0";

			var sorter = setInterval(function() {
				console.log(timer);
				if(timer.length > 2) {
					console.log(checks);
					clearInterval(sorter);
					document.querySelectorAll('.nav-num')[2].style.display = "block";
					document.querySelectorAll('.nav-num')[1].style.display = "block";
					document.querySelectorAll('.nav-num')[0].style.display = "block";
					
					if(checks[0] == false && checks[1] == true && checks[2] == true) {
						console.log('state 1');
						document.querySelectorAll('.nav-num')[0].innerHTML = parseInt(targetNum);
						document.querySelectorAll('.nav-num')[1].innerHTML = (parseInt(targetNum) + 1);
						document.querySelectorAll('.nav-num')[2].innerHTML = (parseInt(targetNum) + 2);
						document.querySelectorAll('.nav-num')[0].classList.add('active-nav');
						document.querySelectorAll('.nav-num')[1].classList.remove('active-nav');
						document.querySelectorAll('.nav-num')[2].classList.remove('active-nav');
						
						if(targetNum == 1) {
							$.ajax({
								url: "/wp-json/wp/v2/press_release?per_page=3&page=" + (parseInt(targetNum) + 2) + cat + date,
							}).done(function( data ) {
								if(data.length == 0) {
									document.querySelectorAll('.nav-num')[2].innerHTML = "";
									document.querySelectorAll('.nav-num')[2].style.display = "none";
								}
							}).fail(function() {
								document.querySelectorAll('.nav-num')[2].innerHTML = "";
								document.querySelectorAll('.nav-num')[2].style.display = "none";
							})
						}
						document.querySelector('.post-nav').classList.remove('disabled');
					} else if(checks[0] == true && checks[1] == true && checks[2] == false) {
						console.log('state 2');
						document.querySelectorAll('.nav-num')[0].innerHTML = (parseInt(targetNum) - 2);
						document.querySelectorAll('.nav-num')[1].innerHTML = (parseInt(targetNum) - 1);
						document.querySelectorAll('.nav-num')[2].innerHTML = (parseInt(targetNum));
						document.querySelectorAll('.nav-num')[0].classList.remove('active-nav');
						document.querySelectorAll('.nav-num')[1].classList.remove('active-nav');
						document.querySelectorAll('.nav-num')[2].classList.add('active-nav');
						if(targetNum == 2) {
							$.ajax({
								url: "/wp-json/wp/v2/press_release?per_page=3&page=" + (parseInt(targetNum) + 2) + cat + date,
							}).done(function( data ) {
								if(data.length == 0) {
									document.querySelectorAll('.nav-num')[0].innerHTML = (parseInt(targetNum) - 1);
									document.querySelectorAll('.nav-num')[1].innerHTML = (parseInt(targetNum));
									document.querySelectorAll('.nav-num')[2].innerHTML = ""
									document.querySelectorAll('.nav-num')[0].classList.remove('active-nav');
									document.querySelectorAll('.nav-num')[1].classList.add('active-nav');
									document.querySelectorAll('.nav-num')[2].classList.remove('active-nav');
									document.querySelectorAll('.nav-num')[2].style.display = "none";
								}
							}).fail(function() {
								document.querySelectorAll('.nav-num')[0].innerHTML = (parseInt(targetNum) - 1);
								document.querySelectorAll('.nav-num')[1].innerHTML = (parseInt(targetNum));
								document.querySelectorAll('.nav-num')[2].innerHTML = ""
								document.querySelectorAll('.nav-num')[0].classList.remove('active-nav');
								document.querySelectorAll('.nav-num')[1].classList.add('active-nav');
								document.querySelectorAll('.nav-num')[2].classList.remove('active-nav');
								document.querySelectorAll('.nav-num')[2].style.display = "none";
							})
						}
						document.querySelector('.post-nav').classList.remove('disabled');
					} else if(checks[0] == false && checks[1] == false && checks[2] == false) {
						console.log('state 3');
						document.querySelectorAll('.nav-num')[0].innerHTML = "";
						document.querySelectorAll('.nav-num')[1].innerHTML = "";
						document.querySelectorAll('.nav-num')[2].innerHTML = "";
						document.querySelectorAll('.nav-num')[0].classList.remove('active-nav');
						document.querySelectorAll('.nav-num')[1].classList.remove('active-nav');
						document.querySelectorAll('.nav-num')[2].classList.remove('active-nav');
					} else if(checks[0] == false && checks[1] == true && checks[2] == false) {
						console.log('state 4');
						document.querySelectorAll('.nav-num')[0].innerHTML = "";
						document.querySelectorAll('.nav-num')[1].innerHTML = "";
						document.querySelectorAll('.nav-num')[2].innerHTML = "";
						document.querySelectorAll('.nav-num')[0].classList.remove('active-nav');
						document.querySelectorAll('.nav-num')[1].classList.remove('active-nav');
						document.querySelectorAll('.nav-num')[2].classList.remove('active-nav');
					} else {
						console.log('state 5');
						document.querySelectorAll('.nav-num')[0].innerHTML = (parseInt(targetNum) - 1);
						document.querySelectorAll('.nav-num')[1].innerHTML = (parseInt(targetNum));
						document.querySelectorAll('.nav-num')[2].innerHTML = (parseInt(targetNum) + 1);
						document.querySelectorAll('.nav-num')[0].classList.remove('active-nav');
						document.querySelectorAll('.nav-num')[1].classList.add('active-nav');
						document.querySelectorAll('.nav-num')[2].classList.remove('active-nav');
						document.querySelector('.post-nav').classList.remove('disabled');
					}	
				}
				document.querySelector('.post-nav').style.opacity = "1";
			}, 500);
		}
		
		function setNavNums(targetNum) {
			var checks = [false, false, false];
			var timer = []
			
			$.ajax({
				url: "/wp-json/wp/v2/postS?per_page=4&page=" + (parseInt(targetNum) - 1) + "",
			}).done(function( data ) {
				checks[0] = true;
				timer.push('1');
			}).fail(function() {
				checks[0] = false;
				timer.push('1');
			})
			
			$.ajax({
				url: "/wp-json/wp/v2/postS?per_page=4&page=" + (parseInt(targetNum)) + "",
			}).done(function( data ) {
				checks[1] = true;
				timer.push('1');
			}).fail(function() {
				checks[1] = false;
				timer.push('1');
			})
			
			$.ajax({
				url: "/wp-json/wp/v2/postS?per_page=4&page=" + (parseInt(targetNum) + 1) + "",
			}).done(function( data ) {
				checks[2] = true;
				timer.push('1');
			}).fail(function() {
				checks[2] = false;
				timer.push('1');
			})

			var sorter = setInterval(function() {
				if(timer.length > 2) {
					//console.log(checks);
					clearInterval(sorter);

					if(checks[0] == false) {
						document.querySelectorAll('.nav-num')[0].innerHTML = parseInt(targetNum);
						document.querySelectorAll('.nav-num')[1].innerHTML = (parseInt(targetNum) + 1);
						document.querySelectorAll('.nav-num')[2].innerHTML = (parseInt(targetNum) + 2);
						document.querySelectorAll('.nav-num')[0].classList.add('active-nav');
						document.querySelectorAll('.nav-num')[1].classList.remove('active-nav');
						document.querySelectorAll('.nav-num')[2].classList.remove('active-nav');
					} else if(checks[2] == false) {
						document.querySelectorAll('.nav-num')[0].innerHTML = (parseInt(targetNum) - 2);
						document.querySelectorAll('.nav-num')[1].innerHTML = (parseInt(targetNum) - 1);
						document.querySelectorAll('.nav-num')[2].innerHTML = (parseInt(targetNum));
						document.querySelectorAll('.nav-num')[2].classList.add('active-nav');
						document.querySelectorAll('.nav-num')[1].classList.remove('active-nav');
						document.querySelectorAll('.nav-num')[0].classList.remove('active-nav');
					} else {
						document.querySelectorAll('.nav-num')[0].innerHTML = (parseInt(targetNum) - 1);
						document.querySelectorAll('.nav-num')[1].innerHTML = (parseInt(targetNum));
						document.querySelectorAll('.nav-num')[2].innerHTML = (parseInt(targetNum) + 1);
						document.querySelectorAll('.nav-num')[1].classList.add('active-nav');
						document.querySelectorAll('.nav-num')[0].classList.remove('active-nav');
						document.querySelectorAll('.nav-num')[2].classList.remove('active-nav');
					}
				}
			}, 500);
		}
		
		if(document.querySelectorAll('.colorize')[0]) {
			dateF.addEventListener('change', function() {
				page = 1;
				if(catF.value.length > 0) {
					var cat = "&press_release_categories=" + catF.value;
				} else {
					var cat = "";
				}
				
				if(dateF.value.length > 0) {
					var date = "&after=" + dateF.value + "-01-01T01:01:01&before=" + (parseInt(dateF.value)+1) + "-01-01T01:01:01"
				} else {
					var date = "";
				}
				if(page) {
					$.ajax({
						url: "/wp-json/wp/v2/press_release?per_page=3&page=" + (parseInt(page)) + cat + date,
					}).done(function( data ) {
						document.querySelector('.post-nav').classList.add('disabled');
						setNavNums2(page);
						document.querySelector('.press-release-filtered .container .row').style.opacity = 0;
						setTimeout(function() {
							document.querySelector('.press-release-filtered .container .row div').innerHTML = '';
							data.forEach(function(item) {
							document.querySelector('.press-release-filtered .container .row div').innerHTML +=
							`<div class="press-release-item">
							  	<div class="post-date">` + dateConvert(item.date) + `</div>
							  	<h2 class="post-title"><a href="` + item.link + '" />' + item.title.rendered + `</a></h2>
							  	<div class="btn-out"> <a href="` + item.link + `">Read More
								<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8.6 16.9" style="enable-background:new 0 0 8.6 16.9;" xml:space="preserve">
								  <path class="st0" d="M7.3,9.7c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2c-0.7,0-1.3,0.5-1.3,1.2C6.1,9.1,6.6,9.7,7.3,9.7z
						 M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2
						c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M1.3,2.4c0.7,0,1.2-0.5,1.2-1.2C2.5,0.5,1.9,0,1.3,0
						C0.6,0,0,0.5,0,1.2C0,1.9,0.6,2.4,1.3,2.4z M3,12.1c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2
						C3.6,10.9,3,11.4,3,12.1z M0,15.7c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C0.6,14.5,0,15,0,15.7z"></path>
								</svg>
								</a> </div>
							</div>`
							});
							document.querySelector('.press-release-filtered .container .row').style.opacity = 1;
							//document.querySelector('.post-nav').classList.toggle('disabled');
						}, 500)
					});
				}
			});

			if(document.querySelectorAll('.colorize')[1]) {
				catF.addEventListener('change', function() {
					page = 1;
					if(catF.value.length > 0) {
						var cat = "&press_release_categories=" + catF.value;
					} else {
						var cat = "";
					}
					
					if(dateF.value.length > 0) {
						var date = "&after=" + dateF.value + "-01-01T01:01:01&before=" + (parseInt(dateF.value)+1) + "-01-01T01:01:01"
					} else {
						var date = "";
					}
					if(page) {
						$.ajax({
							url: "/wp-json/wp/v2/press_release?per_page=3&page=" + (parseInt(page)) + cat + date,
						}).done(function( data ) {
							document.querySelector('.post-nav').classList.add('disabled');
							setNavNums2(page);
							document.querySelector('.press-release-filtered .container .row').style.opacity = 0;
							setTimeout(function() {
								document.querySelector('.press-release-filtered .container .row div').innerHTML = '';
								data.forEach(function(item) {
								document.querySelector('.press-release-filtered .container .row div').innerHTML +=
								`<div class="press-release-item">
									<div class="post-date">` + dateConvert(item.date) + `</div>
									<h2 class="post-title"><a href="` + item.link + '" />' + item.title.rendered + `</a></h2>
									<div class="btn-out"> <a href="` + item.link + `">Read More
									<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8.6 16.9" style="enable-background:new 0 0 8.6 16.9;" xml:space="preserve">
									  <path class="st0" d="M7.3,9.7c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2c-0.7,0-1.3,0.5-1.3,1.2C6.1,9.1,6.6,9.7,7.3,9.7z
							 M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2
							c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M1.3,2.4c0.7,0,1.2-0.5,1.2-1.2C2.5,0.5,1.9,0,1.3,0
							C0.6,0,0,0.5,0,1.2C0,1.9,0.6,2.4,1.3,2.4z M3,12.1c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2
							C3.6,10.9,3,11.4,3,12.1z M0,15.7c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C0.6,14.5,0,15,0,15.7z"></path>
									</svg>
									</a> </div>
								</div>`
								});
								document.querySelector('.press-release-filtered .container .row').style.opacity = 1;
								//document.querySelector('.post-nav').classList.toggle('disabled');
							}, 500)
						});
					}
				});
			}
		}
		
		if(document.querySelector('.press-release-item')) {
			document.querySelector('.post-nav .next').addEventListener('click', function() {
				if(catF.value.length > 0) {
					var cat = "&press_release_categories=" + catF.value;
				} else {
					var cat = "";
				}
				
				if(dateF.value.length > 0) {
					var date = "&after=" + dateF.value + "-01-01T01:01:01&before=" + (parseInt(dateF.value)+1) + "-01-01T01:01:01"
				} else {
					var date = "";
				}
				if(page) {
					$.ajax({
						url: "/wp-json/wp/v2/press_release?per_page=3&page=" + (parseInt(page)+1) + cat + date,
					}).done(function( data ) {
						page++;
						document.querySelector('.post-nav').classList.add('disabled');
						setNavNums2(page);
						document.querySelector('.press-release-filtered .container .row').style.opacity = 0;
						setTimeout(function() {
							document.querySelector('.press-release-filtered .container .row div').innerHTML = '';
							data.forEach(function(item) {
							document.querySelector('.press-release-filtered .container .row div').innerHTML +=
							`<div class="press-release-item">
							  	<div class="post-date">` + dateConvert(item.date) + `</div>
							  	<h2 class="post-title"><a href="` + item.link + '" />' + item.title.rendered + `</a></h2>
							  	<div class="btn-out"> <a href="` + item.link + `">Read More
								<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8.6 16.9" style="enable-background:new 0 0 8.6 16.9;" xml:space="preserve">
								  <path class="st0" d="M7.3,9.7c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2c-0.7,0-1.3,0.5-1.3,1.2C6.1,9.1,6.6,9.7,7.3,9.7z
						 M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2
						c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M1.3,2.4c0.7,0,1.2-0.5,1.2-1.2C2.5,0.5,1.9,0,1.3,0
						C0.6,0,0,0.5,0,1.2C0,1.9,0.6,2.4,1.3,2.4z M3,12.1c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2
						C3.6,10.9,3,11.4,3,12.1z M0,15.7c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C0.6,14.5,0,15,0,15.7z"></path>
								</svg>
								</a> </div>
							</div>`
							});
							document.querySelector('.press-release-filtered .container .row').style.opacity = 1;
							//document.querySelector('.post-nav').classList.toggle('disabled');
						}, 500)
					});
				}
			});

			document.querySelector('.post-nav .prev').addEventListener('click', function() {
				if(catF.value.length > 0) {
					var cat = "&press_release_categories=" + catF.value;
				} else {
					var cat = "";
				}
				
				if(dateF.value.length > 0) {
					var date = "&after=" + dateF.value + "-01-01T01:01:01&before=" + (parseInt(dateF.value)+1) + "-01-01T01:01:01"
				} else {
					var date = "";
				}
				if(page > 1) {
					$.ajax({
						url: "/wp-json/wp/v2/press_release?per_page=3&page=" + (parseInt(page)-1) + cat + date,
					}).done(function( data ) {
						page--;
						document.querySelector('.post-nav').classList.add('disabled');
						setNavNums2(page);
						document.querySelector('.press-release-filtered .container .row').style.opacity = 0;
						setTimeout(function() {
							document.querySelector('.press-release-filtered .container .row div').innerHTML = '';
							data.forEach(function(item) {
							document.querySelector('.press-release-filtered .container .row div').innerHTML +=
							`<div class="press-release-item">
							  	<div class="post-date">` + dateConvert(item.date) + `</div>
							  	<h2 class="post-title"><a href="` + item.link + '" />' + item.title.rendered + `</a></h2>
							  	<div class="btn-out"> <a href="` + item.link + `">Read More
								<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8.6 16.9" style="enable-background:new 0 0 8.6 16.9;" xml:space="preserve">
								  <path class="st0" d="M7.3,9.7c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2c-0.7,0-1.3,0.5-1.3,1.2C6.1,9.1,6.6,9.7,7.3,9.7z
						 M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2
						c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M1.3,2.4c0.7,0,1.2-0.5,1.2-1.2C2.5,0.5,1.9,0,1.3,0
						C0.6,0,0,0.5,0,1.2C0,1.9,0.6,2.4,1.3,2.4z M3,12.1c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2
						C3.6,10.9,3,11.4,3,12.1z M0,15.7c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C0.6,14.5,0,15,0,15.7z"></path>
								</svg>
								</a> </div>
							</div>`
							});
							document.querySelector('.press-release-filtered .container .row').style.opacity = 1;
							//document.querySelector('.post-nav').classList.toggle('disabled');
						}, 500)
					});
				}
			});
			
			document.querySelectorAll('.post-nav .nav-num').forEach(function(num) {
				num.addEventListener('click', function(e) {
					changePage2(num.innerHTML);
					setNavNums2(num.innerHTML);
				});
			});
		} else {
			document.querySelector('.post-nav .next').addEventListener('click', function() {
				if(page) {
					$.ajax({
						url: "/wp-json/wp/v2/postS?per_page=4&page=" + (parseInt(page)+1) + "",
					}).done(function( data ) {
						page++;
						setNavNums(page);
						document.querySelector('.post-nav').classList.toggle('disabled');
						document.querySelector('.post-band .container .row').style.opacity = 0;
						setTimeout(function() {
							document.querySelector('.post-band .container .post-list .row').innerHTML = '';
							data.forEach(function(item) {
							document.querySelector('.post-band .container .post-list .row').innerHTML +=
							`<div class="col-sm-6">
								<div class="post-content-wrap">
									<div class="post-date">` + dateConvert2(item.date) + `</div>
									<h2 class="post-title"><a href="` + item.link + '" />' + item.title.rendered + `</a></h2>
									<div class="post-excerpt">` + item.excerpt.rendered + `</div>
									<ul class="post-tags">
										` + parseTags(item.tags, tags) + `              
									</ul>
									<div class="btn-out"> 
										<a href="` + item.link + `">Read More
											<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8.6 16.9" style="enable-background:new 0 0 8.6 16.9;" xml:space="preserve">
												<path class="st0" d="M7.3,9.7c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2c-0.7,0-1.3,0.5-1.3,1.2C6.1,9.1,6.6,9.7,7.3,9.7z
										M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2
										c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M1.3,2.4c0.7,0,1.2-0.5,1.2-1.2C2.5,0.5,1.9,0,1.3,0
										C0.6,0,0,0.5,0,1.2C0,1.9,0.6,2.4,1.3,2.4z M3,12.1c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2
										C3.6,10.9,3,11.4,3,12.1z M0,15.7c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C0.6,14.5,0,15,0,15.7z"></path>
											</svg>
										</a> 
									</div>
								</div>
							</div>`
							});
							document.querySelector('.post-band .container .row').style.opacity = 1;
							document.querySelector('.post-nav').classList.toggle('disabled');
						}, 500)
					});
				}
			});
			
			document.querySelector('.post-nav .prev').addEventListener('click', function() {
				if(page) {
					$.ajax({
						url: "/wp-json/wp/v2/postS?per_page=4&page=" + (parseInt(page)-1) + "",
					}).done(function( data ) {
						page--;
						setNavNums(page);
						document.querySelector('.post-nav').classList.toggle('disabled');
						document.querySelector('.post-band .container .row').style.opacity = 0;
						setTimeout(function() {
							document.querySelector('.post-band .container .post-list .row').innerHTML = '';
							data.forEach(function(item) {
							document.querySelector('.post-band .container .post-list .row').innerHTML +=
							`<div class="col-sm-6">
								<div class="post-content-wrap">
									<div class="post-date">` + dateConvert2(item.date) + `</div>
									<h2 class="post-title"><a href="` + item.link + '" />' + item.title.rendered + `</a></h2>
									<div class="post-excerpt">` + item.excerpt.rendered + `</div>
									<ul class="post-tags">
										` + parseTags(item.tags, tags) + `              
									</ul>
									<div class="btn-out"> 
										<a href="` + item.link + `">Read More
											<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8.6 16.9" style="enable-background:new 0 0 8.6 16.9;" xml:space="preserve">
												<path class="st0" d="M7.3,9.7c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2c-0.7,0-1.3,0.5-1.3,1.2C6.1,9.1,6.6,9.7,7.3,9.7z
										M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M4.3,6.1c0.7,0,1.2-0.5,1.2-1.2
										c0-0.7-0.6-1.2-1.2-1.2C3.6,3.6,3,4.2,3,4.8C3,5.5,3.6,6.1,4.3,6.1z M1.3,2.4c0.7,0,1.2-0.5,1.2-1.2C2.5,0.5,1.9,0,1.3,0
										C0.6,0,0,0.5,0,1.2C0,1.9,0.6,2.4,1.3,2.4z M3,12.1c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2
										C3.6,10.9,3,11.4,3,12.1z M0,15.7c0,0.7,0.6,1.2,1.3,1.2c0.7,0,1.2-0.5,1.2-1.2c0-0.7-0.6-1.2-1.2-1.2C0.6,14.5,0,15,0,15.7z"></path>
											</svg>
										</a> 
									</div>
								</div>
							</div>`
							});
							document.querySelector('.post-band .container .row').style.opacity = 1;
							document.querySelector('.post-nav').classList.toggle('disabled');
						}, 500)
					});
				}
			});

			document.querySelectorAll('.post-nav .nav-num').forEach(function(num) {
				num.addEventListener('click', function(e) {
					changePage(num.innerHTML);
					setNavNums(num.innerHTML);
				});
			});
		}
	}
});

/************************* Recent Press Release fixes - Jason 01/2022 ***************************/