var App = function() {
	var that = this;
	var swap;

	this.on = function() {

		var slider = new Slider();

		$('.next-slide').click(function() {
			slider.change('next');
		});

		$('.prev-slide').click(function() {
			slider.change('prev');
		});

	}
	this.off = function() {
		var currentSlide = 1;
		swap('prev');
	}
};

var Slider = function() {
	var currentSlide = 1;
	var slideCount = $('.slides li.slide').length;
	var slides = [
		'<div class="slide inactive"> \
			<img class="text show" src="images/slide-1-text.png"/> \
			<a href="http://www.ge.com/" target="_blank" class="bulletin ixtrack" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="images/bulletin.png"/> \
			</a> \
		</div>',
		'<div class="slide inactive"> \
			<img class="text" src="images/slide-2-text.png"/> \
			<a href="http://www.ge.com/" target="_blank" class="bulletin ixtrack" data-ix-category="external" data-ix-label="read bulletin now clicked"> \
				<img src="images/bulletin.png"/> \
			</a> \
		</div>',
		'<div class="slide inactive"> \
			<img class="text down" src="images/slide-3-text.png"/> \
			<a href="https://qz.typeform.com/to/jLb73e" target="_blank" class="ixtrack" data-ix-category="external" data-ix-label="frame 3 - click here clicked"> \
				<img class="click-here" src="images/click-here.png"/> \
			</a> \
		</div>'];

	this.change = function(dir) {
		if(dir == 'next') {
			if(currentSlide == slides.length) return;

			$('#slides').append(slides[currentSlide]);
			$('.slide.inactive').removeClass('inactive').addClass('right');
			$('.slide.active').removeClass('active').addClass('left');
			
			setTimeout(function(){
				$('.slide.right').removeClass('right').addClass('active');
			}, 100);
			setTimeout(function(){
				$('.slide.left').remove();
			}, 500);

			currentSlide++;
		}
		if(dir == 'prev') {
			if(currentSlide == 1) return;

			currentSlide--;

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
	}
};