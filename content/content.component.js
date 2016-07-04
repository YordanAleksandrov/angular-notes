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
			this.notes_right =$('#notes_right');
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
			
			
			this.editNoteTest = function(index,note_index){
				
				this.state= this.state === 'none' ? 'block' : 'none';
				this.state2= this.state2 === 'block' ? 'none' : 'block';
				console.log();
				if(note_index == 1){
					
					
					$('#note_head-'+index).css("display",this.state);
					$('#edit_head-'+index).css("display",this.state2);
					$('#first_p-'+index).css("display",this.state);
					$('#edit_msg-'+index).css("display",this.state2);
					$('#edit_note-'+index).css("display",this.state);
					$('#save_edited_note-'+index).css("display",this.state2);

				}
				
				if(note_index == 2){
					
					$('#listnote_head-'+index).css("display",this.state);
					$('#edit_listhead-'+index).css("display",this.state2);
					$('#notes_list-'+index).css("display",this.state);
					$('#notes_list_edit-'+index).css("display",this.state2);
					$('#edit_listnote-'+index).css("display",this.state);
					$('#save_edited_listnote-'+index).css("display",this.state2);

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
					
					for(var i=0; i< $('.list_el-'+parentIndex).length; i++){
						
						console.log($('#list_el-'+i));
						console.log($('#every_list-'+i).hasClass('done'));
						
						if($('#list_el-'+i+'-'+parentIndex).hasClass('done')== true){

							$('#list_el-'+i+'-'+parentIndex).removeClass('done');
							$('#list_el-'+i+'-'+parentIndex).addClass('notdone');
							
						}
						
					};
				}
				
			};
			
			this.checked = function (index,parentIndex){
				
				var li_el = $('#list_el-'+index+'-'+parentIndex);
				
				if(li_el.hasClass('notdone')){
					
					li_el.removeClass('notdone');
					li_el.addClass('done');
					
				}else{
					
					li_el.removeClass('done');
					li_el.addClass('notdone');
					
				}

			}
		}
	
	});