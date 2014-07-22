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
	'http://bit.ly/1k8uy05',
	'http://bit.ly/1wRpJIG',
	'http://bit.ly/1u8oys0',
	'http://bit.ly/1p2BZSo',
	'http://bit.ly/1rjUoyG',
	'http://bit.ly/1jRUxsd',
	'http://bit.ly/1p7Y5pa',
	'http://bit.ly/1rwfV8K'
];

var App = function() {
	var that = this;
	var cp = 0;
	var items = $('.items');
	var introTimer;

	var move = function ( direction, dontTrack ) {

		clearTimeout(introTimer);

		if (direction === 'left') {
			cp++;
			if (cp > items.length - 1) {
				cp = items.length - 1;
			}
		}
		else if (direction === 'right') {
			cp--;
			if (cp < 0) {
				cp = 0;
			}
		}

		var ondeck = items.eq(cp+2);
		
		if (ondeck.length > 0 && !ondeck.data('loaded')) {
			ondeck.data('loaded', true);
			ondeck.find('img').attr( 'src', ondeck.data('lazy-src'));
		}

		items.removeClass('back');
		items.removeClass('left');
		items.removeClass('right');
		items.removeClass('active');
		items.eq(cp).addClass('active');

		if (cp === 0 ) {
			lp = false;
			$('.left-arrow').addClass('hide');
		}
		else {
			items.eq(cp-1).addClass('left');
			$('.left-arrow').removeClass('hide');
		}

		if (cp === items.length - 1) {
			$('.right-arrow').addClass('hide');
		}
		else {
			items.eq(cp+1).addClass('right');
			$('.right-arrow').removeClass('hide'); 
		}

		items.each(function () {
			if (!$(this).hasClass('active') && !$(this).hasClass('left') && !$(this).hasClass('right')) {
				$(this).addClass('back');
			}
		});

		if (!dontTrack) {			
			var base = trackers[cp];
			if (base) {
				var px = new QZADPX( { "base": base } );
				px.append();				
			}
		}
	};

	this.bindSwipe = function() {
		$('li').swipe({
			swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
				if(direction == 'left') move('left');
				if(direction == 'right') move('right');

				QZIX.manualTrigger('internal', 'swipe', 'panel swiped', false);
			}
		});

		$('#8 .blur').swipe({
		 	tap:function(e, target) {
		 		QZIX.manualTrigger('external', 'click', 'final cta clicked', false);
		 		window.open($(target).data('href'), "_blank");
		 	}
		});
	}

	this.on = function() {
		that.bindSwipe();

		$('.left-arrow').on('click', function (e) {
			move('right');

			QZIX.manualTrigger('internal', 'click', 'panel clicked', false);
		});
		$('.right-arrow').on('click', function (e) {
			move('left');

			QZIX.manualTrigger('internal', 'click', 'panel clicked', false);
		});
		introTimer = setTimeout(function () {
			move('left')
		}, 2000);
	}
	this.off = function() {
		$('#next').off();
		$('#prev').off();
		 clearTimeout(introTimer);

		$('#1').removeClass().addClass('items active');
		$('#2').removeClass().addClass('items right');
		$('#3, #4, #5, #6, #7, #8').removeClass().addClass('items back');
		$('.left-arrow').off().addClass('hide');
		$('.right-arrow').off().removeClass('hide');

		cp = 0;
	}
};