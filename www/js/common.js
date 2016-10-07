/**
 * 
 * 
 */
(function(_win){
    // full-screen available?
    _win.document.fullscreenEnabled = (
        document.fullscreenEnabled || 
    	document.webkitFullscreenEnabled || 
    	document.mozFullScreenEnabled ||
    	document.msFullscreenEnabled
    );
    /**
     * Cross browser dom elemenent request fullscreen
     * @param domEle {Object} DOM element
     * @return void
     */
    _win.document.requestFullscreen = function(domEle) {
        if (domEle.requestFullscreen) {
	       domEle.requestFullscreen();
        } else if (domEle.webkitRequestFullscreen) {
	       domEle.webkitRequestFullscreen();
        } else if (domEle.mozRequestFullScreen) {
	       domEle.mozRequestFullScreen();
        } else if (domEle.msRequestFullscreen) {
	       domEle.msRequestFullscreen();
        }
    };
    // are we full-screen?
    _win.document.fullscreenElement = (
	   document.fullscreenElement ||
	   document.webkitFullscreenElement ||
	   document.mozFullScreenElement ||
	   document.msFullscreenElement
    );
    // console.log(document.requestFullscreen);
})(window);

function notifyMe() {
	var n1 = new Notification('Tiêu đề', {
		//'badge': '',
		'lang': 'vi',
		'body': '<p><span>Nội dung</span></p>',
		//'tag': '',
		'icon': '/m-AirTrip/www/img/logo.png',
		//'data': '',
		//'vibrate': true
	});
};