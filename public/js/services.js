
var app = angular.module('moc-admin.services', []);

app.factory('timeService', function() {
    return {
        parseUNIX: function(stamp) {
            return Date.parse(stamp);
        }
    }
});

app.factory('dataService', function() {
    return {
        parseResponses: function(data) {
            var formatted = [];
            var questions = data.answers;
            for (q in questions) {
                for (u in questions[q]) {
                    formatted.push({
                        question: q,
                        sID: u,
                        answer: questions[q][u].answer,
                        followup: questions[q][u].choice,
                        correct: questions[q][u].isCorrect,
                        followupCorrect: questions[q][u].isChoiceCorrect,
                        isDaily: questions[q][u].isDaily,
                        time: (new Date(questions[q][u].time)).toString().substring(4, 24),
                    });
                }
            }
            return formatted;
        },
        parseStarred: function(data) {
            var formatted = [];
            for (var i in data.starred) {
                var ins = {
                    id: i,
                    question: data.pagerQuestions[i].question,
                    starred: data.starred[i]
                };
                formatted.push(ins);
            }
            return formatted;
        }
    }
});


app.filter('objFilter', function() {
    return function(items, search) {
        var result = {};
        if (search.query) {
            result = [];
            angular.forEach(items, function(value, key) {
                if (value.toUpperCase().indexOf(search.query.toUpperCase()) > -1) {
                    result.push(value);
                }
            });
            return result;
        } else {
            return items;
        }
    }
});
