var QZADPX = function ( options ) {
	var that = this;

	if(!options.base) throw new Error('You must pass in a base link');
	
	this.base = options.base;

	if(options.el && document.getElementById(options.el)) {
		this.el = document.getElementById(options.el);
	} else {
		if ( document.getElementById('qzad')) {
			this.el = document.getElementById('qzad');
		} else {
			this.el = document.getElementsByTagName("BODY")[0];
		}
	}

	if(!options.randomness) {
		this.randomness = 10;
	} else if(options.randomness > 32) {
		this.randomness = 32;
	} else {
		this.randomness = options.randomness;
	}

	this.append = function () {
		var cacheBuster = '?' + (Math.random().toString( 36 ).substr( 2, this.randomness));
		var src = this.base + cacheBuster;

		var img = document.createElement("IMG");
		img.style.position = "absolute";
		img.style.width = "1px";
		img.style.height = "1px";
		img.style.top = 0;
		img.style.left = 0;
		img.src = src;

		this.el.appendChild(img);
	};
};

var trackers = [
	'http://bit.ly/XoqRJ2', 
	'http://bit.ly/1sbtjht', 
	'http://bit.ly/1ogABdK', 
	'http://bit.ly/1kq8ttS', 
	'http://bit.ly/1kaVlby'
];

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
				QZIX.manualTrigger('internal', 'swipe', 'swiped', false);

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

		counter = 0;
		that.move();
		clearInterval(interval);
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
		that.track();
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
			if(counter == 0 || counter == 2) {
				if(typeof l1 != 'undefined') {
					l1.stop();
					l2.stop();
					l3.stop();
					$('#l1').remove();
					$('#l2').remove();
					$('#l3').remove();
				}
			}
		}, 600);
	}
	this.handleOne = function() {
		var snap = Snap('#extreme-machines');

		l1 = snap.path("M0,59 l20.9-10.3L6.3,46").attr({
			id: "l1",
			fill: "none",
			strokeWidth: "0.8887",
			stroke: "#0AA54A",
			strokeDasharray: "1.7773,1.7773",
			strokeDashOffset: "100"
		});

		l2 = snap.path("M32.5,0.1 L40.3,22l4.4-14.2").attr({
			id: "l2",
			fill: "none",
			strokeWidth: "0.8887",
			stroke: "#0AA54A",
			strokeDasharray: "1.7773,1.7773",
			strokeDashOffset: "100"
		});

		l3 = snap.path("M85,67.4 l-22.1-7.2l8.5,12.1").attr({
			id: "l3",
			fill: "none",
			strokeWidth: "0.8887",
			stroke: "#0AA54A",
			strokeDasharray: "1.7773,1.7773",
			strokeDashOffset: "100"
		});

		var animate1 = function() {
			var len1 = l1.getTotalLength();

			l1.attr({
				"stroke-dasharray": len1/18 + " " + len1/18,
				"stroke-dashoffset": "100"
			}).stop().animate({
				"stroke-dashoffset": 5
			}, 5000, animate1);
		}

		var animate2 = function() {
			var len2 = l2.getTotalLength();

			l2.attr({
				"stroke-dasharray": len2/18 + " " + len2/18,
				"stroke-dashoffset": "100"
			}).stop().animate({
				"stroke-dashoffset": 5
			}, 5000, animate2);
		}

		var animate3 = function() {
			var len3 = l3.getTotalLength();

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
	}
	this.handleTwo = function() {
		var snap = Snap('#super-materials');

		snap.select('.left-wing').addClass('animate');
		snap.select('.right-wing').addClass('animate');
	}
	this.handleThree = function() {
		var snap = Snap('#industrial-internet');
		var lights = $('.lights circle');

		interval = setInterval(function(){
			$.each(lights, function(i, light){
				Math.random() > .5 ? $(light).hide() : $(light).show();
			});
		}, 250);
	}
	this.handleFour = function() {
		var snap = Snap('#mapped-minds');
		var node1 = snap.select('.mind-nodes circle:nth-child(1)');
		var node2 = snap.select('.mind-nodes circle:nth-child(2)');
		var node3 = snap.select('.mind-nodes circle:nth-child(3)');
		var node4 = snap.select('.mind-nodes circle:nth-child(4)');

		var animateNodes = function() {
			node1.stop().animate({ cx: 17.5, cy: 10 }, 1000, function(){
				animateNodesBack();
			});
			node2.stop().animate({ cx: 26.6, cy: 5 }, 1000);
			node3.stop().animate({ cx: 10, cy: 36.2 }, 1000);
			node4.stop().animate({ cx: 60, cy: 18 }, 1000);
		}

		var animateNodesBack = function() {
			node1.stop().animate({ cx: 17.5, cy: 35 }, 1000, function(){
				animateNodes();
			});
			node2.stop().animate({ cx: 26.6, cy: 45 }, 1000);
			node3.stop().animate({ cx: 65, cy: 34 }, 1000);
			node4.stop().animate({ cx: 15, cy: 22 }, 1000);
		}

		animateNodes();
	}
	this.handleFive = function() {
		var snap = Snap('#energy-everywhere');
		var bolts = $('.bolts polygon');

		interval = setInterval(function(){
			$.each(bolts, function(i, bolt){
				Math.random() > .5 ? $(bolt).hide() : $(bolt).show();
			});
		}, 250);
	}
	this.track = function() {
		var base = trackers[counter - 1];
		if (base) {
			var px = new QZADPX({"base": base});
			px.append();				
		}
	}
};