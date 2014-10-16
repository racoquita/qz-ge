var App = function() {
	var that = this;
	var currentSlide = 0;
	var dir = 'next';
	var current = 0;
	var isAnimating = false;
	var hasTouch = 'ontouchstart' in document;
	var slides = [
		'<div class="f1 frame inactive"> \
			<div class="copy desktop"><img src="images/f1-a_text.png" alt=""></div> \
				<div class="copy tablet"><img src="images/f1_copy_768.png" alt=""></div> \
			<div class="chart"> \
					<img class="f1-chart-a" src="images/f1-a_graph.png" alt=""> \
					<img class="f1-chart-b" src="images/f1-b_graph.png" alt=""> \
					<div class="f1-pagination-container"> \
						<a href="#" data-num="0" class="f1-pag selected"></a> \
						<a href="#" data-num="1" class="f1-pag"></a> \
					</div> \
			</div> \
			<a href="#" class="cta ixtrack" data-ix-category="external" data-ix-label="Read Bulletin" > \
				<img class="desktop" src="images/f1-cta_text.png" alt="Read Bulletin on QZ.com "> \
				<img class="tablet" src="images/f1_cta_text_768.png" alt="Read Bulletin on QZ.com "> \
			</a> \
		</div>',
		'<div class="f2 frame inactive"> \
			<div class="copy desktop"><img src="images/f2_copy.png" alt=""></div> \
			<div class="copy tablet"><img src="images/f2_copy_768.png" alt=""></div> \
			<div class="chart"><img src="images/f2-chart.png" alt=""></div> \
			<a href="#" class="cta ixtrack" data-ix-category="external" data-ix-label="Read Bulletin" ><img src="images/f1-cta_text.png" alt="Read Bulletin on QZ.com "></a> \
		</div>'];
	this.on = function() {
		//that.setEvents();
		hasTouch == true ? that.setTouchEvents() : that.setEvents();
		that.rotatef1Chart();
	}
	this.change = function (num) {
		dir = num > currentSlide ? 'next' : 'prev';
		currentSlide = num;
		$('#slides').append(slides[currentSlide]);

		
		if(dir == 'next') {
			$('.frame.inactive').removeClass('inactive').addClass('right');
			$('.frame.active').removeClass('active').addClass('left');

			setTimeout(function(){
				$('.frame.right').removeClass('right').addClass('active');
			}, 100);
			setTimeout(function(){
				$('.frame.left').remove();
				isAnimating = false;
			}, 500);
			$('.next').addClass('hidden');
			$('.prev').removeClass('hidden');
		}
		if(dir == 'prev') {
			$('.frame.inactive').removeClass('inactive').addClass('left');
			$('.frame.active').removeClass('active').addClass('right');

			setTimeout(function(){
				$('.frame.left').removeClass('left').addClass('active');
			}, 100);
			setTimeout(function(){
				$('.frame.right').remove();
				isAnimating = false;
			}, 500);

			$('.next').removeClass('hidden');
			$('.prev').addClass('hidden');
		}
		$('.f-pag.selected').removeClass('selected');
		$('.f-pag:eq('+ currentSlide +')').addClass('selected');
	}
	this.rotatef1Chart = function () {
		
		interval = setInterval(function(){
			$('.f1 .chart img:eq('+ current +')').velocity('fadeOut', {
				duration: 500,
				complete: function() {
					current == 1 ? current = 0 : current++;
					$('.f1 .chart img:eq('+ current +')').velocity('fadeIn', {
						duration: 500,
						complete: function () {
							$('.f1-pag.selected').removeClass('selected');
							$('.f1-pag:eq('+ current +')').addClass('selected');
						}
					});
				}
			});
		}, 2000);
		
	}
	this.setTouchEvents = function () {
		
		$('#slides').swipe({
			fingers: 'all',
			swipeLeft: that.swipeLeft,
			swipeRight: that.swipeRight,
			allowPageScroll: 'vertical',
			swipeStatus: function(event, phase, direction, distance, duration, fingers) {
				if(direction == 'down' || direction == 'up') return false;
			}
		});
	}
	this.swipeLeft = function() {
		if(currentSlide == 0) that.change(1);
	}
	this.swipeRight = function() {
		if(currentSlide == 1) that.change(0);
		
	}
	this.setEvents = function() {
		$('.next').on('click', function(e) {
			if(!isAnimating) {
				isAnimating = true;
				that.change(1);
			}
			return false;
		});
		$('.prev').on('click', function(e) {
			if(!isAnimating) {
				isAnimating = true;
				that.change(0);
			}
			return false;
		});
		$('.f-pag').on('click', function(e) {
			if(!$(e.currentTarget).hasClass('selected')) that.change($(e.currentTarget).data('num'));
		});
		$('.f1-pag').on('click', function(e) {
			if(!$(e.currentTarget).hasClass('selected')){
				current = 0;
				that.rotatef1Chart();
			} 
		})
		
	}
	this.off = function() {
		dir = 'next';
		$.each(timeouts, function(i, to){
	        clearTimeout(to);
	    });	
	    that.change(0);
	    if(rotate) clearInterval(rotate);
		$('.next').removeClass('hidden');
		$('.prev').addClass('hidden')
	}
};