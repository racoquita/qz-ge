var QZADPX = function ( options ) {
  var that = this;

  // Handle the options:
  // (1) base
  if ( !options.base ) {
    throw new Error( 'You must pass in a base link' );
  }
  this.base = options.base;

  // (2) el
  if ( options.el && document.getElementById( options.el ) ) {
    this.el = document.getElementById( options.el );
  } else {
    if ( document.getElementById( 'qzad' ) ) {
      this.el = document.getElementById( 'qzad' );
    } else {
      this.el = document.getElementsByTagName( "BODY" )[0];
    }
  }

  // (3) randomness
  if ( !options.randomness ) {
    this.randomness = 10;
  } else if ( options.randomness > 32 ) {
    this.randomness = 32;
  } else {
    this.randomness = options.randomness;
  }

  this.append = function () {
    // Create the url for the 1x1.
    var cacheBuster = '?' + ( Math.random().toString( 36 ).substr( 2, this.randomness ) ); // create the cache busting string.
    var src         = this.base + cacheBuster; // create the url, appending the cacheBuster.
    
    // Create the 1x1.
    var img = document.createElement( "IMG" );
        img.style.position = "absolute";
        img.style.width = "1px";
        img.style.height = "1px";
        img.style.top = 0;
        img.style.left = 0;
        img.src = src;

    // Append it.
    this.el.appendChild( img );
  };

};

var trackers = [
	'http://bit.ly/1qwQx3n',
	'http://bit.ly/1rEdFKg',
	'http://bit.ly/1k8t0Da',
	'http://bit.ly/1mwM20r',
	'http://bit.ly/1rwdiEb',
	'http://bit.ly/1rwdiUC',
	'http://bit.ly/1qXPo0t',
	'http://bit.ly/1wRjapl'
];

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
	this.swap = function(action, dontTrack) {
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

		if (!dontTrack) {			
			var base = trackers[startItem - 1];
			if (base) {
				var px = new QZADPX( { "base": base } );
				px.append();				
			}
		}
	}
};

$(document).ready(function(){
	layout();
});
