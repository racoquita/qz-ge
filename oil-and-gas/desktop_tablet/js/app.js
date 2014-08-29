var App = function() {
	var that = this;

	var discoverCTAs  	= $('.discoverCta')
	,	tiers			= $('.tier')
	,	closers			= $('.close')
	,	vidContainer  	= $('#vid-container')
	,	tier2VideoCTA 	= $('#video-cta')
	,	videoCloser   	= $('.video-close');

	var getPlayer = function() {
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
	};

	this.templateLoadedHandler = function (experienceID) {
		that.player = brightcove.api.getExperience(experienceID);
		that.APIModules = brightcove.api.modules.APIModules;
	};

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
	};

	var discoverCTAHandler = function (e) {
		var targetTier = $(this).data('target-tier');
		tiers.removeClass('show');
		$(targetTier).addClass('show');
	};

	var closeHandler = function (e) {
		$(this).parent().removeClass('show').addClass('hide');
	};

	var showVideo = function () {
		vidContainer.show();
		videoCloser.show();
		vidContainer.html(
			'<div class="vid">'+ getPlayer() +'</div>'
		);
		brightcove.createExperiences();		
	};

	var hideVideo = function () {
		vidContainer.html('');
		vidContainer.hide();
		videoCloser.hide();

	};

	this.on = function() {
		videoCloser.on('click', hideVideo);
		discoverCTAs.on('click', discoverCTAHandler);
		closers.on('click', closeHandler);
		tier2VideoCTA.on('click', showVideo);
	};

	this.off = function() {
		videoCloser.off('click', hideVideo);
		discoverCTAs.off('click', discoverCTAHandler);
		closers.off('click', closeHandler);
		tier2VideoCTA.off('click', showVideo);
		hideVideo();
	};
};