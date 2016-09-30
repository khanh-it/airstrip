/**
 * 
 */
(function(win){
    
    var PM_ORIGIN = '*';
    
    win.postMessage(JSON.stringify({
        'message': 'noi_dung',
        'call': function(){
            console.log(arguments);
        }
    }), PM_ORIGIN)
})(window.parent);