'use strict';
angular.
	module('notes').run(function($rootScope) {
			$rootScope.notes = [{
				
				  "head": "Hello",
				  "message": "Some text",
				  "dateSaved": "14:10 / 29, June 2016"
				}
				
			];
			
			$rootScope.listNotes = [{
				
				  "head": "dqwdwqs",
				  "message":["qwdwq","dqwdqwdwq","qdwqdwq"],
				  "dateSaved": "14:10 / 29, June 2016"
				}
				
			];
	
	});
angular.
  module('content').
	component('contentDiv', {
		
		templateUrl:'content/content.template.html',
		controllerAs: 'self',
		controller: function contentController($http,$rootScope) {
			
			this.header_text = 'Notes App';
			this.orderProp = 'dateSaved';
			this.notes_right=angular.element(notes_right);
			this.check =function(){
				
				if($rootScope.notes.length ==0 && $rootScope.listNotes.length == 0){
					
					this.notes_right.append("<p class='noNotes'>No saved notes</p>");
						
				} 
				
			};
			this.removeNote = function(note) {
				
				if(typeof note.message == 'string'){

					var index = $rootScope.notes.indexOf(note);
					$rootScope.notes.splice(index, 1);
					this.check();
					
					
				}else {
					
					var index = $rootScope.listNotes.indexOf(note);
					$rootScope.listNotes.splice(index, 1);
					this.check();
					
				}
				
			};	
		}
	
	});