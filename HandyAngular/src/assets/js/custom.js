"use strict";
var custom_js = {
	init: function () {
		jQuery('.introduce1').on('click', function () {
			jQuery('.introduce').css('display', 'block');
		});
		jQuery('.search-header1').on('click', function () {
			jQuery('.search-header').css('display', 'block');
			jQuery('.header-right').css('display', 'none');
		})
		jQuery('.close-introduce').on('click', function () {
			jQuery('.introduce').css('display', 'none');
		})
		jQuery('.close-search').on('click', function () {
			jQuery('.search-header').css('display', 'none');
			jQuery('.header-right').css('display', 'block');
		})
		jQuery('.lost-password').on('click', function () {
			jQuery('.content-my-account-right').css('display', 'none');
			jQuery('.content-my-account-left').css('display', 'none');
			jQuery('.form-lost-password').css('display', 'block');
		})
		jQuery('.reset-password').on('click', function () {
			jQuery('.content-my-account-right').css('display', 'block');
			jQuery('.content-my-account-left').css('display', 'block');
			jQuery('.form-lost-password').css('display', 'none');
		})
		//click header mobile
		jQuery('.click-mobile').on('click', function () {
			if (jQuery('.click-mobile').hasClass('lnr-menu')) {
				jQuery('.click-mobile').addClass('lnr-cross');
				jQuery('.click-mobile').removeClass('lnr-menu');
				jQuery('.menu-mobile').slideToggle(200, 'linear');

			} else {
				jQuery('.click-mobile').addClass('lnr-menu');
				jQuery('.click-mobile').removeClass('lnr-cross');
				jQuery('.menu-mobile').slideToggle(200, 'linear');
			}
		})
		jQuery('.drop-link').on('click', function (e) {
			jQuery(this).siblings('.drop-menu').slideToggle(200, 'linear');
			jQuery(this).toggleClass('clicked');
			e.stopPropagation();
		});

		// payment
		jQuery('.showpayment').on('click', function (e) {
			jQuery(this).parent().toggleClass('active')
		})


		//select product
		jQuery('.prev').on('click', function (e) {
			e.stopImmediatePropagation();
			var btn_group_parent = $(this).closest('.btn-group');
			var number = 0;
			var show_number = btn_group_parent.find('.show-number');
			var a = show_number.text();
			a = parseInt(a);
			if (a > 1) {
				number = a - 1;
			}
			else {
				number = 1;
			}
			show_number.text(number);

		});

		jQuery('.next').on('click', function (e) {
			e.stopImmediatePropagation();
			var btn_group_parent = $(this).closest('.btn-group');
			var number = 0;
			var show_number = btn_group_parent.find('.show-number');
			var a = show_number.text();
			a = parseInt(a);
			if (a > 0) {
				number = a + 1;
			}
			show_number.text(number);
		});


		// share
		jQuery('.share').on('click', function (e) {
			jQuery(this).parent().toggleClass('active')
		})


		// check out page
		jQuery(".woocommerce-form-login").hide();
		jQuery(".showlogin").on('click', function () {
			jQuery(".woocommerce-form-login").slideToggle();
		});

		jQuery(".checkout_coupon").hide();
		jQuery(".showcoupon").on('click', function () {
			jQuery(".checkout_coupon").slideToggle();
		});

	},

	generateCarousel: function () {
		if (jQuery().owlCarousel) {
			jQuery('.owl-carousel').owlCarousel({
				loop      : true,
				margin    : 10,
				nav       : false,
				responsive: {
					0   : {
						items: 1
					},
					600 : {
						items: 3
					},
					1000: {
						items: 5
					}
				}
			})
		}
	},

	singleSlider    : function () {
		if (jQuery().flexslider) {
			jQuery('#carousel').flexslider({
				animation    : "slide",
				controlNav   : false,
				animationLoop: false,
				slideshow    : false,
				itemWidth    : 120,
				itemMargin   : 20,
				asNavFor     : '#slider',
				directionNav : true,             //Boolean: Create navigation for previous/next navigation? (true/false)
				prevText     : "",           //String: Set the text for the "previous" directionNav item
				nextText     : ""               //String: Set the text for the "next" directionNav item
			});
			jQuery('#slider').flexslider({
				animation    : "slide",
				controlNav   : false,
				animationLoop: false,
				slideshow    : false,
				sync         : "#carousel",
				directionNav : false,             //Boolean: Create navigation for previous/next navigation? (true/false)
				start        : function (slider) {
					jQuery('body').removeClass('loading');
				}
			});
			jQuery('#flex-slider').flexslider({
				animation: "slide",
				controlNav: false,
				animationLoop: false,
				slideshow: false,
				sync: "#flex-carousel"
			});
			jQuery('#flex-carousel').flexslider({
				animation: "slide",
				controlNav: false,
				animationLoop: false,
				slideshow: false,
				itemWidth: 114,
				itemMargin: 20,
				asNavFor: '#flex-slider'
			});
		}
	}
};

$(document).ready(function () {
	custom_js.init();
	custom_js.generateCarousel();
	custom_js.singleSlider();

});


// Set the date we're counting down to
var countDownDate =  new Date(Date.parse(new Date()) + 6 * 24 * 60 * 60 * 1000);

// Update the count down every 1 second
var x = setInterval(function () {

	// Get todays date and time
	var now = new Date().getTime();

	// Find the distance between now and the count down date
	var distance = countDownDate - now;

	// Time calculations for days, hours, minutes and seconds
	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);


	// Display the result in the element with id="demo"


	var dealday = document.getElementById('dealday');
	if (dealday != null) {
		document.getElementById("dealdays").innerHTML = days;
		document.getElementById("dealhours").innerHTML = hours;
		document.getElementById("dealminutes").innerHTML = minutes;
		document.getElementById("dealseconds").innerHTML = seconds;
		// If the count down is finished, write some text
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("dealday").innerHTML = "EXPIRED";
		}
	}
}, 1000);