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
	'http://bit.ly/1mi6xhh',
	'http://bit.ly/Wi7FfS',
	'http://bit.ly/1wwdu3Y'
];

var App = function() {

	var that = this;
	var currentSlide = 1;
	var dir = 'next';
	var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
	var slideCount = $('.slides .slide').length;
	var hasTouch = 'ontouchstart' in document;
	var timeouts=[];
	var currentImg;
	var times = [4000, 4000];
	var ct;
	var isAnimating = false;
	var rotate;
	var imageSets = [
	    function () { 
	      $('.ff-bg .img-1').addClass('fade');
	    },
	    function () {
	        $('.ff-bg .img-2').addClass('fade');
	    }
	];
	var slides = [
		'<div class="slide inactive"> \
			<img class="text show" src="http://ads.qz.com/sponsors/ge/renewables/2014-08-19/desktop_tablet/images/slide-1-text.png"/> \
			<a href="http://bit.ly/1peRpUS" target="_blank" class="bulletin b-one" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="http://ads.qz.com/sponsors/ge/renewables/2014-08-19/desktop_tablet/images/bulletin.png"/> \
			</a> \
		</div>',
		'<div class="slide inactive"> \
			<img class="text" src="http://ads.qz.com/sponsors/ge/renewables/2014-08-19/desktop_tablet/images/slide-2-text.png"/> \
			<a href="http://bit.ly/1qHq40n" target="_blank" class="bulletin b-two" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="http://ads.qz.com/sponsors/ge/renewables/2014-08-19/desktop_tablet/images/bulletin.png"/> \
			</a> \
		</div>',
		'<div class="slide inactive"> \
			<img class="text" src="http://ads.qz.com/sponsors/ge/renewables/2014-08-19/desktop_tablet/images/slide-3-text.png"/> \
			<a href="http://bit.ly/1nc8a0N" target="_blank" class="bulletin b-three" data-ix-category="external" data-ix-label="frame 3 - click here clicked"> \
				<img src="http://ads.qz.com/sponsors/ge/renewables/2014-08-19/desktop_tablet/images/bulletin.png"/> \
			</a> \
		</div>'];

	this.init = function () {
		rotate = setInterval(that.doRotate, 5000);
	}
	this.doRotate = function() {
		$('.ff-bg img').first().velocity('stop');
		$('.ff-bg img').first().velocity('fadeOut', { duration: 1000, complete: function(){
			$('.ff-bg img').first().appendTo($('.ff-bg'));
		}});
		$('.ff-bg img').first().velocity('fadeIn', {duration: 1000});
	}

	this.changeImage = function() {
      
      if($.isFunction(imageSets[currentImg]) && currentImg < 1) {
       
        ct = setTimeout(function() {
          
          imageSets[currentImg]();
          currentImg++;
          that.changeImage();
         
        }, times[currentImg]);
      }else{
        ct = setTimeout(function() {
          currentImg--;
          $('.ff-bg .img-'+currentImg).toggleClass('fade');
         that.changeImage();
         
        }, times[currentImg]);
      }
    };
	this.on = function() {

		if(is_firefox || iOS){
			$('.ff-bg').addClass('show');
			$('.background').hide();
			that.init();
		} else {
			$('.background').removeClass('hide');
		}
		hasTouch == true ? that.setTouchEvents() : that.setEvents();
	}
	this.setEvents = function() {
		$('.next-slide').click(function() {
			if(!isAnimating) {
				isAnimating = true;
				that.change(currentSlide + 1);
			}
		});

		$('.prev-slide').click(function() {
			if(!isAnimating) {
				isAnimating = true;
				that.change(currentSlide - 1);
			}
		});
		$('.dot').on('click', function(e) {
			if(!isAnimating) {
				isAnimating = true;
				if(!$(e.currentTarget).hasClass('active')) that.change($(e.currentTarget).data('num'));
				QZIX.manualTrigger('internal', 'click', 'tapped on dot ' + $(e.currentTarget).data('num'), false);
			}
		});
	}
	this.setTouchEvents = function() {
		$('.next-slide').swipe({
			tap: function(e, target) {
				if(!isAnimating) {
					isAnimating = true;
					that.change(currentSlide + 1);
				}
			}
		});

		$('.prev-slide').swipe({
			tap: function(e, target) {
				if(!isAnimating) {
					isAnimating = true;
					that.change(currentSlide - 1);
				}
			}
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
		$('.dot').on('click', function(e) {
			if(!isAnimating) {
				isAnimating = true;
				if(!$(e.currentTarget).hasClass('active')) that.change($(e.currentTarget).data('num'));
				QZIX.manualTrigger('internal', 'click', 'tapped on dot ' + $(e.currentTarget).data('num'), false);
			}
		});
	}
	this.off = function() {
		if(is_firefox || iOS){
			$.each(timeouts, function(i, to){
	        	clearTimeout(to);
	    	});	
		}

		$('.ff-bg img').velocity('stop');

		if(rotate) clearInterval(rotate);

		$('.next-slide, .prev-slide, .dot').off();
		$('.next-slide').swipe('destroy');
		$('.prev-slide').swipe('destroy');
		$('.slide span').swipe('destroy');
		$('.wrapper').swipe('destroy');
		that.change(1, true);
		dir = 'next';
	}
	this.change = function(num, dontTrack) {
		if (!dontTrack) {
			var base = trackers[num - 1];
			if (base) {
				var px = new QZADPX( { "base": base } );
				px.append();				
			}
		}
		dir = num > currentSlide ? 'next' : 'prev';
		currentSlide = num;

		if(dir == 'next') {
			$('#slides').append(slides[currentSlide - 1]);
			$('.slide.inactive').removeClass('inactive').addClass('right');
			$('.slide.active').removeClass('active').addClass('left');
			
			setTimeout(function(){
				$('.slide.right').removeClass('right').addClass('active');
			}, 100);
			setTimeout(function(){
				$('.slide.left').remove();
				isAnimating = false;
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
				isAnimating = false;
			}, 500);
		}

		$('.dot.active').removeClass('active');
		$('.dot:eq('+ (currentSlide - 1) +')').addClass('active');

		$('.hide').removeClass('hide');
		if(currentSlide == 1) $('#prev').addClass('hide');
		if(currentSlide == slides.length) $('#next').addClass('hide');

		$('.slide a').off().on('click', function(e){
			QZIX.manualTrigger($(e.currentTarget).data('ix-category'), 'click', $(e.currentTarget).data('ix-label'), false);
		});
	}
};
