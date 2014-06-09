var App = function() {
	this.on = function() {
		this.startAd();
	}
	this.off = function() {
		$('#slider img:eq(1)').removeClass('cycle');
	}
	this.startAd = function(){
		$('#slider img:eq(1)').addClass('cycle');
	}
};