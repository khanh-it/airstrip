/**
 * Cross windows calls
 * @author khanhdtp
 *  
 * @param {Object} Current window object
 * @param {Object} Window opener (popup) or window parent (iframe)
 * @return void 
 */
(function(_win, _xWin){
	// @var {String} postMessage origin.
	var PM_ORIGIN = 'http://10.10.8.169';
	// @var {String} postMessage message key.
	var PM_MSG_KEY = '-/-XWF-CALL-/-';
	// @var {Boolean} Is cross windows flag?
	var isXW = (_win !== _xWin);
	// @var {Function} Event handler
	// Handle cross function calls  
	var onMessageEvtHandler = function(evt){
		if (evt.origin != PM_ORIGIN) {
			console && console.log('[xwf-call] Origin does not match.'); 
			return;
		}
		if (('string' == typeof(evt.data))
			&& (0 == evt.data.indexOf(PM_MSG_KEY))
		) {
			// Format function string
			var func = evt.data.replace(PM_MSG_KEY, '');
            // Execute temp function
            eval(func);
		}
		// Self destruct
		(_win.removeEventListener || _win.detachEvent)('message', onMessageEvtHandler, false);
	};
	// Register event handler, handle cross function calls...  
	(_win.addEventListener || _win.attachEvent)('message', onMessageEvtHandler, false);
	
	/**
	 * Convert function to string, and padding params
	 * @return {String}
	 */
	var func2StrPadding = function(func, params) {
		if ('function' == (typeof func)) {
			// Convert function to string
			func = '' + func;
			// Padding params
			params = (params instanceof Array) ? params : [];
			for (var i = 0; i < params.length; i++) {
				params[i] = JSON.stringify(params[i]);
			}
			func = '(' + func + ')(' + params.join(', ') + ');';
			// Return
			return func;
		}
	};
	
	/**
	 * Cross windows function call
	 * @return void
	 */
	_win.xwfCall = _win.xwfCall || function(){
		// Convert `arguments` to array
		arguments = Array.prototype.slice.call(arguments);
		
		var func = arguments.shift();
		if ('function' == (typeof func)) {
			var result = undefined, 
				rtn = function(){
					
				}
			;
			if (!isXW) {
				result = func.apply(undefined, arguments);
			// Case: cross window calls
			} else {
				// Convert function to string  
				func = func2StrPadding(func, arguments);
				// Forward function call
				if (func) {
					_xWin.postMessage(PM_MSG_KEY + func, '*');
				} 
			}
			// Return
			
		}
	};
})(window, window.opener || window.parent);