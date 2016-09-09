var request = require('request');

var user = process.argv[2];
var repo = process.argv[3];

var urlAndHeader = {
  url: 'https://api.github.com/repos/' + user + '/' + repo + '/contributors',
  headers: {
    'User-Agent': 'Swoodend'
  }
};

var starredRepoHeader = {
  url: 'https://api.github.com/users/' + user + '/starred',
  headers: {
    'User-Agent': 'Swoodend'
  }
}

function getAllContributors(owner, repo){
  var contributors = [];

  request(urlAndHeader, function(err, res, data){
    var contributors = JSON.parse(data);
    getStarredRepos(contributors);
  });
};

function getStarredRepos(users){
  var usersAndStars = {};
  request(starredRepoHeader, function(err, res, data){
    //for user in users 
    //  for repos in starred    
    //    usersAndStars[user] = {repo: num of stars?}

    //will have to pass in num stars
    }
  });
};


getAllContributors(user, repo);