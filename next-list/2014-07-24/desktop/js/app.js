var App = function() {
	var that = this;

	this.on = function() {
		$('li.item').on('mouseenter', function(e){
			$(e.currentTarget).addClass('active');
		}).on('mouseleave', function(e){
			$(e.currentTarget).removeClass('active');
		});
	}
	this.off = function() {

	}
};