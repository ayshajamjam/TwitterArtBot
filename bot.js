var Twit = require('twit'); // Import Twit library
var cronJob = require("cron").CronJob;
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
var request = require('request');
var fs = require('fs');
const request_promise = require('request-promise');
require('dotenv').config();

let art_title = "";
let art_artist = "";
let art_date = "";
let art_img = "";
let art_type = "";

// Chicago Arts Institute API stuff: no api key needed
function getArtwork() {
    let art_id = Math.floor(Math.random()*(117673 - 50 + 1) + 50);
    const api_url = `https://api.artic.edu/api/v1/artworks/${art_id}?fields=id,title,artist_display,date_display,image_id,artwork_type_title`

    const get_data = async api_url => {
        try {
            const response = await fetch(api_url);
            const json = await response.json();
            // console.log(json);
            if(response.ok) {
                art_title = json.data.title;
                art_artist = json.data.artist_display;
                art_date = json.data.date_display;
                art_img = json.config.iiif_url + '/' + json.data.image_id + '/full/843,/0/default.jpg';
                art_type = json.data.artwork_type_title;

                // Download image from art_img (URL)
                // https://stackoverflow.com/questions/12740659/downloading-images-with-node-js
                var download = function (uri, filename, callback) {
                    request.head(uri, function(err, res, body){
                        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                    });
                };
                  
                download(art_img, 'img.png', function(){
                    tweet();
                });
            }
            else {
                // If it does't find a valid art piece then look for another one
                getArtwork();
            }
        } catch (error) {
            console.log(error);
        }
      };
      
    get_data(api_url);
}

// Twitter stuff

var config = require('./config');
const { CronJob } = require('cron');
var T = new Twit(config);

// Post a new tweet
function tweet() {
    new_tweet = 
    `Hi, @sjamaln\nTitle: ${art_title}, ${art_date}\nArtist: ${art_artist}\nType: ${art_type}`

    var params = {encoding: 'base64'}

    var b64 = fs.readFileSync('img.png', params);

    T.post('media/upload', { media_data: b64 }, uploaded);

    function uploaded(err, data, response){
        var id = data.media_id_string;
        var tweet = {
            status: new_tweet,
            media_ids: [id]
        }
        T.post('statuses/update', tweet, function(err, data, response) {
            console.log(data.text)
            console.log("Image Src: " + art_img + "\n");
        })
    }
}

// // Just run at least once befroe CronJob starts
// getArtwork();

// Every day 5pm UTC, 12pm EST
const job = new CronJob("0 0 * * *", () => {
    console.log("Cronjob started.");
    getArtwork();
})

job.start();