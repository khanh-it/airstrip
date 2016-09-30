/**
 * 
 * 
 */
(function(_win){
	//
	//
	//var postMessage = _win.postMessage;
	//
	// 
	_win.postMessage = undefined; /* function(message, origin, callback) {
		alert('PM callback: ' + callback);
		return postMessage(message, origin);
	};*/
})(window);
console.log('1) : ', window.postMessage);

/**
 * 
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        
        /**
         * 
         */
        window.addEventListener('message', function(evt){
            console.log('evt: ', evt);
        });
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(evtId) {
        // go full-screen
        //var domMyiframe = document.getElementById('myiframe');
        // +++ 
        //document.requestFullscreen(domMyiframe);
        
        // 
        console.log('Received Event: ' + evtId);
    }
};

app.initialize();

// Auto trigger ready event on browser
if (!window.cordova) {
    // 
    window.cordova = {
        version: function(){
            return '0.0.1';
        }
    };
    //
    app.receivedEvent('deviceready');
}
