var App = function() {
	var that = this;
	var currentSlide = 0;
	var dir = 'next';

	var isAnimating = false;
	var slides = [
		'<div class="f1 frame inactive"> \
			<div class="copy"><img src="images/f1-a_text.png" alt=""></div> \
			<div class="chart"> \
					<img src="images/f1-a_graph.png" alt=""> \
					<div class="f1-pagination-container"> \
						<a href="#" data-num="0" class="f1-pag selected"></a> \
						<a href="#" data-num="1" class="f1-pag"></a> \
					</div> \
			</div> \
		</div>',
		'<div class="f2 frame inactive"> \
			<div class="copy"><img src="images/f2_copy.png" alt=""></div> \
			<div class="chart"><img src="images/f2-chart.png" alt=""></div> \
			<a href="#" class="cta ixtrack" data-ix-category="external" data-ix-label="Read Bulletin" ><img src="images/f1-cta_text.png" alt="Read Bulletin on QZ.com "></a> \
		</div>'];
	this.on = function() {
		that.setEvents();
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
		}
		$('.f-pag.selected').removeClass('selected');
		$('.f-pag:eq('+ currentSlide +')').addClass('selected');
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
		})
		
	}
	this.off = function() {
		dir = 'next';
	}
};