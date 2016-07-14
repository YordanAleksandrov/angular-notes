(function() {
'use strict';

angular.
  module('addingnotes').
	component('addingNotes', {
		
		templateUrl:'adding_notes/adding_notes.template.html',
		controllerAs: 'self',
		controller:['$rootScope','tabSelection','$http','$filter','getNotesFactory','$interval','$q', function contentController($rootScope,tabSelection,$http,$filter,getNotesFactory,$interval,$q) {
			
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
				
				self.refreshNote().then(function(res){
					
					self.refreshLNote().then(function(res){
						
					});
					
				});
				
			};
			
			self.refreshNote = function(){
				
				var defer = $q.defer();
				getNotesFactory.refreshNotes().then(function(res){
					
					$rootScope.noteDb = res;
					defer.resolve(res);
					self.note="";
					
				},function(err){
					
					console.log('Whoops');
					
				});
				return defer.promise;
			};
			
			self.refreshLNote = function(){	
			
				var defer = $q.defer();
				getNotesFactory.refreshLNotes().then(function(res){
					
					$rootScope.notelistDb = res;
					defer.resolve(res);
					self.listnote="";
					
				},function(err){
					
					console.log('Whoops');
					
				});
				return defer.promise;
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
					
						if(self.note == undefined || self.note.message == '' || self.note.head == undefined || self.note.head == '' || self.note.message == undefined){
						
							this.error_note.css("visibility","visible");
						
						}else{
							
							this.error_note.css("visibility","hidden");
							this.note.date = this.time+' / '+this.date;
							
							getNotesFactory.saveNote(this.note).then(function(){
								
								self.refreshNote().then(function(res){
									
									self.note={};
									$('#search_note_input').css("display","inline");
									$('#search_input_btn').css("display","inline-block");
									
								});

							});
							
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
						
						getNotesFactory.saveLNote(this.listnote).then(function(){
							
							self.refreshLNote();
							
						});
						
						this.preview_list.html("");
						this.list = [];
						this.title2 = "";	
						this.todo="";
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