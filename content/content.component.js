(function() {
'use strict';
	
angular.
  module('content').
	component('contentDiv', {
		
		templateUrl:'content/content.template.html',
		controllerAs: 'self',
		controller:['tabSelection','$http','getNotesFactory','$interval','$q', function contentController(tabSelection,$http,getNotesFactory,$interval,$q) {
			
			var self=this;
			
			self.list = [];
			this.header_text = 'Notes App';
			this.orderProp = 'dateSaved';
			this.tab = tabSelection.tab;
			this.isSelected = tabSelection.isSelected;
			this.selectTab = tabSelection.selectTab;
			self.noteDb = getNotesFactory.noteDb;
			self.notelistDb = getNotesFactory.notelistDb;
			
			this.init = function (){
				
				self.refreshNote();
				self.refreshLNote();
				
			};
			self.refreshNote = function(){
				var defer = $q.defer();
				getNotesFactory.refreshNotes().then(function(res){
					
					self.noteDb = res;
					defer.resolve(res);
					
				},function(err){
					
					
				});
				return defer.promise;
			};
			
			self.refreshLNote = function(){
				
				getNotesFactory.refreshLNotes().then(function(res){
					
					self.notelistDb = res;
					
				},function(err){
					
					
				});
				
			};
			
			this.removeNote = function(note,index,searchBox) {

				if(typeof note.message == 'string'){
					
					getNotesFactory.removeNote(note).then(function(){
						
						for(var i=0;i<self.noteDb.length;i++){
							
							if(self.noteDb[i]._id == note._id){
								
								self.noteDb.splice(index,1);
								
							}
						};
						self.refreshNote();

					});

				}else {
					
					getNotesFactory.removeLNote(note).then(function(){
						
						for(var i=0;i<self.notelistDb.length;i++){
							
							if(self.notelistDb[i]._id == note._id){
								
								self.notelistDb.splice(index,1);
								
							}
						};
						getNotesFactory.refreshNotes().then(function(){
							
							
							
						});
						
					});
				}
				
			};

			this.clearSearchNote = function(searchBox){

				if (searchBox !== undefined){
						
					this.queryNotes = '';
					this.filterNotes(this.queryNotes);	
					
				}
				
			};
			
			this.clearSearchLNote = function(searchBox){

				if (searchBox !== undefined){
						
					this.queryLNotes = '';
					this.filterLNotes(this.queryLNotes);	
					
				}
				
			};
			
			this.filterNotes = function(filter){
				
				for(var i=0 ;i< $('.note').length; i++){
					
					var actual = self.noteDb[i].head.toLowerCase();
					var isSubstring = ( actual.indexOf( filter ) !== -1 );
					
					if (isSubstring == false){
						
						 $('#note_body-'+i).addClass('ng-hide');
						
					}
					else $('#note_body-'+i).removeClass('ng-hide');
					
				}
				
			};
			
			this.filterLNotes = function(filter){
				
				for(var i=0 ;i< $('.Lnote').length; i++){
					
					var actual = self.notelistDb[i].head.toLowerCase();
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
					
					var index = self.noteDb.indexOf(note);
					
					getNotesFactory.saveEditedNote(note).then(function(){
						
						self.refreshNote();
						
					});
						
						this.editNoteTest(index,1);
						
				}else {
					
					var index = self.notelistDb.indexOf(note);
					var list =this.getList(parentIndex);
					note.message = list;
					
					getNotesFactory.saveEditedLNote(note).then(function(){
						
						self.refreshLNote();
						
					});

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
			this.init();
			//$interval(this.init, 100);
		}]
	
	});
})();