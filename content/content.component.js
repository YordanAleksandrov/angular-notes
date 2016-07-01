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
			
			this.creatId = function (){
				var baseId="hello, ";
				var index ="world !";
				var stuff=baseId+index;
				console.log(stuff);
				return stuff;
				
			}
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
			
			
			this.editNoteTest = function(index,note_index){
				
				this.creatId();
				this.state= this.state === 'none' ? 'block' : 'none';
				this.state2= this.state2 === 'block' ? 'none' : 'block';
				
				if(note_index == 1){
					
				
					angular.element(document.querySelector('#note_head-'+index)).css("display",this.state);
					angular.element(document.querySelector('#edit_head-'+index)).css("display",this.state2);
					angular.element(document.querySelector('#first_p-'+index)).css("display",this.state);
					angular.element(document.querySelector('#edit_msg-'+index)).css("display",this.state2);
					angular.element(document.querySelector('#edit_note-'+index)).css("display",this.state);
					angular.element(document.querySelector('#save_edited_note-'+index)).css("display",this.state2);

				}
				
				if(note_index == 2){
					
					angular.element(document.querySelector('#listnote_head-'+index)).css("display",this.state);
					angular.element(document.querySelector('#edit_listhead-'+index)).css("display",this.state2);
					angular.element(document.querySelector('#notes_list-'+index)).css("display",this.state);
					angular.element(document.querySelector('#notes_list_edit-'+index)).css("display",this.state2);
					angular.element(document.querySelector('#edit_listnote-'+index)).css("display",this.state);
					angular.element(document.querySelector('#save_edited_listnote-'+index)).css("display",this.state2);

				}
				
			};
			
			
			this.findNote = function (index,noteObj,note) {
				
				for (index in noteObj) {
					
					if (noteObj[index].head == note.head) {
						
						noteObj[index].message = note.message;

					}
				};
				
			};
			this.getList = function(parentIndex){
				
				self.list=[];
				$('.every_list_in_note-'+parentIndex).each(function() {
						
					self.list.push($(this).val());

				});
				
				return self.list;
			}
			
			this.saveEditedNote = function (note,list,parentIndex){

				if(typeof note.message == 'string'){
					
					var index = $rootScope.notes.indexOf(note);
					this.findNote(index,$rootScope.notes,note);
					this.editNoteTest(index,1);
						
				}else {

					var index = $rootScope.listNotes.indexOf(note);
					listnotes = this.getList(parentIndex);
					note.message = listnotes;
					this.findNote(index,$rootScope.listNotes,note);
					this.editNoteTest(index,2);
					
				}
				
			};
		}
	
	});