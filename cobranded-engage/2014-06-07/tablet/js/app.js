var App = function() {
	var that = this;
	var imgs = $('#slider img');
	var imgsArr = [];
	var timeouts = [];
	
	this.on = function() {
		that.startAd();
	}
	this.off = function() {
		$.each(timeouts, function(i, to){
        	clearTimeout(to);
      	});

		$('#slider img').removeClass('fadeOut');
	}
	this.startAd = function(){
		$(imgs).each(function(index, img) {
			imgsArr[index]=img;
		});

		that.cycleImages();
	}
	this.cycleImages = function() {
		for(var i = 1; i < imgsArr.length; i++) {
			that.fadeImage(i, $(imgsArr[i]));
		}

		timeouts[0] = setTimeout(function(){
			that.resetImages();
		}, 3100 * (imgsArr.length));
	}
	this.fadeImage = function(i, img) {
		timeouts[1] = setTimeout(function(){
			img.addClass('fadeOut');
		}, 1000 * i);
	}
	this.resetImages = function(){
		$('#slider img').removeClass('fadeOut');

		timeouts[2] = setTimeout(function(){
			that.cycleImages();
		}, 3000);
	}


};