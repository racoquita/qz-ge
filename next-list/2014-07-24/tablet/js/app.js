var App = function() {
	var that = this;

	this.on = function() {
		$('li.item').on('click', function(e){
			$('.showcase[data-id="'+ $(e.currentTarget).data('id') +'"]').show();
		});

		$('.x').on('click', function(){
			$('.showcase').hide();
		});
	}
	this.off = function() {
		$('li.item').off();
		$('.showcase').hide();
	}
};