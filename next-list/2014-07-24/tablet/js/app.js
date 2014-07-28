var App = function() {
	var that = this;

	this.on = function() {
		$('li.item').on('click', function(e){
			$('.showcase[data-id="'+ $(e.currentTarget).data('id') +'"]').show();
			$('.bg').css({
				'background': 'url(../images/bg-blur.png) no-repeat center bottom',
				'background-size': '100% 100%'
			});
			$('.wrapper').hide();
		});

		$('.x').on('click', function(){
			$('.showcase').hide();
			$('.bg').css({
				'background': 'url(../images/bg.png) no-repeat center bottom',
				'background-size': '100% 100%'
			});
		});
	}
	this.off = function() {
		$('li.item').off();
		$('.wrapper').show();
		$('.showcase').hide();
	}
};