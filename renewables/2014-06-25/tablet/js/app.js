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
	'http://bit.ly/1rhDFxo',
	'http://bit.ly/1rhDIco',
	'http://bit.ly/1oYOotb'
];

var App = function() {
	var that = this;
	var currentSlide = 1;
	var dir = 'next';
	var slideCount = $('.slides li.slide').length;
	var slides = [
		'<div class="slide inactive one"> \
			<img class="text show" src="http://ads.qz.com/sponsors/ge/renewables/2014-06-25/tablet/images/slide-1-text.png"/> \
			<a href="http://bit.ly/1tWqxzE" target="_blank" class="bulletin b-one" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="http://ads.qz.com/sponsors/ge/renewables/2014-06-25/tablet/images/bulletin.png"/> \
			</a> \
		</div>',
		'<div class="slide inactive two"> \
			<img class="text" src="http://ads.qz.com/sponsors/ge/renewables/2014-06-25/tablet/images/slide-2-text.png"/> \
			<a href="http://bit.ly/1mFyQvY" target="_blank" class="bulletin b-two" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="http://ads.qz.com/sponsors/ge/renewables/2014-06-25/tablet/images/bulletin.png"/> \
			</a> \
		</div>',
		'<div class="slide inactive three"> \
			<img class="text" src="http://ads.qz.com/sponsors/ge/renewables/2014-06-25/tablet/images/slide-3-text.png"/> \
			<a href="http://bit.ly/1jx3pgT" target="_blank" class="bulletin b-three" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="http://ads.qz.com/sponsors/ge/renewables/2014-06-25/tablet/images/bulletin.png"/> \
			</a> \
		</div>'];

	this.on = function() {

		$('.next-slide').swipe({
			tap: function(e, target) {
				that.change(currentSlide + 1);
			}
		});

		$('.prev-slide').swipe({
			tap: function(e, target) {
				that.change(currentSlide - 1);
			}
		});

		$('.dot').on('click', function(e){
			if(!$(e.currentTarget).hasClass('active')) that.change($(e.currentTarget).data('num'));
			QZIX.manualTrigger('internal', 'click', 'tapped on dot ' + $(e.currentTarget).data('num'), false);
		});

		$('.slide span').swipe({
			tap: function(e, target) {
				QZIX.manualTrigger($(e.currentTarget).data('ix-category'), 'click', $(e.currentTarget).data('ix-label'), false);
				window.open($(e.currentTarget).attr('href'), '_blank');
			}
		});

		$('.wrapper').swipe({
			swipe: function(e, direction, distance, duration, fingerCount) {
				if(direction == 'left') {
					that.change(currentSlide + 1);
					QZIX.manualTrigger('internal', 'swipe', 'swiped next', false);
				}
				if(direction == 'right') {
					that.change(currentSlide - 1);
					QZIX.manualTrigger('internal', 'swipe', 'swiped previous', false);
				}
			}
		});
	}
	this.off = function() {
		that.change(1, true);

		$('.dot').off();
		$('.next-slide').swipe('destroy');
		$('.prev-slide').swipe('destroy');
		$('.slide span').swipe('destroy');
		$('.wrapper').swipe('destroy');
		
		dir = 'next';
	}
	this.change = function(num, dontTrack) {
    if (num > 0 && num <= 3) {
  		dir = num > currentSlide ? 'next' : 'prev';
  		currentSlide = num;

  		if (!dontTrack) {
  			var base = trackers[num - 1];
  			if (base) {
  				var px = new QZADPX( { "base": base } );
  				px.append();				
  			}
  		}

  		if(dir == 'next') {
  			$('#slides').append(slides[currentSlide - 1]);
  			$('.slide.inactive').removeClass('inactive').addClass('right');
  			$('.slide.active').removeClass('active').addClass('left');
  			
  			setTimeout(function(){
  				$('.slide.right').removeClass('right').addClass('active');
  			}, 100);
  			setTimeout(function(){
  				$('.slide.left').remove();
  			}, 500);
  		}
  		if(dir == 'prev') {
  			$('#slides').append(slides[currentSlide - 1]);
  			$('.slide.inactive').removeClass('inactive').addClass('left');
  			$('.slide.active').removeClass('active').addClass('right');
  			
  			setTimeout(function(){
  				$('.slide.left').removeClass('left').addClass('active');
  			}, 100);
  			setTimeout(function(){
  				$('.slide.right').remove();
  			}, 500);
  		}

  		$('.dot.active').removeClass('active');
  		$('.dot:eq('+ (currentSlide - 1) +')').addClass('active');

  		$('.hide').removeClass('hide');
  		if(currentSlide == 1) $('#prev').addClass('hide');
  		if(currentSlide == slides.length) $('#next').addClass('hide');

  		$('.slide span').swipe('destroy');
  		$('.slide span').swipe({
  			tap: function(e, target) {
  				QZIX.manualTrigger($(e.currentTarget).data('ix-category'), 'click', $(e.currentTarget).data('ix-label'), false);
  				window.open($(e.currentTarget).attr('href'), '_blank');
  			}
  		});
      $('.slide a').off().on('click', function(e){
        QZIX.manualTrigger($(e.currentTarget).data('ix-category'), 'click', $(e.currentTarget).data('ix-label'), false);
      });   
    }
	}
};