var request = require('request');

var user = process.argv[2];
var repo = process.argv[3];

var contributorsHeader = {
  url: 'https://api.github.com/repos/' + user + '/' + repo + '/contributors',
  headers: {
    'User-Agent': 'Swoodend',
    'Authorization': 'token 0ec7adb54087d7dbeacf002638b04e4685f61e3f'
  },
  json: true
};


function hitApi(url, user){
  return new Promise(function (resolve, reject){
        request(url, function(err, res, data){
          (! err) ? resolve(data) : reject(data);
    });
  });
};

function parseUsernames(users, i){
  return new Promise(function(resolve, reject){
    resolve(users[i].login);
  });
};

function getContributorsInfo(username, repo){
  hitApi(contributorsHeader)
    .then(function(contributorsInfo){
      pullUsernames(contributorsInfo);
    });
};

function pullUsernames(users){
  var usernames = [];
  for (user in users){
    usernames.push(parseUsernames(users, user));
  };
  Promise.all(usernames)
    .then(function(usernames){
      getStarredRepos(usernames);
    });
};

function getNameAndStarInfo(repo){
  return new Promise(function(resolve, reject){
    resolve({
            name : repo.full_name,
            count: repo.stargazers_count
    });
  });
};


function getStars(username){
  var promises = [];
  var url = 'https://api.github.com/users/' + username + '/starred'
  var header = {url: url, headers:{'User-Agent':'Swoodend', 'Authorization': 'token 0ec7adb54087d7dbeacf002638b04e4685f61e3f'}, json: true };

  request(header, function(err, res, usersStarredRepos){
    for (repo in usersStarredRepos){
      promises.push(getNameAndStarInfo(usersStarredRepos[repo]));
    };
    Promise.all(promises).then(collectTopFive);
  });
};

function getStarredRepos(usernames){
  for (user in usernames){
    (getStars(usernames[user]));
  };
};

function sortByStars(starData){

};
function collectTopFive(repoStarsData){
  // This is going to have to be split into a seperate function which returns a promise.
};

getContributorsInfo(user, repo);