/**
 * 
 */
try {
	console.log('2) ', window.parent.cordova);
} catch (e) {
	console.log('Err: ', e.message);
}

/**
 * 
 */
var PM_ORIGIN = '*';
window.addEventListener('message', function(evt){
    console.log('parent window: ', evt.source);
    //console.log('cordova: ', evt.source.cordova);
    evt.source.postMessage('Child post message', PM_ORIGIN);
});
	
//window.parent.postMessage('Test message', PM_ORIGIN);