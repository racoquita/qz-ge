var App = function() {
	var that = this; // a little of this; a little of that.

  // protected variables
  var cp = 0;
  var items = $('.items');
  var introTimer;

  // the move function does nearly all of the required work.
  var move = function ( direction ) {

    clearTimeout(introTimer);

    // check direction and incriment the cp variable accordingly.
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

    // prep
    items.removeClass('back');
    items.removeClass('left');
    items.removeClass('right');
    items.removeClass('active');


    // deal with the active slide.
    items.eq(cp).addClass('active');

    // check if user is at left bound.
    if (cp === 0 ) {
      lp = false;
      $('.left-arrow').addClass('hide');
    }
    // if they're not, then business as usual.
    else {
      items.eq(cp-1).addClass('left');
      $('.left-arrow').removeClass('hide');
    }

    // check if user is at right bound.
    // if they are, hide the right arrow.
    if (cp === items.length - 1) {
      $('.right-arrow').addClass('hide');
    }
    // if they're not, then business as usual.
    else {
      items.eq(cp+1).addClass('right');
      $('.right-arrow').removeClass('hide'); 
    }

    // deal with the back items
    items.each(function () {
      if (!$(this).hasClass('active') && !$(this).hasClass('left') && !$(this).hasClass('right')) {
        $(this).addClass('back');
      }
    })
  };


  var bindToSwipeEvents = function () {

    var startX
    ,   ul = $('ul.carousel');
    var down = function (e) {
      startX = e.clientX;
      ul.on('vmouseup', up);
    };

    var up = function (e) {
      if (startX - e.clientX > 50) {
        move('left');
      } else if (startX - e.clientX < -50) {
        move('right');
      }
      ul.off('vmouseup', up);
    }
    ul.on('vmousedown', down );
  };


	this.on = function() {
    bindToSwipeEvents();
    $('.left-arrow').on('click', function (e) {
      move('right');
    });
    $('.right-arrow').on('click', function (e) {
      move('left');
    });
    introTimer = setTimeout(function () {
      move('left')
    }, 2000);
	}
	this.off = function() {

	}
};