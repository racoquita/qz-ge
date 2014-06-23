var App = function() {
	var that = this;
	var cp = 0;
	var items = $('.items');
	var introTimer;

	var move = function ( direction ) {

		clearTimeout(introTimer);

		if (direction === 'left') {
			cp++;
			if (cp > items.length - 1) {
				cp = items.length - 1;
			}
		}
		else if (direction === 'right') {
			cp--;
			if (cp < 0) {
				cp = 0;
			}
		}

		var ondeck = items.eq(cp+2);
		
		if (ondeck.length > 0 && !ondeck.data('loaded')) {
			ondeck.data('loaded', true);
			ondeck.find('img').attr( 'src', ondeck.data('lazy-src'));
		}

		items.removeClass('back');
		items.removeClass('left');
		items.removeClass('right');
		items.removeClass('active');
		items.eq(cp).addClass('active');

		if (cp === 0 ) {
			lp = false;
			$('.left-arrow').addClass('hide');
		}
		else {
			items.eq(cp-1).addClass('left');
			$('.left-arrow').removeClass('hide');
		}

		if (cp === items.length - 1) {
			$('.right-arrow').addClass('hide');
		}
		else {
			items.eq(cp+1).addClass('right');
			$('.right-arrow').removeClass('hide'); 
		}

		items.each(function () {
			if (!$(this).hasClass('active') && !$(this).hasClass('left') && !$(this).hasClass('right')) {
				$(this).addClass('back');
			}
		});
	};

	this.bindSwipe = function() {
		$('li').swipe({
			swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
				if(direction == 'left') move('left');
				if(direction == 'right') move('right');

				QZIX.manualTrigger('internal', 'swipe', 'panel swiped', false);
			}
		});

		$('.blur').swipe({
		 	tap:function(e, target) {
		 		QZIX.manualTrigger('external', 'click', 'final cta clicked', false);
		 		window.open($(target).data('href'), "_blank");
		 	}
		});
	}

	this.on = function() {
		that.bindSwipe();

		$('.left-arrow').on('click', function (e) {
			move('right');

			QZIX.manualTrigger('internal', 'click', 'panel clicked', false);
		});
		$('.right-arrow').on('click', function (e) {
			move('left');

			QZIX.manualTrigger('internal', 'click', 'panel clicked', false);
		});
		introTimer = setTimeout(function () {
			move('left')
		}, 2000);
	}
	this.off = function() {
		$('#next').off();
		$('#prev').off();
		 clearTimeout(introTimer);

		$('#1').removeClass().addClass('items active');
		$('#2').removeClass().addClass('items right');
		$('#3, #4, #5, #6, #7, #8').removeClass().addClass('items back');
		$('.left-arrow').off().addClass('hide');
		$('.right-arrow').off().removeClass('hide');

		cp = 0;
	}
};