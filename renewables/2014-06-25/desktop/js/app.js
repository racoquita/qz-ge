var App = function() {
	var that = this;
	var currentSlide = 1;
	var dir = 'next';
	var slideCount = $('.slides li.slide').length;
	var slides = [
		'<div class="slide inactive"> \
			<img class="text show" src="http://ads.quartz.cc/sponsors/ge/renewables/2014-06-25/desktop/images/slide-1-text.png"/> \
			<a href="http://bit.ly/1qHq40n" target="_blank" class="bulletin b-one" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="http://ads.quartz.cc/sponsors/ge/renewables/2014-06-25/desktop/images/bulletin.png"/> \
			</a> \
		</div>',
		'<div class="slide inactive"> \
			<img class="text" src="http://ads.quartz.cc/sponsors/ge/renewables/2014-06-25/desktop/images/slide-2-text.png"/> \
			<a href="http://bit.ly/1nc8a0N" target="_blank" class="bulletin b-two" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="http://ads.quartz.cc/sponsors/ge/renewables/2014-06-25/desktop/images/bulletin.png"/> \
			</a> \
		</div>',
		'<div class="slide inactive"> \
			<img class="text down" src="http://ads.quartz.cc/sponsors/ge/renewables/2014-06-25/desktop/images/slide-3-text.png"/> \
			<a href="http://bit.ly/1jx3BwL" target="_blank" class="final" data-ix-category="external" data-ix-label="frame 3 - click here clicked"> \
				<img class="click-here" src="http://ads.quartz.cc/sponsors/ge/renewables/2014-06-25/desktop/images/click-here.png"/> \
			</a> \
		</div>'];

	this.on = function() {
		$('.next-slide').click(function() {
			that.change(currentSlide + 1);
		});

		$('.prev-slide').click(function() {
			that.change(currentSlide - 1);
		});

		$('.dot').on('click', function(e) {
			if(!$(e.currentTarget).hasClass('active')) that.change($(e.currentTarget).data('num'));
			QZIX.manualTrigger('internal', 'click', 'tapped on dot ' + $(e.currentTarget).data('num'), false);
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

		$('.slide a').off().on('click', function(e){
			QZIX.manualTrigger($(e.currentTarget).data('ix-category'), 'click', $(e.currentTarget).data('ix-label'), false);
		});
	}
};
