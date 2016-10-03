(function($){
	var objVar = {
		'prop_01' : 'value_01',
		'prop_02' : ['value_01'],
		'prop_03' : {
			'i-prop_01' : 'i-value_01',
		}/*,
		'func_01' : function(){
			alert(this.prop_01);
			return {'func_02': function(){
				alert('def');
			}};
		}*/
	};
	console.time('benchmark_XCalls');
	xwfCall(function(param1){
		delete param1.prop_03;
		return;
		//console.log(window.cordova.version());
		$.get('http://192.168.1.64/airstrip/www/index.html', null, function(rs){
			xwfCall(function(html){
				console.log('html: ', html);
			}, null, rs);
		}, 'html');
		return 'some-value';
	}, null, objVar);
	console.log(objVar);
	console.timeEnd('benchmark_XCalls');
})(jQuery);