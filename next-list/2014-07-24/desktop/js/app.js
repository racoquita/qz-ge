var App = function() {
	var that = this;
	var timer;

	this.on = function() {
		that.loadSvgs();

		$('li.item').on('mouseenter', function(e){
			clearInterval(timer);
			$('li.item').removeClass('active');
			$(e.currentTarget).addClass('active');
		}).on('mouseleave', function(e){
			$('li.item').removeClass('active');
			that.randomize();
		}).on('click', function(e){
			$(e.currentTarget).addClass('active');
		});

		$('.wrapper').on('click', function(){
			window.open('http://qz.com/bulletins/ge/', '_blank');
		});

		that.randomize();
	}
	this.off = function() {
		$('li.item, .wrapper').off();
		clearInterval(timer);
	}
	this.loadSvgs = function() {
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

			$('.extreme-machines').parent('.item').on('mouseenter', function(e){
				animate1();
				animate2();
				animate3();
			}).on('mouseleave', function(e){
				l1.stop();
				l2.stop();
				l3.stop();
			});
		});

		Snap.load("images/super-materials.svg", function(svg){
			var em = Snap('.super-materials');
				em.append(svg);
			var snap = Snap('#super-materials');

			$('.super-materials').parent('.item').on('mouseenter', function(e){
				snap.select('.left-wing').addClass('animate');
				snap.select('.right-wing').addClass('animate');
			}).on('mouseleave', function(e){
				snap.select('.left-wing').removeClass('animate');
				snap.select('.right-wing').removeClass('animate');
			});
		});

		Snap.load("images/industrial-internet.svg", function(svg){
			var em = Snap('.industrial-internet');
				em.append(svg);
			var snap = Snap('#industrial-internet');
			var lights = $('.lights circle');
			var interval;

			$('.industrial-internet').parent('.item').on('mouseenter', function(e){
				interval = setInterval(function(){
					$.each(lights, function(i, light){
						Math.random() > .5 ? $(light).hide() : $(light).show();
					});
				}, 250);

			}).on('mouseleave', function(e){
				clearInterval(interval);
				lights.show();
			});
		});

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

			$('.mapped-minds').parent('.item').on('mouseenter', function(e){
				animateNodes();
			}).on('mouseleave', function(e){
				node1.stop().attr({
					cx: 17.5, cy: 22.8
				});
				node2.stop().attr({
					cx: 26.6, cy: 22
				});
				node3.stop().attr({
					cx: 26.6, cy: 36.2
				});
				node4.stop().attr({
					cx: 26.6, cy: 22
				});
			});
		});

		Snap.load("images/brilliant-factories.svg", function(svg){
			var em = Snap('.brilliant-factories');
				em.append(svg);
			var snap = Snap('#brilliant-factories');
			var fins = snap.select('.fins');

			$('.brilliant-factories').parent('.item').on('mouseenter', function(e){
				fins.addClass('animate');
			}).on('mouseleave', function(e){
				fins.removeClass('animate');
			});
		});

		Snap.load("images/energy-everywhere.svg", function(svg){
			var em = Snap('.energy-everywhere');
				em.append(svg);
			var snap = Snap('#energy-everywhere');
			var bolts = $('.bolts polygon');
			var interval;

			$('.energy-everywhere').parent('.item').on('mouseenter', function(e){
				interval = setInterval(function(){
					$.each(bolts, function(i, bolt){
						Math.random() > .5 ? $(bolt).hide() : $(bolt).show();
					});
				}, 250);
			}).on('mouseleave', function(e){
				clearInterval(interval);
				bolts.show();
			});
		});
	}
	this.randomize = function() {
		timer = setInterval(function() {
			var num = Math.floor(Math.random() * 6);
			var items = $('.item');

			$('li.item').removeClass('active');
			$(items[num]).trigger('click');
		}, 3000);


	}
};