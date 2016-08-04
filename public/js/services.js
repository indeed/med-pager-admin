
var app = angular.module('moc-admin.services', []);

app.factory('timeService', function() {
    return {
        parseUNIX: function(stamp) {
            return Date.parse(stamp);
        }
    }
});

app.filter('objFilter', function() {
    return function(items, search) {
        var result = {};
        if (search.query) {
            angular.forEach(items, function(value, key) {
                if (value[search.param].toUpperCase().indexOf(search.query.toUpperCase()) > -1) {
                    result[key] = value;
                }
            });
            return result;
        } else {
            return items;
        }
    }
});
