(function() {
'use strict';

angular.
  module('addingnotes').
	component('addingNotes', {
		
		templateUrl:'adding_notes/adding_notes.template.html',
		controllerAs: 'self',
		controller:['tabSelection','$http','$filter','getNotesFactory', function contentController(tabSelection,$http,$filter,getNotesFactory) {
			
			var self=this;
			self.tab= tabSelection.tab;
			self.isSelected= tabSelection.isSelected;
			self.selectTab= tabSelection.selectTab;
			this.error_list = angular.element(error_list);
			this.error_note = angular.element(error_note);
			this.preview_list = angular.element(preview_list);
			this.list = [];
			this.date = $filter('date')(new Date(), 'dd, MMMM yyyy');
			this.time = $filter('date')(new Date(), 'HH:mm');
			
			this.init = function (){
				
				self.refreshNote();
				self.refreshLNote();
				
			};
			
			self.refreshNote = function(){
				
			getNotesFactory.refreshNotes().then(function(){
					
					self.note="";
					
				},function(err){
					
					
				});
				
			};
			
			self.refreshLNote = function(){	
			
				getNotesFactory.refreshLNotes().then(function(res){
					
					self.listnote="";
					
				},function(err){
					
					
				});
			};
			
			this.addTodo = function(newTodo){
				
				if(newTodo === undefined || newTodo === ""){
					
					this.error_list.css("visibility","visible");
					
				}else 
				{
					
					this.error_list.css("visibility","hidden");
					this.preview_list.append("<li>"+newTodo+"</li>");
					this.list.push(newTodo);
					this.todo="";
					
				}
				
			};

			this.saveNote = function(){
				
				
				if($('.noNote').length == 0){
					
						if(self.note ==undefined || self.note.message =='' || self.note.head ==undefined || self.note.head == '' || self.note.message == undefined){
						
							this.error_note.css("visibility","visible");
						
						}else{
							
							this.error_note.css("visibility","hidden");
							this.note.date = this.time+' / '+this.date;
							getNotesFactory.saveNote(this.note);
							//console.log(getNotesFactory.noteDb);
							/*$http.post('/notes',this.note).success(function(response){
								
								console.log("saved successful");
								console.log(getNotesFactory.noteDb);
								self.refreshNote();
								console.log(getNotesFactory.noteDb);
							});*/
							
							self.note="";
							self.selectTab(1);
							$('#search_note_input').css("display","inline");
							$('#search_input_btn').css("display","inline-block");
						}
					}else{
					
					$('.noNote').remove();
					this.saveNote();
				}
				
			};
						
			this.saveListNote = function (){
				
				if($('.noListNotes').length == 0){
					
					if( self.listnote == undefined || self.listnote.head === undefined || self.listnote.head === ""){
					
						this.error_list.css("visibility","visible");
					
					}else{
						
						this.error_list.css("visibility","hidden");
						this.error_note.css("visibility","hidden");	
						this.listnote.date = this.time+' / '+this.date;
						this.listnote.message=this.list;
						getNotesFactory.saveLNote(this.listnote);
						self.refreshLNote();
						self.listnote="";
						this.preview_list.html("");
						this.list = [];
						this.title2 = "";	
						this.todo="";
						self.selectTab(2);
						$('#search_list_note_input').css("display","block");
						$('#search_input_btn_l').css("display","inline-block");
						
					}
				}else{
					
					$('.noListNotes').remove();
					this.saveListNote();
				}
				
			};
			this.init();
		}]
	
	});
	
})();