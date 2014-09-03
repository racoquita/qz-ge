var App = function() {
	var that = this
	,	current = 0
	,	distance = [0, -231, -460];

	this.on = function() {
		$('#qzad').swipe({
			fingers: 'all',
			swipeLeft: that.swipeLeft,
			swipeRight: that.swipeRight,
			allowPageScroll: 'vertical',
			swipeStatus: function(event, phase, direction, distance, duration, fingers) {
				if(direction == 'down' || direction == 'up') return false;
			}
		});
	}
	this.off = function() {

	}
	this.swipeLeft = function() {
		if(current < 2) {
			current++;
			that.handleChange();
		}
	}
	this.swipeRight = function() {
		if(current > 0) {
			current--;
			that.handleChange();
		}
	}
	this.handleChange = function() {
		$('.tooltips li').removeClass('active');
		$('.tooltips li:eq('+ current +')').addClass('active');
		$('.ground').velocity({ left:distance[current] }, { duration:500 });
		$('.tooltips li:not(.active)').velocity('fadeOut', { duration:500 });
		$('.tooltips li.active').velocity('fadeIn', { duration:500 });
	}
	this.getPlayer = function() {
		return '<object id="player3558926841001" class="BrightcoveExperience">\
			<param name="bgcolor" value="#000000" />\
			<param name="width" value="100%" />\
			<param name="height" value="100%" />\
			<param name="playerID" value="1783580117001" />\
			<param name="playerKey" value="AQ~~,AAABnwxttEE~,HpQpfOmVc2uIuYoJ5Ua7iU_HbguYUAep" />\
			<param name="isVid" value="true" />\
			<param name="isUI" value="true" />\
			<param name="dynamicStreaming" value="true" />\
			<param name="htmlFallback" value="true" />\
			<param name="includeAPI" value="true" />\
			<param name="templateLoadHandler" value="app.templateLoadedHandler" />\
			<param name="templateReadyHandler" value="app.templateReadyHandler" />\
			<param name="wmode" value="transparent" />\
			<param name="@videoPlayer" value="3753129145001" />\
		</object>';
	}

	this.templateLoadedHandler = function (experienceID) {
		that.player = brightcove.api.getExperience(experienceID);
		that.APIModules = brightcove.api.modules.APIModules;
	}

	this.templateReadyHandler = function (event) {
		var videoPlayer = that.player.getModule(that.APIModules.VIDEO_PLAYER);
		var contentModule = that.player.getModule(that.APIModules.CONTENT);

		videoPlayer.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, function() {
			that.hideVideo();
		});

		videoPlayer.getCurrentVideo(function (videoDTO) {
			if(videoDTO) {
				videoDTO.displayName = "";
				contentModule.updateMedia(videoDTO, function (newVideoDTO) {
					videoPlayer.play();
				});
			}
		});
	}
};