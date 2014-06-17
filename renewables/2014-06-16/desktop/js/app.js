var App = function() {
	var that = this;

	this.on = function() {

		// Global variables
		var items = [];
		var currentSlide = 1;
		var slideCount = $('.slides li.slide').length;
		var currentMinutes = 482;
		var deleteTypewriterTimer, typewriterTimer;

		// Swap images function
		function swap(action) {
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

	}
	this.off = function() {

	}
};