var App = function() {
	var that = this;
	var vidContainer;
	this.on = function() {
		that.init()
		$('.tooltip .discoverCta').on('click', function (e) {
			var target = $(this).attr('href');

			$('.tier').removeClass('show').addClass('hide');
			$(target).addClass('show');
			if(target == '#tier02'){
				$('#tier02 img').on('click', function() {
					that.showVideo()
				})
			}
			e.preventDefault();
		});
		$('.close').on('click', function(e){
			$(this).parent().removeClass('show').addClass('hide');
			console.log($(this))
			e.preventDefault();
		})
	}
	this.init = function() {
		// body...
		vidContainer = $('#vid-container');
	}
	this.showVideo = function() {
		vidContainer.show();
		vidContainer.html(that.getPlayer());
		brightcove.createExperiences();
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
		player = brightcove.api.getExperience(experienceID);
		APIModules = brightcove.api.modules.APIModules;
	}

	this.templateReadyHandler = function (event) {
		videoPlayer = player.getModule(APIModules.VIDEO_PLAYER);
	    contentModule = player.getModule(APIModules.CONTENT);

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
	this.off = function() {

	}
};