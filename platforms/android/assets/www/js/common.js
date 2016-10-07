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