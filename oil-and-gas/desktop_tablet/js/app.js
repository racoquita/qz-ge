var App = function() {
	var that = this;

	this.on = function() {
		$('.tooltip .discoverCta').on('click', function (e) {
			var target = $(this).attr('href');

			$('.tier').removeClass('show').addClass('hide');
			$(target).addClass('show');
			e.preventDefault();
		});
		$('.close').on('click', function(e){
			$(this).parent().removeClass('show').addClass('hide');
			e.preventDefault();
		})
	}
	this.off = function() {

	}
};