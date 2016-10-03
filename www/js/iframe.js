
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
	console.log('abc');
	//console.log(window);
	//console.log(window.cordova.version());
	
	return 'some-value';
}, objVar)(function(result){
	console.log('result: ', result);
});
/*(function(param1){
	console.log(param1);
	//console.log(window);
	//console.log(window.cordova.version());
})(objVar);*/
console.timeEnd('benchmark_XCalls');