var email = "uo.pom.elective@gmail.com";
var config = {
    apiKey: "AIzaSyCHVnGF3d_VLrRdP0mcZklVb72YGwGXhTc",
    authDomain: "medpager.firebaseapp.com",
    databaseURL: "https://medpager.firebaseio.com",
    storageBucket: "firebase-medpager.appspot.com",
};

firebase.initializeApp(config);

var app = angular.module("moc-admin", ["moc-admin.services", "firebase"])

app.controller("mainCtrl", function($scope, $firebaseObject, $firebaseAuth, dataService) {
    $scope.data = {};
    var ref = firebase.database().ref();

    $scope.errormsg = null;
    $scope.authenticate = function(password) {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(data) {
            $scope.errormsg = null;
        }, function(error) {
            $scope.errormsg = error.message;
            $scope.$apply();
        });
    };

    firebase.auth().onAuthStateChanged(function (user) {
        if (firebase.auth().currentUser && firebase.auth().currentUser.email == email) {
            $scope.auth = true;
        } else {
            $scope.auth = false;
            $scope.data = {};
        }
    });

    $scope.signOut = function() {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            $scope.authPassword = null;
        }, function(error) {
            // An error happened.
        });
    };

    function loadResponses() {
        $scope.data.$loaded(function(data){
            $scope.responses = dataService.parseResponses(data)
            $scope.starred = dataService.parseStarred(data)
            var file = "";
            for (var i in $scope.responses) {
                line = "";
                for (var j in $scope.responses[i]) {
                    line += $scope.responses[i][j] + ","
                }
                file += line.slice(0, -1) + "\n";
            }            
            exportCSV(file, "ok.csv");
            
        });
    }

    $scope.delete = function(parent, key) {
        delete parent[key];
    };

    $scope.save = function() {
        $scope.data.$save();
    };

    firebase.auth().onAuthStateChanged(function (user) {
        if (firebase.auth().currentUser && firebase.auth().currentUser.email == email) {
            $scope.auth = true;
            $scope.data = $firebaseObject(ref);
            loadResponses();
        } else {
            $scope.auth = false;
            $scope.data = {};
        }
    });

    function exportCSV(text, name) {
        var a = document.getElementById("export-csv");
        var file = new Blob([text], {type: 'text/plain'});
        a.href = URL.createObjectURL(file);
        a.download = name;
    }
});
