var path = require('path');
var friends = require('../data/friends.js');
var parser = require('body-parser');

module.exports = function (app) {
    //parser is used to help us receive/send json. 
    app.use(parser.json());
    app.use(parser.urlencoded({ extended: true }));
    app.use(parser.text());
    //Routing for the API
    app.post("/api/friends", function (req, res) {
        //Takes the request.body, logs it then pushes it to the friendsArr.
        var answers = req.body;
        console.log(answers);
        friends.push(answers);
        //Creats a variable called score that holds the scorevalues of the most recently submitted request. 
        var score = answers.score;
        var scoreLength = score.length;
        //Variable that will later be used to hold the submitted score value so that we can compare to the score of others. 
        var totalSubmittedScore = 0;
        // For loop that totals up the value in the submitted score array. 
        for (var i = 0; i < scoreLength; i++) {
            var scoreInt = parseInt(score[i]);
            totalSubmittedScore += parseInt(scoreInt);
        }
        //Stores the friends name that has the lowest score. 
        var friendLowestName;
        //Stores the lowest value. Starts at 50 since it cant be higher than 50. 
        var friendLowestScore = 50;
        //Stores the picture of the person with the lowest scoreDiff. 
        var friendLowestPic;
        //Creates the comparison between the most recently submitted friend and all others to determine who is a match. 
        for (var i = 0; i < friends.length - 1; i++) {
            var friendArrName = friends[i].Name;
            var friendArrScore = friends[i].score;
            var friendPic = friends[i].photo
            var friendScore = 0;
            for (var j = 0; j < friendArrScore.length; j++) {
                friendScore += parseInt(friends[i].score[j]);
            }
            var friendDiff = parseInt(totalSubmittedScore - friendScore);
            friendDiff = Math.abs(friendDiff);
            friendLowestScore = Math.abs(friendLowestScore);
            if (friendDiff < friendLowestScore) {
                friendLowestScore = friendDiff;
                friendLowestName = friendArrName;
                friendLowestPic = friendPic;
            }
        }
        res.send("<h4>Check Out Your New BFF</h4><img src ='" + friendLowestPic + "'><p>Your friend match is " + friendLowestName + ". You differed by " + friendLowestScore + " points.</p>");
    });

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    })
}