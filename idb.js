var idb = (function(){
document.addEventListener("DOMContentLoaded", function(){
 
    if("indexedDB" in window) {

var openRequest = indexedDB.open(idb_db,1);
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
			var db = e.target.result;
			var store = getStore(db,"readwrite");
			var count = store.count();
			count.onsuccess = function(e){
				res = e.target.result+1;
			var request = store.add(rdb,res);
			request.onerror = function(e){
			}
			request.onsuccess = function(e){
			}
			}
		}
	},
	
	dbupdate : function(rdb,key){
		var openRequest = openDB();
		openRequest.onsuccess = function(e){
			var db = e.target.result;
			var store = getStore(db,"readwrite");
			var request = store.put(rdb,key);
			request.onerror = function(e){
			}
			request.onsuccess = function(e){
			}
		}
	},
	
	dbread : function(rdb,onsu,oner){
		var openRequest = openDB();
		openRequest.onsuccess = function(evt){
			rdb.map((e) => readline(e,evt,onsu,oner));
		}
	},
	
	dbreadFrom : function(rdb,onsu,oner,direction){
		direction = direction ? direction : 'next';
		var openRequest = openDB();
		openRequest.onsuccess = function(e){
			var db = e.target.result;
			var store = getStore(db,"readonly");
			var range = IDBKeyRange.lowerBound(rdb);
			var cursor = store.openCursor(range,direction);
			cursor.onsuccess = onsu;
			cursor.onerror = oner;
		}
	},
	
	dbreadTo : function(rdb,onsu,oner,direction){
		direction = direction ? direction : 'next';
		var openRequest = openDB();
		openRequest.onsuccess = function(e){
			var db = e.target.result;
			var store = getStore(db,"readonly");
			var range = IDBKeyRange.upperBound(rdb);
			var cursor = store.openCursor(range,direction);
			cursor.onsuccess = onsu;
			cursor.onerror = oner;
		}
	},
	
	dbreadRange : function(f,t,onsu,oner,direction){
		direction = direction ? direction : 'next';
		var openRequest = openDB()
		openRequest.onsuccess = function(e){
			var db = e.target.result;			
			var store = getStore(db,"readonly");
			var range = IDBKeyRange.bound(f, t);
			var cursor = store.openCursor(range,direction);
			cursor.onsuccess = onsu;
			cursor.onerror = oner;
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
	
	function readline(key,evt,onsu,oner){
			var db = evt.target.result;
			var store = getStore(db,"readonly");
			var request = store.get(Number(key));
			request.onsuccess = onsu;
/*				var res = e.target.result;
//				console.dir(res);
				if(res){
					onsu;
//				output(res.value,selector,type);
					for(var field in res){
//						console.log(field + " = " + res[field]);	
					}
				}
			}*/
			request.onerror = oner;
	}

})();

