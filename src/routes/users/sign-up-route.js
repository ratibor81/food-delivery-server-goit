const qs = require('querystring');
const fs = require('fs');
const path = require('path');

const saveUser = user => {
  const username = JSON.parse(user).username;
  const usersPath = path.join(__dirname, "../../db/users/" + `${username}.json`);
  fs.writeFileSync(usersPath, user);
};

const signUpRoute = (request, response) => {

  if (request.method === 'POST') {
    let body = '';

    request.on('data', function (data) {
      body += data;
    });

    request.on('end', function () {
      const post = qs.parse(body);
      saveUser(post.user);

      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(JSON.stringify({ status: 'success', user: JSON.parse(post.user)}));
      response.end();

    });

  }
};

module.exports = signUpRoute;
