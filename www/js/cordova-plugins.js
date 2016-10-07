/**
 * cordova-plugin-battery-status
 */
(function($){
	xwf.call(function(_fcID){
		// batterystatus
		window.addEventListener("batterystatus", function (status) {
		    // Feedback (return)
			xwf.fbak(_fcID, 'batterystatus', status);
		}, false);
		// .end
		
		// batterylow
		window.addEventListener("batterylow", function (status) {
			alert("Battery Level Low " + status.level + "%");
		    // Feedback (return)
			xwf.fbak(_fcID, 'batterylow', status);
		}, false);
		// .end
	
		// batterycritical
		window.addEventListener("batterycritical", function (status) {
		    alert("Battery Level Critical " + status.level + "%\nRecharge Soon!");
		    // Feedback (return)
			xwf.fbak(_fcID, 'batterycritical', status);
		}, false);
		// .end
	}, function(_fcID, evtName, status){
		console.log(evtName + "Level: " + status.level + "%, isPlugged: " + status.isPlugged);
	});
})(jQuery);

/**
 * cordova-plugin-camera
 */
(function($){
	// 
	$cameraImgHolder = $('#camera-img-holder');
	// 
	$('button.btn-camera').on('click', function(evt){
		//
		var $this = $(this), 
			isPhotolibrary = $this.is('#btn-photolibrary'),
			isCamera = $this.is('#btn-camera'),
			isSavedPhotolibrary = $this.is('#btn-savedphotolibrary')
		;
		// Context changed to parent page inside this function
		xwf.call(function(camOpts, _fcID){
			var cameraOptions = {
				'quality' : 50,
				'destinationType' : Camera.DestinationType.DATA_URL,
				'sourceType' : camOpts.isPhotolibrary
					? Camera.PictureSourceType.PHOTOLIBRARY
					: (camOpts.isCamera
						? Camera.PictureSourceType.CAMERA
						: Camera.PictureSourceType.SAVEDPHOTOALBUM
					)
				,
				'allowEdit' : true,
				'encodingType' : Camera.EncodingType.PNG,
				'targetWidth' : screen.width,
				'targetHeight' : screen.height,
				'mediaType' : Camera.MediaType.PICTURE,
				'correctOrientation' : true,
				'popoverOptions' : null,
				'cameraDirection' : Camera.Direction.BACK
			};
			//console.log('camOpts: ', camOpts, 'cameraOptions: ', cameraOptions);
			// start audio capture
			navigator.camera.getPicture(function(file) {
				// Feedback (return)
				xwf.fbak(_fcID, null, file); 
			}, function(error) {
			    // Feedback (return)
				xwf.fbak(_fcID, error, null);
			}, cameraOptions);
		    
		}, function(_fcID, error, file){
			// capture error callback
			if (error) {
				alert('[camera] Error: ' + error + '.');
			// capture callback
			} else if (file) {
				$cameraImgHolder.html('<img src="data:image/png;base64,' + file + '" />');
				setTimeout(function(){
					$cameraImgHolder.empty();
				}, 3000);
			}
			// Self destruct
			xwf.uncall(_fcID);
		}, [{
			'isPhotolibrary' : isPhotolibrary, 
			'isCamera' : isCamera, 
			'isSavedPhotolibrary' : isSavedPhotolibrary
		}]);
		// .end
	});
})(jQuery);