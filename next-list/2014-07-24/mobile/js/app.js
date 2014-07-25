var App = function() {
	var that = this;
	var distance = [0, 183, 278, 393, 505, 585];
	var counter = 0;
	var func = [
		function() {
			$('.show').removeClass('show');
			$('.zero').addClass('show');
		},
		function() {
			$('.show').removeClass('show');
			$('.one').addClass('show');
		},
		function() {
			$('.show').removeClass('show');
			$('.two').addClass('show');
		},
		function() {
			$('.show').removeClass('show');
			$('.three').addClass('show');
		},
		function() {
			$('.show').removeClass('show');
			$('.four').addClass('show');
		},
		function() {
			$('.show').removeClass('show');
			$('.five').addClass('show');
		}
	]

	this.on = function() {
		$('.content').swipe({
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
          		if(direction == 'left' && counter < 5) counter++;
				if(direction == 'right' && counter > 0) counter--;

				that.move();
	        }
		});
	}
	this.off = function() {

	}
	this.move = function() {
		$('.content').css('left', -distance[counter]);
		func[counter]();
	}
};