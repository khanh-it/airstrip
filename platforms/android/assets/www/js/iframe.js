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
	$btnBgallery = $('#btn-bgallery').on('click', function(evt){
		// Context changed to parent page inside this function
		xwf.call(function(_fcID){
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
		});
		// .end
	});
})(jQuery);