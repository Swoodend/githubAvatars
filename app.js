var request = require('request');
var fs = require('fs');

var username = process.argv[2];
var repo = process.argv[3];

var options = {
  url: 'https://api.github.com/repos/' + username + '/' + repo + '/contributors',
  headers: {
    'User-Agent': 'Swoodend'
  }
};

function parseGithubData(username, repo, callback){
  request(options, function(err, res, body){
    var dataObj = JSON.parse(body);
    callback(dataObj);
  });
};

function getURLArray(obj){
  var URLS = [];

  for (var i = 0; i < obj.length; i++){
    URLS.push(obj[i].avatar_url);
  }
  streamToDir(URLS);
};

function streamToDir(urlArray, directory){
  //sept 7 2016 work from here...-sW 
  console.log(urlArray);
};


// fs.stat('./avatars', function(err, stats){
//   if (stats && !err){
//     var dataObj = parseGithubData(username, repo, getURLArray);

//   } else if (!stats && err.errno === -2) {
//     //make the dir then do business logic
//     fs.mkdirSync('./avatars');
//   } else {
//     //pray to god
//     console.log(err);
//   }
// });

parseGithubData(username, repo, getURLArray);
