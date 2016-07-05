'use strict';
angular.
	module('notes').run(function($rootScope) {
			
			$rootScope.tab = 1;
			$rootScope.selectTab = function(setTab){
				
				$rootScope.tab = setTab;
				
			};
			
			$rootScope.isSelected = function(checkTab){
				
				return $rootScope.tab === checkTab;
				
			};
			
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
			this.list_notes_right = $('#listnotes_right');
			var listnotes=[];
			self.list = [];
				
			this.check = function(notes_index){
				
				if($rootScope.notes.length ==0 && notes_index ==1){
					
					$('#search_note_input').css("display","none");
					this.notes_right.append("<p class=' noNotes noNote'>No saved notes</p>");
						
				}
				else if($rootScope.listNotes.length == 0 && notes_index ==2){
					
					this.list_notes_right.append("<p class=' noNotes noListNotes'>No saved notes</p>");
					$('#search_list_note_input').css("display","none");
				}
				
			};
			this.removeNote = function(note) {
				
				if(typeof note.message == 'string'){

					var index = $rootScope.notes.indexOf(note);
					$rootScope.notes.splice(index, 1);
					this.check(1);
					
					
				}else {
					
					var index = $rootScope.listNotes.indexOf(note);
					$rootScope.listNotes.splice(index, 1);
					this.check(2);
					
				}
				
			};
			
			this.clearSearch = function(searchBox){
				console.log(searchBox);
				if (searchBox !== undefined){
						
						 return searchBox = '';
						 
				}
				else  return searchBox = '';
				
			}
			
			this.filterNotes = function(filter){
				
				for(var i=0 ;i< $('.note').length; i++){
					
					var actual = $rootScope.notes[i].head.toLowerCase();
					var isSubstring = ( actual.indexOf( filter ) !== -1 );
					
					if (isSubstring == false){
						
						 $('#note_body-'+i).addClass('ng-hide');
						
					}
					else $('#note_body-'+i).removeClass('ng-hide');
					
				}
				
			};
			
			this.filterLNotes = function(filter){
				
				for(var i=0 ;i< $('.Lnote').length; i++){
					
					var actual = $rootScope.listNotes[i].head.toLowerCase();
					var isSubstring = ( actual.indexOf( filter ) !== -1 );
					
					if (isSubstring == false){
						
						 $('#Lnote_body-'+i).addClass('ng-hide');
						
					}
					else $('#Lnote_body-'+i).removeClass('ng-hide');
					
				}
				
			};
			
			this.editNoteTest = function(index,note_index){
				
				
				this.state= this.state === 'none' ? 'block' : 'none';
				this.state2= this.state2 === 'block' ? 'none' : 'block';
				
			
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
				
			};
			
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

			};
			
			this.filter = function(some,other){
				
				var state ='';

				if(other !== undefined){
					
					var check = some.toLowerCase().indexOf(other);
					
					if(check == -1){
						
						return state = true;
						
					}
					else return state = false;
				
				}
				
				else return state = false;
					
			};
			
		}
	
	});