var App = function() {
	var that = this;
	var currentSlide = 1;
	var dir = 'next';
	var slideCount = $('.slides li.slide').length;
	var slides = [
		'<div class="slide inactive one"> \
			<img class="text show" src="http://ads.quartz.cc/sponsors/ge/renewables/2014-06-25/mobile/images/slide-1-text.png"/> \
			<span href="http://bit.ly/1oh6Bzd" target="_blank" class="bulletin b-one" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="http://ads.quartz.cc/sponsors/ge/renewables/2014-06-25/mobile/images/bulletin.png"/> \
			</span> \
		</div>',
		'<div class="slide inactive two"> \
			<img class="text" src="http://ads.quartz.cc/sponsors/ge/renewables/2014-06-25/mobile/images/slide-2-text.png"/> \
			<span href="http://bit.ly/1ihQhkN" target="_blank" class="bulletin b-two" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="http://ads.quartz.cc/sponsors/ge/renewables/2014-06-25/mobile/images/bulletin.png"/> \
			</span> \
		</div>',
		'<div class="slide inactive three"> \
			<img class="text down" src="http://ads.quartz.cc/sponsors/ge/renewables/2014-06-25/mobile/images/slide-3-text.png"/> \
			<span href="http://bit.ly/1kLxp8t" target="_blank" class="final" data-ix-category="external" data-ix-label="frame 3 - click here clicked"> \
				<img class="click-here" src="http://ads.quartz.cc/sponsors/ge/renewables/2014-06-25/mobile/images/click-here.png"/> \
			</span> \
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

		$('.dot').swipe({
			tap: function(e, target) {
				if(!$(target).hasClass('active')) that.change($(target).data('num'));
				QZIX.manualTrigger('internal', 'click', 'tapped on dot ' + $(target).data('num'), false);
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

		$('.slide span').swipe('destroy');
		$('.slide span').swipe({
			tap: function(e, target) {
				QZIX.manualTrigger($(e.currentTarget).data('ix-category'), 'click', $(e.currentTarget).data('ix-label'), false);
				window.open($(e.currentTarget).attr('href'), '_blank');
			}
		});
	}
};
