'use strict';

angular.
  module('addingnotes').
	component('addingNotes', {
		
		templateUrl:'adding_notes/adding_notes.template.html',
		controllerAs: 'self',
		controller:function contentController($http,$filter,$rootScope) {
			
			this.tab = 1;
			this.error_list = angular.element(error_list);
			this.error_note = angular.element(error_note);
			this.preview_list = angular.element(preview_list);
			this.list = [];
			this.date = $filter('date')(new Date(), 'dd, MMMM yyyy');
			this.time = $filter('date')(new Date(), 'HH:mm');
			
			this.selectTab = function(setTab){
				
				this.tab = setTab;
				
			};
			
			this.isSelected = function(checkTab){
				
				return this.tab === checkTab;
				
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
				
				if($('.noNotes').length == 0){
					
					if((this.title === undefined || this.title === "") || (this.message === undefined || this.message === "")){
						
						this.error_note.css("visibility","visible");
						
					}else{
						
						this.error_note.css("visibility","hidden");
						$rootScope.notes = $rootScope.notes.concat([
						
							{head :this.title ,message :this.message ,dateSaved:this.time +' / '+this.date}
							
						]);
						
						this.title="";
						this.message="";
		
					}
				}else {
					
					$('.noNotes').remove();
					this.saveNote();
				}
				
			};
						
			this.saveListNote = function (){
				
				if($('.noNotes').length == 0){
					
					if(this.title2 === undefined || this.title2 === ""){
						
						this.error_list.css("visibility","visible");
						
					}else{
						
						this.error_list.css("visibility","hidden");
						
						$rootScope.listNotes = $rootScope.listNotes.concat([
						
							{head :this.title2 , message:this.list , dateSaved:this.time +' / '+this.date}
							
						]);
						
						this.preview_list.html("");
						this.list = [];
						this.title2 = "";	

					};
				}else{
					
					
					$('.noNotes').remove();
					this.saveListNote();
				}
			};

		}
	
	});