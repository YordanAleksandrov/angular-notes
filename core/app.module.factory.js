(function() {
	
angular.module('notes').factory('getNotesFactory',getNotesFactory);
	
	getNotesFactory.$inject =['$http','$q'];
	
	function getNotesFactory ($http,$q){
		
		var Maintenance = {};
		Maintenance.noteDb =[];
		Maintenance.notelistDb =[];
		
		//refresh,save,delete,edit of Notes
		Maintenance.refreshNotes = function (){
			
			var defer = $q.defer();
			
			$http.get('/notes').success(function(response){
			
				Maintenance.noteDb = response;
				Maintenance.check(1);
				defer.resolve(response);
				//console.log(Maintenance.noteDb);
	
			});
			return defer.promise;
		};
		
		Maintenance.saveNote = function (note){
			
			var defer = $q.defer();
			$http.post('/notes',note).success(function(response){
								
				defer.resolve(response);
				Maintenance.refreshNotes();
				
			});
			
			return defer.promise;
			
		};
		Maintenance.removeNote = function (note){
			
			var defer = $q.defer();
			$http.delete('/notes/'+note._id).success(function(response){
						
					defer.resolve(response);
					Maintenance.refreshNotes();
						
			});
			return defer.promise;
		};
		
		Maintenance.saveEditedNote = function (note){
			
			var defer = $q.defer();
			$http.put('/notes/'+note._id,note).success(function(response){
				
				defer.resolve(response);
				Maintenance.refreshNotes();
				
			});
			return defer.promise;
		};
		//end of  manupulations with  Notes
		
		//refresh,save,delete,edit of ListNotes
		Maintenance.saveLNote = function (listnote){
			
			var defer = $q.defer();
			$http.post('/listnotes',listnote).success(function(response){
								
				defer.resolve(response);
				Maintenance.refreshLNotes();
				
			});
			
			return defer.promise;
			
		};
		
		Maintenance.refreshLNotes = function (){
			
			var defer = $q.defer();
			
			$http.get('/notelist').success(function(response){
			
				Maintenance.notelistDb = response;
				Maintenance.check(2);
				defer.resolve(response);
				//console.log(Maintenance.notelistDb);
				
			});
			return defer.promise;
		};
		
		Maintenance.removeLNote = function (note){
			
			var defer = $q.defer();
			$http.delete('/listnotes/'+note._id).success(function(response){
						
					defer.resolve(response);
					Maintenance.refreshLNotes();
						
			});
			
			return defer.promise;
			
		};
		
		
		Maintenance.saveEditedLNote = function (note){
			var defer = $q.defer();
			$http.put('/listnotes/'+note._id,note).success(function(response){
				
				defer.resolve(response);
				Maintenance.refreshLNotes();
				
			});
			return defer.promise;
		};
		
		//end of  manupulations with  ListNotes
		
		Maintenance.check = function(notes_index){
			
			if(Maintenance.noteDb.length ==0 && notes_index ==1){
				
				$('#search_note_input').css("display","none");
				$('#search_input_btn').css("display","none");
				if($('.noNote').length == 0){
					
					$('#notes_right').append("<p class='noNotes noNote'>No saved notes</p>");
					
				}else {
					
					$('.noNote').remove();
					$('#notes_right').append("<p class='noNotes noNote'>No saved notes</p>");
					
				}
	
			}
			if(Maintenance.notelistDb.length == 0 && notes_index ==2){
				
				$('#search_list_note_input').css("display","none");
				$('#search_input_btn_l').css("display","none");
				if($('.noListNotes').length == 0){
					
					$('#listnotes_right').append("<p class='noNotes noListNotes'>No saved notes</p>");
				
				}else {
					
					$('.noListNotes').remove();
					$('#listnotes_right').append("<p class='noNotes noListNotes'>No saved notes</p>");
				
				}	
			}
			
		};
		return Maintenance;
		
	};
	
angular.module('notes').run(run);

run.$inject=['$rootScope','getNotesFactory'];

function run ($rootScope,getNotesFactory){
	
	getNotesFactory.refreshNotes().then(function(){
		
		$rootScope.noteDb = getNotesFactory.noteDb;
		
		getNotesFactory.refreshLNotes().then(function(){
		
			$rootScope.notelistDb = getNotesFactory.notelistDb;
		
		});
	});
	

};
})();	