(function() {
angular.module('notes').service('tabSelection',tabSelection);
	tabSelection.$inject =['$http'];
	
	function tabSelection ($http){
		
		this.tab = 1;

		this.selectTab = function(setTab){
			
			this.tab = setTab;
			
		};
		
		this.isSelected = function(checkTab){
			
			return this.tab === checkTab;
			
		};
		
	};
	
})();