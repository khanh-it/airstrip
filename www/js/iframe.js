/**
 * 
 */
console.log('2) ', window.parent.postMessage);
window.onload = function(){
	console.log('3) ', window.parent.postMessage);
	//console.log('4) ', window.parent.document.body);
	
	var PM_ORIGIN = '*';
	
	window.parent.postMessage('Test message', PM_ORIGIN);
	(function(win){
		return;
	    win.postMessage('Test message', PM_ORIGIN);
	    
	})(window.parent);	
};
