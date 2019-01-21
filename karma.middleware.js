/* eslint-disable func-names, no-underscore-dangle */
const queryString = require('query-string');

module.exports = function() {
  return function(request, response) {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });
    request.on('end', () => {
      const query = queryString.parse(request._parsedUrl.query);
      const params = queryString.parse(body);

      if ('status' in query) {
        response.setHeader('Content-Type', 'application/json');
        response.setHeader('X-Status-Code', query.status);
      }

      let responseText;
      switch (request._parsedUrl.pathname) {
        case '/json':
          responseText = JSON.stringify({
            message: query.message || params.message || 'test'
          });
          break;
        case '/postJSON':
          responseText = JSON.stringify({
            message: body ? JSON.parse(body).message : 'no-body'
          });
          break;
        default:
      }

      response.end(responseText);
    });
  };
};
