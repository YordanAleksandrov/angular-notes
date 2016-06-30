'use strict';
angular.
	module('notes').run(function($rootScope) {
			$rootScope.notes = [{
				
				  "head": "Hello",
				  "message": "Some text",
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
			
			var self = this;
			self.header_text = 'Notes App';
			self.notes = $rootScope.notes;

		}
	
	});