(function($){
	
	$btnBgallery = $('#btn-bgallery');
	
	$btnBgallery.on('click', function(evt){
		//
		//
		console.time('benchmark_XCalls');
		xwfCall(
			// Function call
			// Context changed to parent page inside this function
			function(_fcID){
				//
				navigator.camera.getPicture(
					function(){
						console.log('camera success');
						xwfFBak(_fcID, arguments);
					},
					function(){
						console.log('camera failed');
						xwfFBak(_fcID, arguments);
					}
				);
			},
			// Callback 
			function(result){
				console.timeEnd('benchmark_XCalls');
				console.log('get camera data: ', result);
			},
			// Params
			[]
		);
		// .end
	});
	
})(jQuery);