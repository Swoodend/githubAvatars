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

var userValidationOptions = {
  url: 'https://api.github.com/users/' + username,
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
  streamToDir(URLS, options.url);
};

function streamToDir(urlArray, directory){
  for (var i = 0; i < urlArray.length; i++){
    request(urlArray[i]).pipe(fs.createWriteStream('./avatars/image' + i +'.jpg'));
  }

};

function validateUsername(username){
  request(userValidationOptions, function(err, res, body){
    return res.statusCode;
  });
}

fs.stat('./avatars', function(err, stats){
  if (stats && !err){

    var statusCode = validateUsername();
    (statusCode === 200) ? parseGithubData(username, repo, getURLArray) : console.log('Bad username');

  } else if (err.errno === -4058 || err.errno === -2) {
    //errno seems to changed based on windows(-4058) vs OSX(-2)???
    fs.mkdirSync('./avatars');
    parseGithubData(username, repo, getURLArray);

  } else {
    //pray to god
    console.log(err);
  }
});
