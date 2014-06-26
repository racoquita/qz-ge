var App = function() {
	var that = this;
	var swap;
	var items = [];
	var currentSlide = 1;
	var slideCount = $('.slides li.slide').length;
	var currentMinutes = 482;
	var deleteTypewriterTimer, typewriterTimer;

	this.on = function() {	

		// Swap images function
		swap = function swap(action) {
			// Moving slide backwards
			if(action == 'prev' && currentSlide != 1) {
				$('.next-pos').removeClass('next-pos').addClass('off-pos');
				$('.current-pos').removeClass('current-pos').addClass('next-pos');
				$('.prev-pos').removeClass('prev-pos').addClass('current-pos');
				$('#'+(currentSlide-2)+'').removeClass('off-pos').addClass('prev-pos');
				currentSlide--;
			}

			// Moving slide forward
			if(action == 'next' && currentSlide != slideCount) {
				$('.prev-pos').removeClass('prev-pos').addClass('off-pos');
				$('.current-pos').removeClass('current-pos').addClass('prev-pos');
				$('.next-pos').removeClass('next-pos').addClass('current-pos');
				$('#'+(currentSlide+2)+'').removeClass('off-pos').addClass('next-pos');
				currentSlide++;
			}

			// Animate icons each time
			//$('.slide .icon, .slide .icon img').removeClass('delay').removeClass('animated').removeClass('bounceIn');
			//$('.current-pos .icon, .current-pos .icon img').addClass('delay').addClass('animated').addClass('bounceIn');

			// Fade in elements each time
			//$('.slide .fade-in').removeClass('fade-in-now');
			//$('.current-pos .fade-in').addClass('fade-in-now');

			// Adjust navigation arrows
			if (currentSlide == slideCount) {
				$('#prev').removeClass('hide');
				$('#next').addClass('hide');
			} else {
				$('#prev').addClass('hide');
				$('#next').removeClass('hide');
			}

			// Adjust navigation dots (TEMP)
			$('.dot').removeClass('active');
			$('.slide-'+currentSlide+'-dot').addClass('active');
		}

		// Next button click function
		$('.next-slide').click(function() {
			swap('next');
		});

		// Prev button click function
		$('.prev-slide').click(function() {
			swap('prev');
		});

		// Swipe events

		$('.wrapper').swipe({
			swipe: function(e, direction, distance, duration, fingerCount) {
				if(direction == 'left') swap('next');
				if(direction == 'right') swap('prev');

				QZIX.manualTrigger('internal', 'swipe', 'panel swiped', false);
			}
		});

		$('li.slide-2 span').swipe({
			tap: function(e, target) {
				window.open('https://qz.typeform.com/to/jLb73e', '_blank');

				QZIX.manualTrigger('external', 'click', 'final cta clicked', false);
			}
		});

	}
	this.off = function() {
		currentSlide = 1;
		swap('prev');
	}
};