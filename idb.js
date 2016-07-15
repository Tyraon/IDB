//Config
//Testdb
//var idb_db="testdb";			//<= Databasename
//var idb_os="testtabelle";		//<= Tablename


var idb = (function(){
document.addEventListener("DOMContentLoaded", function(){
 
    if("indexedDB" in window) {
//        console.log("YES!!! I CAN DO IT!!! WOOT!!!");

var openRequest = indexedDB.open(idb_db,1);
//upgrade
openRequest.onupgradeneeded = function(e){
var thisDB = e.target.result;
if(!thisDB.objectStoreNames.contains(idb_os)){
	thisDB.createObjectStore(idb_os);
}
}
    } else {
        console.log("IndexedDB not supportet in your Browser.");
    }
},false);

//success


//methods
return{
	dbwrite : function(rdb){
		var openRequest = openDB();
		openRequest.onsuccess = function(e){
//			console.log(rdb);
			var db = e.target.result;
			var store = getStore(db,"readwrite");
			var count = store.count();
			count.onsuccess = function(e){
				res = e.target.result+1;
//			console.log(res);	
			var request = store.add(rdb,res);
			request.onerror = function(e){
//				console.log("Error",e.target.error.name);
			}
			request.onsuccess = function(e){
//				console.log("Daten gespeichert");
			}
			}
		}
	},
	
	dbupdate : function(rdb,key){
		var openRequest = openDB();
		openRequest.onsuccess = function(e){
//			console.log(rdb);
			var db = e.target.result;
			var store = getStore(db,"readwrite");
			var request = store.put(rdb,key);
			request.onerror = function(e){
//				console.log("Error",e.target.error.name);
			}
			request.onsuccess = function(e){
//				console.log("Daten gespeichert");
			}
		}
	},
	
	dbread : function(selector,type,rdb){
//		console.log(rdb);
		var openRequest = openDB();
		openRequest.onsuccess = function(e){
			var db = e.target.result;
			var store = getStore(db,"readonly");
			var request = store.get(Number(rdb));
			request.onsuccess = function(e){
				var res = e.target.result;
				console.dir(res);
				if(res){
				output(res.value,selector,type);
					for(var field in res){
//						console.log(field + " = " + res[field]);	
					}
				}
			}
		}
	},
	
	dbreadFrom : function(selector,type,rdb,direction){
		direction = direction ? direction : 'next';
		var openRequest = openDB();
		openRequest.onsuccess = function(e){
			var db = e.target.result;
			var store = getStore(db,"readonly");
			var range = IDBKeyRange.lowerBound(rdb);
			var cursor = store.openCursor(range,direction);
			cursor.onsuccess = function(e){
				var res = e.target.result;
				if(res){
				output(res.value,selector,type);
//				console.dir(res.value);
				res.continue();
				}
			}
		}
	},
	
	dbreadTo : function(selector,type,rdb,direction){
		direction = direction ? direction : 'next';
		var openRequest = openDB();
		openRequest.onsuccess = function(e){
			var db = e.target.result;
			var store = getStore(db,"readonly");
			var range = IDBKeyRange.upperBound(rdb);
			var cursor = store.openCursor(range,direction);
			cursor.onsuccess = function(e){
				var res = e.target.result;
				if(res){
				output(res.value,selector,type);
//				console.dir(res.value);
				res.continue();
				}
			}
		}
	},
	
	dbreadRange : function(selector,type,f,t,direction){
		direction = direction ? direction : 'next';
		var openRequest = openDB()
		openRequest.onsuccess = function(e){
			var db = e.target.result;			
			var store = getStore(db,"readonly");
			var range = IDBKeyRange.bound(f, t);
			var cursor = store.openCursor(range,direction);
			cursor.onsuccess = function(e){
				var res = e.target.result;
				if(res){
				output(res.value,selector,type);
//				console.dir(res.value);
				res.continue();
				}
			}
		}
	},
	
	dbdelete : function(dbr){
		var openRequest = openDB();
		openRequest.onsuccess = function(e){
			var db = e.target.result;
			var store = getStore(db,"readwrite");
			var request = store.delete(dbr);
			request.onsuccess = function(e){
				console.log("Eintrag gelöscht!");
			}
		}
	}

	};
//EndMethods	
	function openDB(){
		return indexedDB.open(idb_db,1);
	}
	
	function getStore(db,connect){
		var transaction = db.transaction([idb_os],connect);
		return transaction.objectStore(idb_os);
	}

 	function output(data,selector,type){
		type == "html" ? toHtml(data,selector):
		type == "value" ? toValue(data,selector):
		type == "text" ? toText(data,selector):
		type == "cd" ? toConsoleD(data,selector):
		type == "cl" ? toConsoleL(data,selector): console.log('Keine Ausgabe methode vorhanden!');
	}
	
	function toHtml(data,selector){
		$(selector).html(data);
	}
	function toValue(data,selector){
		$(selector).value(data);
	}
	function toText(data,selector){
		$(selector).text(data);
	}
	function toConsoleD(data,selector){
		console.dir(data);
	}
	function toConsoleL(data,selector){
		console.log(data);
	}
})();

