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
	'http://bit.ly/1wRnPYt',
	'http://bit.ly/Un5PIA',
	'http://bit.ly/1rwfviT',
	'http://bit.ly/1pweLpa',
	'http://bit.ly/1n5tB86',
	'http://bit.ly/1nuBmFI',
	'http://bit.ly/1rwfz1X',
	'http://bit.ly/WrGi2H'
];

var App = function() {
	var that = this;
	var items = [];
	var startItem = 1;
	var position = 0;
	var itemCount = $('.carousel li.items').length;
	var leftpos = itemCount;
	var resetCount = itemCount;
	var autoAdvance;
	var isAnimating = false;

	this.on = function() {
		that.layout();

		$(window).on('resize', function(){
			that.layout();
		});

		autoAdvance = setTimeout(that.swap, 3000);

		$('#next').on('click', function() {
			that.swap('clockwise');
		});

		$('#prev').on('click', function() {
			that.swap('counter-clockwise');
		});

		$('li').on('click', function() {
			if($(this).attr('class') == 'items left-pos') {
				that.swap('counter-clockwise');
			} else {
				that.swap('clockwise');
			}

			QZIX.manualTrigger('internal', 'click', 'panel clicked', false);
		});

		that.bindSwipe();
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
	this.layout = function() {
		var wrapperWidth = $('.wrapper').width();
		var carouselOffset = Math.round((wrapperWidth/2) - 360);

		$('.carousel').css('padding-left', carouselOffset);
	}
	this.bindSwipe = function(){
		$('li').swipe({
			swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
				if(direction == 'left') app.swap('clockwise');
				if(direction == 'right') app.swap('counter-clockwise');

				QZIX.manualTrigger('internal', 'swipe', 'panel swiped', false);
			}
		});
	}
	this.swap = function(action, dontTrack) {
		$('.main-pos').unbind('swipeLeft').unbind('swipeRight');
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
				if(positionvalue != 'leftposition') position++;
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
				position=0;
			}

			if(startItem > 1) $('#prev').removeClass('hide');
			if(startItem >= itemCount) $('#next').addClass('hide');
		}

		if (!dontTrack) {			
			var base = trackers[startItem - 1];
			if (base) {
				var px = new QZADPX( { "base": base } );
				px.append();				
			}
		}

		that.bindSwipe();
	}
};