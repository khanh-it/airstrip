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
	var ORIGIN = 'http://192.168.1.64';
	// @var {String} postMessage message key for request.
	var MSG_KEY_REQ = '-#XWF-REQ#-';
	// @var {String} postMessage message key for response.
	var MSG_KEY_RES = '-#XWF-RES#-';
	// @var {Boolean} Is cross windows flag?
	var isXW = (_win !== _xWin);
	// @var {Function} Event handler
	// Handle cross function calls  
	var onMessageEvtHandler = function(evt){
		console.log('postMessage...', '' + evt.origin);
		if (evt.origin != ORIGIN) {
			console && console.log('[xwf-call] Origin does not match.'); 
			return;
		}
		// Case: request calls...
		if ((evt.data.indexOf(MSG_KEY_REQ) >= 0)) {
			console.log('MSG_KEY_REQ: ', MSG_KEY_REQ);
			// Format function string
			var data = evt.data.split(MSG_KEY_REQ),
				cbID = data[0], 
				func = data[1],
				result
			;
            // Execute temp function
            eval('result = ' + func + ';');
            // Has callback?
            if (cbID) {
            	console.log('cbID: ', cbID);
            	evt.source.postMessage(cbID + MSG_KEY_RES, evt.origin);
            }
		}
		// Case: response calls...
		if ((evt.data.indexOf(MSG_KEY_RES) >= 0)) {
			
		}
		
		// Self destruct
		//(_win.removeEventListener || _win.detachEvent)('message', onMessageEvtHandler, false);
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
	
	// @var {Object} Hold postMessage callbacks
	var PM_Callbacks = {};
	/**
	 * Register callback
	 * 
	 * @param callback {Function} A callback function 
	 * @return {String} Register id
	 */
	var registerCallback = function(callback) {
		if ('function' == (typeof callback)) {
			// Generate id
			var id = '_' + (new Date()).getTime();
			// Register callback
			PM_Callbacks[id] = callback;
			// Return
			return id;
		}
	};
	
	/**
	 * Cross windows function call
	 * @return void
	 */
	_win.xwfCall = _win.xwfCall || function(func, callback){
		if ('function' == (typeof func)) {
			// Get params from `arguments`
			arguments = Array.prototype.slice.call(arguments, 2);
			// Case: same window calls
			if (!isXW) {
				(callback || function(){})(
					func.apply(undefined, arguments)
				);
			// Case: cross window calls
			} else {
				// Convert function to string  
				func = func2StrPadding(func, arguments);
				if (func) {
					// Register callback?
					var cbID = '';
					if ('function' == (typeof callback)) {
						cbID = registerCallback(callback);
					}
					// Forward function call 
					_xWin.postMessage(cbID + MSG_KEY_REQ + func, '*');
				}
			}
		}
	};
})(window, window.opener || window.parent);