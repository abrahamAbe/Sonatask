//navigation controller
angular.module('sonatask.controllers', []).
    controller('HomeCtrl', [function() { 
}]);

//user api key
app.run(function(user) {
	user.init({ appId: '544071800e360' });	
});

//tasks main controller
function tasksController($scope, $http) {

	//setting current date for datepicker minimal date
	$scope.d = new Date();
	$scope.curr_date = $scope.d.getDate();
	$scope.curr_month = $scope.d.getMonth() + 1;
	$scope.curr_year = $scope.d.getFullYear();
	$scope.currentDate = $scope.curr_month + "-" + $scope.curr_date + "-" + $scope.curr_year;
  	
  	//task holder
  	$scope.tasks = [];

  	//loads task list 
	$scope.loadTasks = function() { 
      
	     $http({
	     	method : 'GET',url : 'https://api.parse.com/1/classes/Task', 
	     	headers: { 'X-Parse-Application-Id':'Y7RQ6RzZNxYzIwdGEY0Uv6OCYX6jQQRsFqAjLzwk', 'X-Parse-REST-API-Key':'UY0EXabwrdT8F5Ly5R2X0ZUbiAOllSGXEN4gnnso'}})
	        .success(function(data, status) {
	            $scope.tasks = data.results;
	        });     
     };
     
     //loads task list when app starts  
    $scope.loadTasks(); 
     
     //checks task expiration date
	$scope.checkCurrentDate = function(task) {
		
		if(task.expirationDate == $scope.currentDate){
			
			return "1";
		} 
		
		else{
			
			return "0";
		}	
	};  
     
	//adds new task
	$scope.addTask = function() {  
		
		if ($scope.newTaskText != "" && $scope.newTaskText != null){
		
			$http({
			    method: 'POST',
			    url: 'https://api.parse.com/1/classes/Task',
			    data: {content: $scope.newTaskText, owner: $scope.user.first_name, completed: "0", expirationDate: "Due date goes here"},
			    headers: {'X-Parse-Application-Id':'Y7RQ6RzZNxYzIwdGEY0Uv6OCYX6jQQRsFqAjLzwk', 'X-Parse-REST-API-Key':'UY0EXabwrdT8F5Ly5R2X0ZUbiAOllSGXEN4gnnso', 'Content-Type': 'application/json'}})
			    .success(function(data, status) {
		            $scope.loadTasks(); 
			});
			
			$( "#errorMsg" ).css( "visibility", "hidden" );
		}
		
		else{
			$( "#errorMsg" ).css( "visibility", "visible" );
		}
		
         $scope.newTaskText = "";		        
     };
        
    //saves changes made to task
    $scope.saveChanges = function(task) {
    	
    	$scope.taskValueHolder = task.content; 
    	
    	if (task.content != "" && task.content != null){
    	
	    	$http({
			    method: 'PUT',
			    url: 'https://api.parse.com/1/classes/Task/' + task.objectId,
			    data: {content: task.content, expirationDate:  task.expirationDate},
			    headers: {'X-Parse-Application-Id':'Y7RQ6RzZNxYzIwdGEY0Uv6OCYX6jQQRsFqAjLzwk', 'X-Parse-REST-API-Key':'UY0EXabwrdT8F5Ly5R2X0ZUbiAOllSGXEN4gnnso', 'Content-Type': 'application/json'}
			});
			
			$( "#errorMsg" ).css( "visibility", "hidden" );
		}
		
		else{
			$( "#errorMsg" ).css( "visibility", "visible" );
			$scope.newTaskText = $scope.taskValueHolder;
			 
			 //refreshes task list
			 setTimeout(function () {
		       $scope.loadTasks();  
		       $( "#errorMsg" ).css( "visibility", "hidden" ); 
		    }, 1500);
		}
		      
     };
         
     //changes task status
     $scope.changeStatus = function(task) {
     	
     	var taskStatus = "0";
     	
     	if(task.completed == "0"){
     		taskStatus = "1";	
     	}
     	
     	$http({
		    method: 'PUT',
		    url: 'https://api.parse.com/1/classes/Task/' + task.objectId,
		    data: {completed: taskStatus},
		    headers: {'Content-Type': 'application/json', 'X-Parse-Application-Id':'Y7RQ6RzZNxYzIwdGEY0Uv6OCYX6jQQRsFqAjLzwk', 'X-Parse-REST-API-Key':'UY0EXabwrdT8F5Ly5R2X0ZUbiAOllSGXEN4gnnso'}})
		    .success(function(data, status) {
	            $scope.loadTasks(); 
		});
			        
     };
         
     //deletes task
     $scope.deleteTask = function(task) { 
     	
     	$http({
		    method: 'DELETE',
		    url: 'https://api.parse.com/1/classes/Task/' + task.objectId,
		    headers: {'Content-Type': 'application/json', 'X-Parse-Application-Id':'Y7RQ6RzZNxYzIwdGEY0Uv6OCYX6jQQRsFqAjLzwk', 'X-Parse-REST-API-Key':'UY0EXabwrdT8F5Ly5R2X0ZUbiAOllSGXEN4gnnso'}})
		     .success(function(data, status) {
	            $scope.loadTasks(); 
		}); 
	         
     };
			
};