/**
 * 
 * 
 */
(function(_win){
	return;
	//
	//
	_win.postMessageCB = _win.postMessageCB || function postMessageCB(message, origin, callback) {
		// Has callback?
		if ('function' == (typeof callback)) {
			// +++ 
			
			// +++
			//var timer = function 
			// +++ Event handler
			var onMessageCallback = function(evt) {
				// 
				
				
				// Self destruct
				(_win.removeEventListener || _win.detachEvent)('message', onMessageCallback, false);
			};
			// +++ 
			(_win.addEventListener || _win.attachEvent)('message', onMessageCallback, false);	
		}
		// 
		return _win.postMessage(message, origin);
	};
})(window);

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
    
    /**
     * Exe func
     */
    Function.exe = Function.exe || function exeFunc(func) {
        if ("function" == (typeof func)) {
            // Generate function name.
            var funcName = '_' + (1 * new Date());
            // Define temp function
            try {
                // Define function
                eval('exeFunc.' + funcName + ' = ' + func.toString() + ';');
                // Execute function
                exeFunc[funcName](_win);
            } catch (e) {
                console.log(e);
            }
            // Delete temp function
            delete exeFunc[funcName];
        }
    };
    
    
    
    
})(window);