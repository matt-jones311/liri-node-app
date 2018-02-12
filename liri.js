require("dotenv").config();

var keys = require("./keys");

var Spotify = require('node-spotify-api');

function command(cmd, arg){
	switch(cmd){

	case 'spotify-this-song':
		return spotifyThisSong(arg);

	case 'my-tweets':
		return myTweets(arg);

	case 'movie-this':
		return movieThis(arg);

	case 'do-what-it-says':
		return doWhatItSays();

		default:
			console.error('Invalid Command!')
	}
}
//spotify===============================================================================


function spotifyThisSong(arg) {

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: arg, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0]);
    });

}

//twitter==============================================================================

function myTweets(arg){
	var fs = require("fs");

	var twitterKey = require("./keys.js")//gets Twitter keys from "keys.js"

	var Twitter = require("twitter");

	var client = new Twitter(twitterKey.twitterKeys);

	var params = { screen_name: value, count: 20 };
	client.get("stasus/user_timeline", params, function(error, tweets, response){
		if (!error){

			console.log("=============================================");
			console.log("Here are the most recent tweets");

			for (var i = 0; i < tweets.length; i++){

				console.log("_____________________________________________");
				console.log("Tweeted on: " + tweets.[i].created_at);
				console.log(tweets[i].text);
			}
		}

	});
}

function movieThis(arg){

}

function doWhatItSays(){


}

command(process.argv[2], process.argv[3]);

// `my-tweets`

// `spotify-this-song`

//  `movie-this`

//  `do-what-it-says`