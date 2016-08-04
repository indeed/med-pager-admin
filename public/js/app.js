
var config = {
    apiKey: "AIzaSyCHVnGF3d_VLrRdP0mcZklVb72YGwGXhTc",
    authDomain: "medpager.firebaseapp.com",
    databaseURL: "https://medpager.firebaseio.com",
    storageBucket: "firebase-medpager.appspot.com",
};

firebase.initializeApp(config);

var app = angular.module("moc-admin", ["moc-admin.services", "firebase"])

app.controller("mainCtrl", function($scope, $firebaseObject, $firebaseAuth) {
    $scope.data = {};
    var ref = firebase.database().ref();

    $scope.authenticate = function(password) {
        firebase.auth().signInWithEmailAndPassword("uo.pom.elective@gmail.com", password).then(function(data) {
            $scope.auth = true;
            $(".alert-success").fadeIn();
            $scope.data = $firebaseObject(ref);
        }, function(error) {
            $(".alert-danger").fadeIn();
        });
    };

    $scope.authenticate('POMelective15');

    $scope.signOut = function() {
        firebase.auth().signOut().then(function() {
            $scope.auth = false;
            $scope.data = {};
            // Sign-out successful.
        }, function(error) {
            // An error happened.
        });
    };

    $scope.delete = function(parent, key) {
        delete parent[key];
    };

    $scope.save = function() {
        $scope.data.$save();
    };

});
