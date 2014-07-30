var App = function() {
	var that = this;
	var distance = [0, 183, 278, 393, 505, 585];
	var counter = 0;
	var interval;
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
          		if(direction == 'left' && counter < 5) {
          			counter++;
          			that.move();
          		}
				if(direction == 'right' && counter > 0) {
					counter--;
	        		that.move();
	        	}
	        }
		});

		$('.arrow-left').on('click', function(){
			counter--;
			that.move();
		});

		$('.arrow-right').on('click', function(){
			counter++;
			that.move();
		});

		$('.logo').on('click', function(e){
			window.open($(e.currentTarget).data('href'), '_blank');
		});
	}
	this.off = function() {
		$('.content').swipe('destroy');
		$('.arrow-left').off();
		$('.arrow-right').off();
		$('.logo').off();
	}
	this.move = function() {
		$('.content').css('left', -distance[counter]);
		func[counter]();

		if(counter == 0) {
			$('.arrow-left').hide();
		} else if(counter == 5) {
			$('.arrow-right').hide();
		} else {
			$('.arrow').show();
		}

		that.handleIcons();
	}
	this.handleIcons = function() {
		clearInterval(interval);
		
		switch(counter) {
			case 0:
				break;
			case 1:
				that.handleOne();
				break;
			case 2:
				that.handleTwo();
				break;
			case 3:
				that.handleThree();
				break;
			case 4:
				that.handleFour();
				break;
			case 5:
				that.handleFive();
				break;
		}

		setTimeout(function(){
			$.each($('.frame:not(.show)'), function(i, frame){
				$(frame).find('.icon-container').empty();
			});
		}, 600);
	}
	this.handleOne = function() {
		Snap.load("images/extreme-machines.svg", function(svg){
			var em = Snap('.extreme-machines');
				em.append(svg);
			var snap = Snap('#extreme-machines');

			var l1 = snap.path("M0,59 l20.9-10.3L6.3,46").attr({
				id: "l1",
				fill: "none",
				strokeWidth: "0.8887",
				stroke: "#0AA54A",
				strokeDasharray: "1.7773,1.7773",
				strokeDashOffset: "100"
			});

			var l2 = snap.path("M32.5,0.1 L40.3,22l4.4-14.2").attr({
				id: "l2",
				fill: "none",
				strokeWidth: "0.8887",
				stroke: "#0AA54A",
				strokeDasharray: "1.7773,1.7773",
				strokeDashOffset: "100"
			});

			var l3 = snap.path("M85,67.4 l-22.1-7.2l8.5,12.1").attr({
				id: "l3",
				fill: "none",
				strokeWidth: "0.8887",
				stroke: "#0AA54A",
				strokeDasharray: "1.7773,1.7773",
				strokeDashOffset: "100"
			});

			var len1 = l1.getTotalLength();
			var len2 = l2.getTotalLength();
			var len3 = l3.getTotalLength();

			var animate1 = function() {
				l1.attr({
					"stroke-dasharray": len1/18 + " " + len1/18,
					"stroke-dashoffset": "100"
				}).stop().animate({
					"stroke-dashoffset": 5
				}, 5000, animate1);
			}

			var animate2 = function() {
				l2.attr({
					"stroke-dasharray": len2/18 + " " + len2/18,
					"stroke-dashoffset": "100"
				}).stop().animate({
					"stroke-dashoffset": 5
				}, 5000, animate2);
			}

			var animate3 = function() {
				l3.attr({
					"stroke-dasharray": len3/18 + " " + len3/18,
					"stroke-dashoffset": "100"
				}).stop().animate({
					"stroke-dashoffset": 5
				}, 5000, animate3);
			}

			animate1();
			animate2();
			animate3();
		});
	}
	this.handleTwo = function() {
		Snap.load("images/super-materials.svg", function(svg){
			var em = Snap('.super-materials');
				em.append(svg);
			var snap = Snap('#super-materials');

			snap.select('.left-wing').addClass('animate');
			snap.select('.right-wing').addClass('animate');
		});
	}
	this.handleThree = function() {
		Snap.load("images/industrial-internet.svg", function(svg){
			var em = Snap('.industrial-internet');
				em.append(svg);
			var snap = Snap('#industrial-internet');
			var lights = $('.lights circle');

			interval = setInterval(function(){
				$.each(lights, function(i, light){
					Math.random() > .5 ? $(light).hide() : $(light).show();
				});
			}, 250);
		});
	}
	this.handleFour = function() {
		Snap.load("images/mapped-minds.svg", function(svg){
			var em = Snap('.mapped-minds');
				em.append(svg);
			var snap = Snap('#mapped-minds');
			var node1 = snap.select('.mind-nodes circle:nth-child(1)');
			var node2 = snap.select('.mind-nodes circle:nth-child(2)');
			var node3 = snap.select('.mind-nodes circle:nth-child(3)');
			var node4 = snap.select('.mind-nodes circle:nth-child(4)');

			var animateNodes = function() {
				node1.stop().animate({
					cx: 17.5, cy: 10
				}, 1000, function(){
					animateNodesBack();
				});

				node2.stop().animate({
					cx: 26.6, cy: 5
				}, 1000);

				node3.stop().animate({
					cx: 10, cy: 36.2
				}, 1000);

				node4.stop().animate({
					cx: 60, cy: 18
				}, 1000);
			}

			var animateNodesBack = function() {
				node1.stop().animate({
					cx: 17.5, cy: 35
				}, 1000, function(){
					animateNodes();
				});

				node2.stop().animate({
					cx: 26.6, cy: 45
				}, 1000);

				node3.stop().animate({
					cx: 65, cy: 34
				}, 1000);

				node4.stop().animate({
					cx: 15, cy: 22
				}, 1000);
			}

			animateNodes();
		});
	}
	this.handleFive = function() {
		Snap.load("images/energy-everywhere.svg", function(svg){
			var em = Snap('.energy-everywhere');
				em.append(svg);
			var snap = Snap('#energy-everywhere');
			var bolts = $('.bolts polygon');

			interval = setInterval(function(){
				$.each(bolts, function(i, bolt){
					Math.random() > .5 ? $(bolt).hide() : $(bolt).show();
				});
			}, 250);
		});
	}
};