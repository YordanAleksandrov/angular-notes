(function() {
	'use strict';

	angular.module('notes', [

		'content'
		
	]);

	angular.module('notes').service('tabSelection',function($http){
		
		this.tab = 1;

		this.selectTab = function(setTab){
			
			this.tab = setTab;
			
		};
		
		this.isSelected = function(checkTab){
			
			return this.tab === checkTab;
			
		};
		
	});
	angular.module('notes').factory('getNotesFactory',getNotesFactory);
	
	getNotesFactory.$inject =['$http','$q'];
	
	function getNotesFactory ($http,$q){
		
		var listsMaintenance = {};
		var hello = 'Hello';
		listsMaintenance.noteDb =[];
		listsMaintenance.notelistDb =[];
		
		listsMaintenance.refreshNotes = function (){
			
			var defer = $q.defer();
			
			$http.get('/notes').success(function(response){
			
				listsMaintenance.noteDb = response;
				listsMaintenance.check(1);
				defer.resolve(response);
				console.log(listsMaintenance.noteDb);
	
			});
			return defer.promise;
		};
		
		listsMaintenance.saveNote = function (note){
			
			var defer = $q.defer();
			$http.post('/notes',note).success(function(response){
								
				defer.resolve(response);
				listsMaintenance.refreshNotes();
				
			});
			
			return defer.promise;
			
		};
		
		listsMaintenance.saveLNote = function (listnote){
			
			var defer = $q.defer();
			$http.post('/listnotes',listnote).success(function(response){
								
				defer.resolve(response);
				listsMaintenance.refreshLNotes();
				
			});
			
			return defer.promise;
			
		};
		
		listsMaintenance.refreshLNotes = function (){
			
			var defer = $q.defer();
			
			$http.get('/notelist').success(function(response){
			
				listsMaintenance.notelistDb = response;
				listsMaintenance.check(2);
				defer.resolve(response);
				//console.log(listsMaintenance.notelistDb);
				
			});
			return defer.promise;
		};
		
		listsMaintenance.check = function(notes_index){
			
			if(listsMaintenance.noteDb.length ==0 && notes_index ==1){
				
				$('#search_note_input').css("display","none");
				$('#search_input_btn').css("display","none");
				if($('.noNote').length == 0){
					
					$('#notes_right').append("<p class='noNotes noNote'>No saved notes</p>");
					
				}else {
					
					$('.noNote').remove();
					$('#notes_right').append("<p class='noNotes noNote'>No saved notes</p>");
					
				}
	
			}
			if(listsMaintenance.notelistDb.length == 0 && notes_index ==2){
				
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
		return listsMaintenance;
		
	};
	
})();