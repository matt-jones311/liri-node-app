require('dotenv').config();

// Node builtin modules
var fs = require('fs');

// Third-part imports (npm modules)
var Spotify = require('node-spotify-api');
var request = require('request');
var Twitter = require('twitter');

// My modules
var keys = require('./keys');

function command(cmd, arg) {
    switch (cmd) {
        case 'spotify-this-song':
            return spotifyThisSong(arg);

        case 'my-tweets':
            return myTweets(arg);

        case 'movie-this':
            return movieThis(arg);

        case 'do-what-it-says':
            return doWhatItSays();

        default:
            console.error('Invalid Command!');
    }
}
// spotify ====================================================================
function spotifyThisSong(arg) {
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: arg || 'The Sign', limit: 1 }, function(err, data) {
        if (err) return console.error(err);

        var track = data.tracks.items[0];
        console.log(`Song: ${track.name}`);
        console.log(`Artist: ${track.artists[0].name}`);
        console.log(`Album: ${track.album.name}`);
        console.log(`Preview: ${track.preview_url}`);
    });
}

// twitter ====================================================================
function myTweets(arg) {
    var twitter = new Twitter(keys.twitter);

    var params = {
        screen_name: arg,
        count: 20
    };

    twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log('=============================================');
            console.log('Here are the most recent tweets');
            for (var i = 0; i < tweets.length; i++) {
                console.log('_____________________________________________');
                console.log('Tweeted on: ' + tweets[i].created_at);
                console.log(tweets[i].text);
            }
        }
    });
}

// omdb =======================================================================
function movieThis(arg) {
    if (!arg) {
        console.log("If you haven't watched \"Mr. Nobody,\" then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!");
    }

    request(`http://www.omdbapi.com/?apikey=trilogy&t=${arg || "Mr. Nobody"}`, function(err, response) {
        if (err) return console.error(err);

        var body = JSON.parse(response.body);
        var { Actors, Country, imdbRating, Language, Plot, Ratings, Title, Year } = body;

        console.log(`Title: ${Title}`);
        console.log(`Plot: ${Plot}`)
        console.log(`Actors: ${Actors}`);
        console.log(`Year: ${Year}`);
        console.log(`IMDB Rating: ${imdbRating}`);
        console.log(`Rotten Tomatoes Rating: ${Ratings[1].Value}`);
        console.log(`Country: ${Country}`);
        console.log(`Language: ${Language}`);
    });
}

// do what it says ============================================================
function doWhatItSays() {
    fs.readFile('./random.txt', 'utf8', function(err, data) {
        if (err) return console.error(err);

        var parsed = data.split(',');
        var cmd = parsed[0].trim();
        var arg = parsed[1].trim();
        command(cmd, arg);
    });
}

command(process.argv[2], process.argv[3]);
