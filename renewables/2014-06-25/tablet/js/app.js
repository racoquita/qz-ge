var App = function() {
	var that = this;
	var currentSlide = 1;
	var dir = 'next';
	var slideCount = $('.slides li.slide').length;
	var slides = [
		'<div class="slide inactive one"> \
			<img class="text show" src="images/slide-1-text.png"/> \
			<a href="http://qz.com/224275/this-technology-generates-wind-energy-for-indias-least-windy-places/" target="_blank" class="bulletin b-one" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="images/bulletin.png"/> \
			</a> \
		</div>',
		'<div class="slide inactive two"> \
			<img class="text" src="images/slide-2-text.png"/> \
			<a href="http://qz.com/217810/indias-most-promising-energy-source-is-free-and-found-nearly-everywhere/" target="_blank" class="bulletin b-two" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="images/bulletin.png"/> \
			</a> \
		</div>',
		'<div class="slide inactive three"> \
			<img class="text down" src="images/slide-3-text.png"/> \
			<a href="https://qz.typeform.com/to/jLb73e" target="_blank" class="final" data-ix-category="external" data-ix-label="frame 3 - click here clicked"> \
				<img class="click-here" src="images/click-here.png"/> \
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
				that.change(currentSlide + 1);
			}
		});

		$('.dot').swipe({
			tap: function(e, target) {
				if(!$(target).hasClass('active')) that.change($(target).data('num'));
				QZIX.manualTrigger('internal', 'click', 'tapped on dot ' + $(target).data('num'), false);
			}
		});

		$('.slide a').swipe({
			tap: function(e, target) {
				QZIX.manualTrigger($(target).data('ix-category'), 'click', $(target).data('ix-label'), false);
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
		that.change(1);
	}
	this.change = function(num) {
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
	}
};