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
			'body': body,
			'icon': '/m-AirTrip/www/img/logo.png',
			'data': data
		});
	};
	//
	$('#notifyMe').on('click', function() {
		
		var $this = $(this),
			title = $this.data('title'),
			body = $this.data('body'),
			data = {'time': 1 * (new Date())},
			nt = null
		;
			
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
			nt.onclick = function(evt){
				console.log(evt, this);
			};
		}

		// At last, if the user has denied notifications, and you
		// want to be respectful there is no need to bother them any more.
	});
})(jQuery);