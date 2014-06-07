function layout() {
	var wrapperWidth = $('#qzad').width();
	var carouselOffset = Math.round((wrapperWidth/2) - 360);
	$('.carousel').css('padding-left', carouselOffset);
}

var App = function() {
	var that = this;
	var items = [];
	var startItem = 1;
	var position = 0;
	var itemCount = $('.carousel li.items').length;
	var leftpos = itemCount;
	var resetCount = itemCount;
	var autoAdvance;

	(function($) {
		$.fn.swipeEvents = function() {
			return this.each(function() {

				var startX, startY, $this = $(this);

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
				}

				function touchend(event) {
					$this.unbind('touchmove', touchmove);
					event.preventDefault();
				}
			});
		};
	})(jQuery);

	this.on = function() {
		$(window).on('resize', function(){
			layout();
		});

		autoAdvance = setTimeout(that.swap, 2500);

		$('#next').click(function() {
			that.swap('clockwise');
		});

		$('#prev').click(function() {
			that.swap('counter-clockwise');
		});

		$('li').click(function() {
			if($(this).attr('class') == 'items left-pos') {
				that.swap('counter-clockwise');
			} else {
				that.swap('clockwise');
			}

			QZIX.manualTrigger('internal', 'click', 'panel clicked', false);
		});
	}
	this.off = function() {
		$('#next').off();
		$('#prev').off();
		$('li').off();

		$('#1').removeClass().addClass('items main-pos');
		$('#2').removeClass().addClass('items right-pos');
		$('#3, #4, #5, #6, #7, #8').removeClass().addClass('items back-pos');
		$('#prev').addClass('hide');

		startItem = 1;
		position = 0;
	}
	this.swap = function(action) {
		var direction = action;

		if(direction == 'counter-clockwise') {
			var leftitem = $('.left-pos').attr('id') - 1;

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
			if(startItem == 1){
				$('#prev').addClass('hide');
			}
			if(startItem < itemCount) {
				$('#next').removeClass('hide');
			}
		}

		if(direction == 'clockwise' || direction == '' || direction == null ) {
			clearTimeout(autoAdvance);
			function pos(positionvalue) {
				if(positionvalue != 'leftposition') {
					position++;
				}

				if(positionvalue == 'leftposition') {
					position = startItem - 1;

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
				position = 0;

			}
			if(startItem > 1){
				$('#prev').removeClass('hide');
			}
			if(startItem >= itemCount) {
				$('#next').addClass('hide');
			}
		}
	}
};

$(document).ready(function(){
	layout();
});
