angular.module('sonatask.controllers', []).
    controller('HomeCtrl', [function() { 
}]);

// user api key
app.run(function(user) {
	user.init({ appId: '544071800e360' });	
});

// editable text
app.run(function(editableOptions) {
  editableOptions.theme = 'none'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

function tasksController($scope, $http) {
	
	//shows saveChanges button if task is edited
	$scope.showSaveButton = false;

	$scope.showSaveChanges = function(){
	   $scope.showSaveButton = true;
	       
	};
	
	//setting current date for datepicker minimal date
	$scope.d = new Date();
	$scope.curr_date = $scope.d.getDate();
	$scope.curr_month = $scope.d.getMonth() + 1;
	$scope.curr_year = $scope.d.getFullYear();
	$scope.currentDate = $scope.curr_month + "-" + $scope.curr_date + "-" + $scope.curr_year;
  	
  	//task holder
  	$scope.tasks = [];

  	//loads task list when called  
	$scope.loadTasks = function() { 
      
	     $http({
	     	method : 'GET',url : 'https://api.parse.com/1/classes/Task', 
	     	headers: { 'X-Parse-Application-Id':'Y7RQ6RzZNxYzIwdGEY0Uv6OCYX6jQQRsFqAjLzwk', 'X-Parse-REST-API-Key':'UY0EXabwrdT8F5Ly5R2X0ZUbiAOllSGXEN4gnnso'}})
	        .success(function(data, status) {
	            $scope.tasks = data.results;
	        });     
     };
     
     //checks task expiration date
	$scope.checkCurrentDate = function(task) {
		
		$scope.d = new Date();
		$scope.curr_date = $scope.d.getDate();
		$scope.curr_month = $scope.d.getMonth() + 1;
		$scope.curr_year = $scope.d.getFullYear();
		$scope.currentDate = $scope.curr_month + "-" + $scope.curr_date + "-" + $scope.curr_year;
		
		if(task.expirationDate == $scope.currentDate){
			return "1";
		} 
		
		else{
			return "0";
		}
		
	};  
     
     //loads task list when app starts  
     $scope.loadTasks(); 
     
	//adds new task when called
	$scope.addTask = function() {  
		
		$http({
		    method: 'POST',
		    url: 'https://api.parse.com/1/classes/Task',
		    data: {content: $scope.newTaskText, owner: $scope.user.first_name, completed: "0", expirationDate: "Dead line goes here"},
		    headers: {'X-Parse-Application-Id':'Y7RQ6RzZNxYzIwdGEY0Uv6OCYX6jQQRsFqAjLzwk', 'X-Parse-REST-API-Key':'UY0EXabwrdT8F5Ly5R2X0ZUbiAOllSGXEN4gnnso', 'Content-Type': 'application/json'}
		});
		
		 //refreshes task list
		 setTimeout(function () {
	       $scope.loadTasks();   
	    }, 300);
       
         $scope.newTaskText = "";		        
     };
        
    //saves changes to task when called
    $scope.saveChanges = function(task) { 
    	
    	$http({
		    method: 'PUT',
		    url: 'https://api.parse.com/1/classes/Task/' + task.objectId,
		    data: {content: task.content, expirationDate:  task.expirationDate},
		    headers: {'X-Parse-Application-Id':'Y7RQ6RzZNxYzIwdGEY0Uv6OCYX6jQQRsFqAjLzwk', 'X-Parse-REST-API-Key':'UY0EXabwrdT8F5Ly5R2X0ZUbiAOllSGXEN4gnnso', 'Content-Type': 'application/json'}
		});      
     };
         
     //changes task status when called
     $scope.changeStatus = function(task) {
     	
     	var taskStatus = "0";
     	
     	if(task.completed == "0"){
     		taskStatus = "1";	
     	}
     	
     	$http({
		    method: 'PUT',
		    url: 'https://api.parse.com/1/classes/Task/' + task.objectId,
		    data: {completed: taskStatus},
		    headers: {'Content-Type': 'application/json', 'X-Parse-Application-Id':'Y7RQ6RzZNxYzIwdGEY0Uv6OCYX6jQQRsFqAjLzwk', 'X-Parse-REST-API-Key':'UY0EXabwrdT8F5Ly5R2X0ZUbiAOllSGXEN4gnnso'}
		});
		
        //refreshes task list
		 setTimeout(function () {
	       $scope.loadTasks();   
	    }, 200);
			        
     };
         
     //delets task when called
     $scope.deleteTask = function(task) { $http({
		    method: 'DELETE',
		    url: 'https://api.parse.com/1/classes/Task/' + task.objectId,
		    headers: {'Content-Type': 'application/json', 'X-Parse-Application-Id':'Y7RQ6RzZNxYzIwdGEY0Uv6OCYX6jQQRsFqAjLzwk', 'X-Parse-REST-API-Key':'UY0EXabwrdT8F5Ly5R2X0ZUbiAOllSGXEN4gnnso'}
		});
		
       //refreshes task list
		 setTimeout(function () {
	       $scope.loadTasks();   
	    }, 300);	        
     };
		
};
