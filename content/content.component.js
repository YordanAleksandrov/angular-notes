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
			
			var self=this;
			this.header_text = 'Notes App';
			this.orderProp = 'dateSaved';
			this.notes_right=angular.element(notes_right);
			var listnotes=[];
			self.list = [];
			
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
			
			this.editNote = function (index){
				
				angular.element(document.querySelector('#note_head-'+index)).css("display","none");
				angular.element(document.querySelector('#edit_head-'+index)).css("display","block");
				angular.element(document.querySelector('#first_p-'+index)).css("display","none");
				angular.element(document.querySelector('#edit_msg-'+index)).css("display","block");
				angular.element(document.querySelector('#edit_note-'+index)).css("display","none");
				angular.element(document.querySelector('#save_edited_note-'+index)).css("display","block");
				
			};
			
			this.editListNote = function (index){
				
				angular.element(document.querySelector('#listnote_head-'+index)).css("display","none");
				angular.element(document.querySelector('#edit_listhead-'+index)).css("display","block");
				angular.element(document.querySelector('#notes_list-'+index)).css("display","none");
				angular.element(document.querySelector('#notes_list_edit-'+index)).css("display","block");
				angular.element(document.querySelector('#edit_listnote-'+index)).css("display","none");
				angular.element(document.querySelector('#save_edited_listnote-'+index)).css("display","block");
				
			}
			
			this.backToNormalNote = function (index){
				
				angular.element(document.querySelector('#note_head-'+index)).css("display","block");
				angular.element(document.querySelector('#edit_head-'+index)).css("display","none");
				angular.element(document.querySelector('#first_p-'+index)).css("display","block");
				angular.element(document.querySelector('#edit_msg-'+index)).css("display","none");
				angular.element(document.querySelector('#edit_note-'+index)).css("display","block");
				angular.element(document.querySelector('#save_edited_note-'+index)).css("display","none");
			
			};
			
			this.backToNormalListNote = function (index){
				
				angular.element(document.querySelector('#listnote_head-'+index)).css("display","block");
				angular.element(document.querySelector('#edit_listhead-'+index)).css("display","none");
				angular.element(document.querySelector('#notes_list-'+index)).css("display","block");
				angular.element(document.querySelector('#notes_list_edit-'+index)).css("display","none");
				angular.element(document.querySelector('#edit_listnote-'+index)).css("display","block");
				angular.element(document.querySelector('#save_edited_listnote-'+index)).css("display","none");
			
			};
			
			this.findNote = function (index,noteObj,note) {
				
				for (index in noteObj) {
					
					if (noteObj[index].head == note.head) {
						
						noteObj[index].message = note.message;

					}
				};
				
			};
			this.getList = function(){
				
				self.list=[];
				$('.every_list_in_note').each(function() {
						
					self.list.push($(this).val());
					console.log(self.list);
				});
				
				return self.list;
			}
			
			this.saveEditedNote = function (note,list){

				if(typeof note.message == 'string'){
					
					var index = $rootScope.notes.indexOf(note);
					this.findNote(index,$rootScope.notes,note);
					this.backToNormalNote(index);
						
				}else {

					var index = $rootScope.listNotes.indexOf(note);
					listnotes = this.getList();
					note.message = listnotes;
					this.findNote(index,$rootScope.listNotes,note);
					this.backToNormalListNote(index);
					
				}
				
			};
		}
	
	});