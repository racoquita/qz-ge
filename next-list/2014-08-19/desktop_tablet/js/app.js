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

var trackers = {
	'extreme-machines':'http://bit.ly/1lj8omO',
	'super-materials':'http://bit.ly/1oVr0hE',
	'industrial-internet':'http://bit.ly/1oVr80m',
	'mapped-minds':'http://bit.ly/UQ6uCC',
	'brilliant-factories':'http://bit.ly/1qPyGVp',
	'energy-everywhere':'http://bit.ly/UQ6ClM'
};

var App = function() {
	var that = this;
	var timer;

    this.hasTouch = 'ontouchstart' in document;

	this.on = function() {
        that.handleOne('#extreme-machines', true);
		that.handleOne('#extreme-machines-2', false);
        that.handleTwo('#super-materials', true);
		that.handleTwo('#super-materials-2', false);
        that.handleThree('#industrial-internet', true);
		that.handleThree('#industrial-internet-2', false);
        that.handleFour('#mapped-minds', true);
		that.handleFour('#mapped-minds-2', false);
        that.handleFive('#brilliant-factories', true);
		that.handleFive('#brilliant-factories-2', false);
        that.handleSix('#energy-everywhere', true);
		that.handleSix('#energy-everywhere-2', false);


		$('li.item').hammer().bind('tap', function(){
			console.log('tapped');
		});

		// $('li.item').on(this.hasTouch ? 'touchend' : 'click', function(e){
  //           $('.wrapper .container, .clouds, .items-container').addClass('blur');

  //           var id = $(this).data('id');
  //           $('.overlay .content').removeClass('active');
  //           $('.wrapper').addClass('active');
  //           $('.overlay').addClass('active').find('.' + id).addClass('active');
		// });

        $('.wrapper .overlay .close').on(this.hasTouch ? 'touchend' : 'click', function(e){
            e.stopPropagation();
            $('.overlay, .wrapper').removeClass('active');
            $('.wrapper .container, .clouds, .items-container').removeClass('blur');
            return false;
        });

		$('.wrapper').on(this.hasTouch ? 'touchend' : 'click', function(){
			window.open('http://qz.com/bulletins/ge/', '_blank');
			QZIX.manualTrigger('external', 'click', 'clicked on map', false);
		});
	}
	this.off = function() {
		$('li.item').removeClass('active');
		$('li.item, .wrapper, .wrapper .overlay .close').off();
		clearInterval(timer);
	}
	this.handleOne = function(id, onHover) {
		var snap = Snap(id);

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

        if(onHover) {
    		$('.extreme-machines').parent('.item').on('mouseenter', function(e){
    			animate1();
    			animate2();
    			animate3();
    		}).on('mouseleave', function(e){
    			l1.stop();
    			l2.stop();
    			l3.stop();
    		});
        } else {
            animate1();
            animate2();
            animate3();
        }
	}
	this.handleTwo = function(id, onHover) {
		var snap = Snap(id);

        if(onHover) {
    		$('.super-materials').parent('.item').on('mouseenter', function(e){
    			snap.select('.left-wing').addClass('animate');
    			snap.select('.right-wing').addClass('animate');
    		}).on('mouseleave', function(e){
    			snap.select('.left-wing').removeClass('animate');
    			snap.select('.right-wing').removeClass('animate');
    		});
        } else {
            snap.select('.left-wing').addClass('animate');
            snap.select('.right-wing').addClass('animate');
        }
	}
	this.handleThree = function(id, onHover) {
		var snap = Snap(id);
		var lights = $('.lights circle');
		var interval;

        if(onHover) {
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
        } else {
            interval = setInterval(function(){
                $.each(lights, function(i, light){
                    Math.random() > .5 ? $(light).hide() : $(light).show();
                });
            }, 250);
        }
	}
	this.handleFour = function(id, onHover) {
		var snap = Snap(id);
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

        if(onHover) {
    		$('.mapped-minds').parent('.item').on('mouseenter', function(e){
    			animateNodes();
    		}).on('mouseleave', function(e){
    			node1.stop().attr({ cx: 17.5, cy: 22.8 });
    			node2.stop().attr({ cx: 26.6, cy: 22 });
    			node3.stop().attr({ cx: 26.6, cy: 36.2 });
    			node4.stop().attr({ cx: 26.6, cy: 22 });
    		});
        } else {
            animateNodes();
        }
	}
	this.handleFive = function(id, onHover) {
		var snap = Snap(id);
		var fins = snap.select('.fins');

        if(onHover) {
    		$('.brilliant-factories').parent('.item').on('mouseenter', function(e){
    			fins.addClass('animate');
    		}).on('mouseleave', function(e){
    			fins.removeClass('animate');
    		});
        } else {
            fins.addClass('animate');
        }
	}
	this.handleSix = function(id, onHover) {
		var snap = Snap(id);
		var bolts = $('.bolts polygon');
		var interval;

        if(onHover) {
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
        } else {
            interval = setInterval(function(){
                $.each(bolts, function(i, bolt){
                    Math.random() > .5 ? $(bolt).hide() : $(bolt).show();
                });
            }, 250);
        }
	}
	this.track = function(id) {
		var base = trackers[id];
		if (base) {
			var px = new QZADPX({"base": base});
			px.append();
		}
	}
};