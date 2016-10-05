(function($){
	
	$btnBgallery = $('#btn-bgallery');
	
	$btnBgallery.on('click', function(evt){
		//
		//
		console.time('benchmark_XCalls');
		xwfCall(
			// Function call
			// Context changed to parent page inside this function
			function(_fcID){
				//
				navigator.camera.getPicture(
					function(){
						console.log('camera success');
						xwfFBak(_fcID, arguments);
					},
					function(){
						console.log('camera failed');
						xwfFBak(_fcID, arguments);
					}
				);
			},
			// Callback 
			function(result){
				console.timeEnd('benchmark_XCalls');
				console.log('get camera data: ', result);
			},
			// Params
			[]
		);
		// .end
	});
	
	
	/* media-capture */
	// Context changed to parent page inside this function
	/*xwfCall(function(){
		// capture callback
		var captureSuccess = function(mediaFiles) {
		    var i, path, len;
		    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
		        path = mediaFiles[i].fullPath;
		        // do something interesting with the file
		    }
		};
		
		// capture error callback
		var captureError = function(error) {
		    navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
		};
		
		document.addEventListener("deviceready", function() {
		    if (navigator.device.capture) {
				// start audio capture
				navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1});		    	
		    }
		}, false);
	});*/
	// .end
	
})(jQuery);