angular.module('sonatask.controllers', []).
    controller('HomeCtrl', [function() { 
}]);

// user api key
app.run(function(user) {
	user.init({ appId: '544071800e360' });	
});

// editable text
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

//tasks storage in firebase   
app.constant("FIREBASE_URL", "https://codepen-public.firebaseio.com/firebase1demo/codepen/" );

//task hanlder
function tasksCtrl($scope, $firebase, FIREBASE_URL) {

    // get stored tasks
    var todosRef = new Firebase(FIREBASE_URL);
    $scope.todos = $firebase(todosRef);

    // Update the "completed" status
    $scope.changeStatus   = function (item) {

        // Get the Firebase reference of the item
        var itemRef = new  Firebase(FIREBASE_URL + item.id);

        // Firebase : Update the item
        $firebase(itemRef).$set({
            id: item.id,
            name : item.name,
            completed: !item.completed,
            owner: $scope.user.first_name
        });
	};
    
    // Updates edited info
    $scope.saveChanges   = function (item) {

        // Get the Firebase reference of the item
        var itemRef = new  Firebase(FIREBASE_URL + item.id);

        // Firebase : Update the item
        $firebase(itemRef).$set({
            id: item.id,
            name : item.name,
            completed: item.completed,
            owner: $scope.user.first_name
        });
	 };

    // remove a task
    $scope.removeItem = function (index, item, event) {

       // Avoid wrong removing
       if (item.id == undefined)return;

       // Firebase: Remove item from the list
       $scope.todos.$remove(item.id);
    };

    // add new task
    $scope.addItem  = function () {

        // Create a unique ID
        var timestamp = new Date().valueOf();

        // Get the Firebase reference of the item
        var itemRef = new Firebase(FIREBASE_URL + timestamp);

        $firebase(itemRef).$set({
            id: timestamp,
            name : $scope.todoName,
            completed: false,
            owner: $scope.user.first_name
        });

        $scope.todoName = "";
	};
}
    
