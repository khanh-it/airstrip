/**
 * Notication
 */
(function($) {
	// Let's check if the browser supports notifications
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
		return;
	}

	/**
	 *
	 */
	function notifyMe(title, body, data) {
		return new Notification(title, {
			'body' : body,
			'icon' : '/m-AirTrip/www/img/logo.png',
			'data' : data
		});
	};
	//
	$('#notifyMe').on('click', function() {

		var $this = $(this),
		    title = $this.data('title'),
		    body = $this.data('body'),
		    data = {
			'time' : 1 * (new Date())
		},
		    nt = null;

		// Let's check whether notification permissions have already been granted
		if (Notification.permission === "granted") {
			// If it's okay let's create a notification
			nt = notifyMe(title, body, data);
		}

		// Otherwise, we need to ask the user for permission
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function(permission) {
				// If the user accepts, let's create a notification
				if (permission === "granted") {
					nt = notifyMe(title, body, data);
				}
			});
		}

		//
		if (nt) {
			nt.onclick = function(evt) {
				console.log(evt, this);
			};
		}

		// At last, if the user has denied notifications, and you
		// want to be respectful there is no need to bother them any more.
	});
})(jQuery);

/**
 * Vibration
 */
(function($) {
	// Let's check if the browser supports vibration?
	if (!("vibrate" in window.navigator)) {
		alert("This browser does not support `vibration`");
		return;
	}

	var vibrateInterval;

	// Starts vibration at passed in level
	function startVibrate(duration) {
		navigator.vibrate(duration);
	}

	// Stops vibration
	function stopVibrate() {
		// Clear interval and stop persistent vibrating
		if (vibrateInterval)
			clearInterval(vibrateInterval);
		navigator.vibrate(0);
	}

	// Start persistent vibration at given duration and interval
	// Assumes a number value is given
	function startPeristentVibrate(duration, interval) {
		vibrateInterval = setInterval(function() {
			startVibrate(duration);
		}, interval);
	}

	//
	$('#vibrateMe').on('click', function() {
		var $this = $(this), 
			duration = parseInt($this.data('duration')) || 200
		;
		// 
		stopVibrate();
		startPeristentVibrate(duration);
		setTimout(function(){
			stopVibrate();
		}, 2000);
	});
})(jQuery);


/**
 * Files 
 */
(function($) {
	window.URL = window.URL || window.webkitURL;

	var fileSelect = document.getElementById("fileSelect"),
	    fileElem = document.getElementById("fileElem"),
	    fileList = document.getElementById("fileList");

	fileSelect.addEventListener("click", function(e) {
		if (fileElem) {
			fileElem.click();
		}
		e.preventDefault();
		// prevent navigation to "#"
	}, false);
	
	fileElem.addEventListener("change", function(e) {
		handleFiles(this.files);
	}, false);

	function handleFiles(files) {
		console.log('files: ', files);
		if (!files.length) {
			fileList.innerHTML = "<p>No files selected!</p>";
		} else {
			fileList.innerHTML = "";
			var list = document.createElement("ul");
			fileList.appendChild(list);
			for (var i = 0; i < files.length; i++) {
				var li = document.createElement("li");
				list.appendChild(li);

				var img = document.createElement("img");
				img.src = window.URL.createObjectURL(files[i]);
				img.height = 60;
				img.onload = function() {
					window.URL.revokeObjectURL(this.src);
				};
				li.appendChild(img);
				var info = document.createElement("span");
				info.innerHTML = files[i].name + ": " + files[i].size + " bytes";
				li.appendChild(info);
			}
		}
	};
})(jQuery);