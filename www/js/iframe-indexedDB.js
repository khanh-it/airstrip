// (function($){
	
	/* indexedDB */
	//prefixes of implementation that we want to test
     window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
     
     //prefixes of window.IDB objects
     window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
     window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
     
     if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.");
     }
     
     var employeeID = 0;
		var employeeData = [
	   { id: ++employeeID + (new Date()), name: "Gopal K Varma", age: 35, email: "contact@tutorialspoint.com" },
	   { id: ++employeeID + (new Date()), name: "Prasad", age: 24, email: "prasad@tutorialspoint.com" }
	];
     var db;
     var request = window.indexedDB.open("AirTrip", 1);
     
     request.onerror = function(event) {
        console.log("error: ");
     };
     
     request.onsuccess = function(event) {
        db = request.result;
        console.log("success: "+ db);
     };
     
     request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("employee", {keyPath: "id"});
        
        for (var i in employeeData) {
           objectStore.add(employeeData[i]);
        }
     };
     
     function read() {
        var transaction = db.transaction(["employee"]);
        var objectStore = transaction.objectStore("employee");
        var request = objectStore.get("00-03");
        
        request.onerror = function(event) {
           alert("Unable to retrieve daa from database!");
        };
        
        request.onsuccess = function(event) {
           // Do something with the request.result!
           if(request.result) {
              alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
           }
           
           else {
              alert("Kenny couldn't be found in your database!");
           }
        };
     }
     
     function readAll() {
        var objectStore = db.transaction("employee").objectStore("employee");
        
        objectStore.openCursor().onsuccess = function(event) {
           var cursor = event.target.result;
           
           if (cursor) {
              alert("Name for id " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
              cursor.continue();
           }
           
           else {
              alert("No more entries!");
           }
        };
     }
     
     var addAI = 1000;
     
     function add() {
        var request = db.transaction(["employee"], "readwrite")
        .objectStore("employee")
        .add({ id: ++addAI, name: "Kenny", age: 19, email: "kenny@planet.org"
        	, "child" : { name: "Sang", age: 21, email: "sang@planet.org"}
        	, "child2" : { name: "Sang1", age: 21, email: "sang1@planet.org"}
        	, "child3" : { name: "Sang2", age: 21, email: "sang2@planet.org"}
        	, "child4" : { name: "Sang3", age: 21, email: "sang3@planet.org"}
        	, "child5" : { name: "Sang4", age: 21, email: "sang4@planet.org"}
        });
        
        request.onsuccess = function(event) {
           console.log("Item has been added to your database.");
        };
        
        request.onerror = function(event) {
           console.log("Unable to add data\r\nItem is aready exist in your database! ");
        };
        
        setTimeout(function(){
        	add();
        }, 500);
     };
     
     function remove() {
        var request = db.transaction(["employee"], "readwrite")
        .objectStore("employee")
        .delete("00-03");
        
        request.onsuccess = function(event) {
           alert("Kenny's entry has been removed from your database.");
        };
     }

// })(jQuery);