/**
 * Cross windows calls
 * @author khanhdtp
 * @param {Object} Current window object
 * @param {Object} Window opener (popup) or window parent (iframe)
 * @return void 
 */
(function(_win, _pWin){
	// @var {String} postMessage origin for call.
	var ORIGIN_CALL = ('undefined' != typeof(XWF_ORIGIN_CALL)) && XWF_ORIGIN_CALL;
	// @var {String} postMessage origin for feedback.
	var ORIGIN_FBAK = ('undefined' != typeof(XWF_ORIGIN_FBAK)) && XWF_ORIGIN_FBAK;
	// @var {String} postMessage message key for request.
	var MSG_KEY_CALL = '#XWF-CALL#';
	// @var {String} postMessage message key for feedback.
	var MSG_KEY_FBAK = '#XWF-FBAK#';
	// @var {Boolean} Is cross windows flag?
	var isXW = (_win !== _pWin);
	// @var {Object} Hold private data
	var PMData = {'sources': {}, 'callbacks': {}};
	
	/**
	 * @var {Function} Event handler
	 * Handle cross function calls
	 */
	var onMessageEvtHandler = function(evt){
		var data = evt.data;
		// Case: calls...
		if ((data.indexOf(MSG_KEY_CALL) >= 0)) {
			if (ORIGIN_CALL.indexOf(evt.origin) < 0) {
				throw Error('[xwf-call] Origin does not match.'); 
				return;
			}
			// Format data
			var data = data.split(MSG_KEY_CALL),
				fcID = data[0], 
				data = data[1]
			;
			// Has callback?
            if (fcID) {
            	PMData.sources[fcID] = evt.source;
            }
            // Execute temp function
            (new Function('return ' + data + ';'))();
            
		// Case: feedback...
		} else if ((data.indexOf(MSG_KEY_FBAK) >= 0)) {
			if (ORIGIN_FBAK.indexOf(evt.origin) < 0) {
				throw Error('[xwf-feedback] Origin does not match.'); 
				return;
			}
			// Format function string
			var data = data.split(MSG_KEY_FBAK),
				fcID = data[0], 
				data = data[1],
				callback = PMData.callbacks[fcID]
			;
			// Has callback?
           	if (callback) {
           		callback((new Function('return ' + data))());
           	};
		}
	};
	//(_win.removeEventListener || _win.detachEvent)('message', onMessageEvtHandler, false);
	// Register event handler, handle cross function calls...  
	(_win.addEventListener || _win.attachEvent)('message', onMessageEvtHandler, false);
	
	/**
	 * Encode data
	 * @param $data {mixed} Data to encode
	 * @return {String}
	 */
	var serialize = function(data) {
		return JSON.stringify(data);
	};
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
				params[i] = serialize(params[i]);
			}
			func = '(' + func + ')(' + params.join(', ') + ');';
			// Return
			return func;
		}
	};
	
	/**
	 * Generate unique Function call id
	 * @return {String} id
	 */
	var genUID = function() {
		var fcID = '_' + (new Date()).getTime();// + Math.random();
		// Return
		return fcID;
	};
	
	/**
	 * Register callback
	 * @param fcID {String} Function call id
	 * @param callback {Function} A callback function 
	 * @return void
	 */
	/*var registerCallback = function(fcID, callback) {
		// Register callback
		if ('function' == (typeof callback)) {
			PMData.callbacks[fcID] = callback;
		}
	};*/
	
	/**
	 * Clear postMessage PMData
	 * @param fcID {String} Function call id
	 * @return void
	 */
	var rmPMDataItem = function(fcID) {
		delete PMData.sources[fcID];
		delete PMData.callbacks[fcID];
	};
	
	/**
	 * Fire cross function callbacks
	 * @param fcID {String} Function call id
	 * @param data {mixed} Data 
	 * @return void
	 */
	_win.xwfFBak = _win.xwfFBak || function(fcID, data){
		var evtSrc = PMData.sources[fcID],
			callback = PMData.callbacks[fcID]
		;
		// Case: same window calls
		if (!evtSrc && callback) {
			callback(data);
		// Case: cross window calls
		} else if (evtSrc) {
			evtSrc.postMessage(fcID + MSG_KEY_FBAK + serialize(data), '*');
		}
		// Remove data item...
		rmPMDataItem(fcID);
	};
	
	/**
	 * Cross windows function call
	 * @return void
	 */
	_win.xwfCall = _win.xwfCall || function(func, callback, params){
		if ('function' == typeof(func)) {
			// Format params
			if (callback instanceof Array && !params) {
				params = callback;
			}
			params = (params || []);
			
			// Gen function call id.
			var fcID = genUID();
			params.push(fcID);
			
			// Register callbacks?
			if ('function' == typeof(callback)) {
				PMData.callbacks[fcID] = function(){
					// Remove data item...
					rmPMDataItem(fcID);
					// Fire callback
					/* Convert `arguments` to array*/ 
					arguments = Array.prototype.slice.call(arguments);
					return callback.apply(null, arguments);
				};
			}
			
			// Case: same window calls
			if (!isXW) {
				func.apply(null, params);
			// Case: cross window calls
			} else {
				// Convert function to string  
				func = func2StrPadding(func, params);
				if (func) {
					// Forward function call 
					_pWin.postMessage(fcID + MSG_KEY_CALL + func, '*');
				}
			}
		}
	};
})(window, window.opener || window.parent);