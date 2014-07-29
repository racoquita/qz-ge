var App = function() {
	var that = this;

	this.on = function() {
		$('li.item').on('click', function(e){
			var number = $(e.currentTarget).data('id');
			
			that.handleIcons(number);

			$('.showcase[data-id="'+ number +'"]').show();
			$('.bg').css({
				'background': 'url(images/bg-blur.png) no-repeat center bottom',
				'background-size': '100% 100%'
			});
			$('.wrapper').hide();
		});
	}
	this.off = function() {
		$('li.item').off();
		$('.wrapper').show();
		$('.showcase').hide();
	}
	this.handleClose = function() {
		$('.panel-icon').empty();
		$('.showcase').hide();
		$('.bg').css({
			'background': 'url(images/bg.png) no-repeat center bottom',
			'background-size': '100% 100%'
		});
		$('.wrapper').show();		
	}
	this.handleIcons = function(num) {
		switch(num) {
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
			case 6:
				that.handleSix();
				break;
		}
	}
	this.handleOne = function() {
		Snap.load("images/extreme-machines.svg", function(svg){
			var em = Snap('.icon-one');
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

			$('.x').on('click', function(){
				that.handleClose();
			});
		});
	}
	this.handleTwo = function() {
		Snap.load("images/super-materials.svg", function(svg){
			var em = Snap('.icon-two');
				em.append(svg);
			var snap = Snap('#super-materials');

			snap.select('.left-wing').addClass('animate');
			snap.select('.right-wing').addClass('animate');

			$('.x').on('click', function(){
				that.handleClose();
			});
		});
	}
	this.handleThree = function() {
		Snap.load("images/industrial-internet.svg", function(svg){
			var em = Snap('.icon-three');
				em.append(svg);
			var snap = Snap('#industrial-internet');
			var lights = $('.lights circle');
			var interval;

			interval = setInterval(function(){
				$.each(lights, function(i, light){
					Math.random() > .5 ? $(light).hide() : $(light).show();
				});
			}, 250);

			$('.x').on('click', function(){
				clearInterval(interval);
				that.handleClose();
			});
		});
	}
	this.handleFour = function() {
		Snap.load("images/mapped-minds.svg", function(svg){
			var em = Snap('.icon-four');
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

			$('.x').on('click', function(){
				that.handleClose();
			});
		});
	}
	this.handleFive = function() {
		Snap.load("images/brilliant-factories.svg", function(svg){
			var em = Snap('.icon-five');
				em.append(svg);
			var snap = Snap('#brilliant-factories');
			var fins = snap.select('.fins');

			fins.addClass('animate');

			$('.x').on('click', function(){
				that.handleClose();
			});
		});
	}
	this.handleSix = function() {
		Snap.load("images/energy-everywhere.svg", function(svg){
			var em = Snap('.icon-six');
				em.append(svg);
			var snap = Snap('#energy-everywhere');
			var bolts = $('.bolts polygon');
			var interval;

			interval = setInterval(function(){
				$.each(bolts, function(i, bolt){
					Math.random() > .5 ? $(bolt).hide() : $(bolt).show();
				});
			}, 250);

			$('.x').on('click', function(){
				clearInterval(interval);
				that.handleClose();
			});
		});
	}
};