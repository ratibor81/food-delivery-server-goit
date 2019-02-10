const fs = require('fs');
const path = require('path');

const signUpRoute = (request, response) => {

  if (request.method === 'POST') {
    let body = '';

    request.on('data', function (data) {
      body += data;
    });

    request.on('end', function () {
      let post = JSON.parse(body);
      const {username} = post;

      const usersPath = path.join(__dirname, "../../db/users/" + `${username}.json`);
      fs.writeFileSync(usersPath, body);
      //saveUser(post);

      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(JSON.stringify({ status: 'success', user: post}));
      response.end();

    });

  }
};

module.exports = signUpRoute;
