// var App = function() {
// 	var that = this;

// 	this.on = function() {

// 	}
// 	this.off = function() {

// 	}
// };

// Global variables
var items = [];
var startItem = 1;
var position = 0;
var itemCount = $('.carousel li.items').length;
var leftpos = itemCount;
var resetCount = itemCount;
var autoAdvance;

function layout() {
	var wrapperWidth = $('.wrapper').width();
	var carouselOffset = Math.round((wrapperWidth/2) - 360);
	$('.carousel').css('padding-left', carouselOffset);
}

$(window).on('resize', function(){
	layout();
});

layout();
autoAdvance = setTimeout(swap, 2500);

// Swap images function
function swap(action) {
	//$('.main-pos').unbind('swipeLeft').unbind('swipeRight');
	var direction = action;

	// Moving carousel backwards
	if(direction == 'counter-clockwise') {
		var leftitem = $('.left-pos').attr('id') - 1;
		// Allows slides to wrap around
		// if(leftitem == 0) {
		//    leftitem = itemCount;
		// }

		if(leftitem >= 0) {
			$('.right-pos').removeClass('right-pos').addClass('back-pos');
			$('.main-pos').removeClass('main-pos').addClass('right-pos');
			$('.left-pos').removeClass('left-pos').addClass('main-pos');
			$('#'+leftitem+'').removeClass('back-pos').addClass('left-pos');

			startItem--;
			if(startItem < 1) {
				startItem = itemCount;
			}
		}
		console.log(startItem);
		if(startItem == 1){
			$('#prev').addClass('hide');
		}
		if(startItem < itemCount) {
			$('#next').removeClass('hide');
		}
	}

	// Moving carousel forward
	if(direction == 'clockwise' || direction == '' || direction == null ) {
		clearTimeout(autoAdvance);
		function pos(positionvalue) {
			if(positionvalue != 'leftposition') {
				// Increment image list id
				position++;

				// If final result is greater than image count, reset position.
				// if((startItem+position) > resetCount) {
				// 	position = 1-startItem;
				// }
			}

			// Setting the left positioned item
			if(positionvalue == 'leftposition') {
				// Left positioned image should always be one left than main positioned image.
				position = startItem - 1;

				// Reset last image in list to left position if first image is in main position
				if(position < 1) {
					position = itemCount;
				}
			}

			return position;
		}

		if (startItem < itemCount){
			$('#'+ startItem +'').removeClass('main-pos').addClass('left-pos');
			$('#'+ (startItem+pos()) +'').removeClass('right-pos').addClass('main-pos');
			$('#'+ (startItem+pos()) +'').removeClass('back-pos').addClass('right-pos');
			$('#'+ pos('leftposition') +'').removeClass('left-pos').addClass('back-pos');

			startItem++;
			position=0;

			// Wraps slides back to start
			// if(startItem > itemCount) {
			// 	startItem = 1;
			// }
		}
		console.log(startItem);
		if(startItem > 1){
			$('#prev').removeClass('hide');
		}
		if(startItem >= itemCount) {
			$('#next').addClass('hide');
		}
	}
	// bindSwipes();
}

// Next button click function
$('#next').click(function() {
	swap('clockwise');
});

// Prev button click function
$('#prev').click(function() {
	swap('counter-clockwise');
});

// If any visible items are clicked
$('li').click(function() {
	if($(this).attr('class') == 'items left-pos') {
		swap('counter-clockwise');
	} else {
		swap('clockwise');
	}
});

// Swipe events
// $(function(){
// 	bindSwipes();
// });

// function bindSwipes() {
// 	$('.main-pos')
// 		.swipeEvents()
// 		.bind("swipeLeft",  function(){ swap('clockwise'); })
// 		.bind("swipeRight", function(){ swap('counter-clockwise'); });
// }

// Capture swipe events
(function($) {
	$.fn.swipeEvents = function() {
		return this.each(function() {

			var startX,
				startY,
				$this = $(this);

			$this.bind('touchstart', touchstart);

			function touchstart(event) {
				var touches = event.originalEvent.touches;
				if (touches && touches.length) {
					startX = touches[0].pageX;
					startY = touches[0].pageY;
					$this.bind('touchmove', touchmove);
					$this.bind('touchend', touchend);
				}
				event.preventDefault();
			}

			function touchmove(event) {
				var touches = event.originalEvent.touches;
				if (touches && touches.length) {
					var deltaX = startX - touches[0].pageX;
					var deltaY = startY - touches[0].pageY;

					if (deltaX >= 50) {
						$this.trigger("swipeLeft");
					}
					if (deltaX <= -50) {
						$this.trigger("swipeRight");
					}
					if (deltaY >= 50) {
						$this.trigger("swipeUp");
					}
					if (deltaY <= -50) {
						$this.trigger("swipeDown");
					}
					if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
						$this.unbind('touchmove', touchmove);
						$this.unbind('touchend', touchend);
					}
				}
				//event.preventDefault();
			}

			function touchend(event) {
				$this.unbind('touchmove', touchmove);
				event.preventDefault();
			}
		});
	};
})(jQuery);