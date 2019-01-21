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
          try {
            const jsonBody = JSON.parse(body); // if parsing body does not throw, we're posting a JSON
            responseText = JSON.stringify({ message: jsonBody.message });
          } catch (_err) {
            responseText = JSON.stringify({
              message: query.message || params.message || 'test'
            });
          }
          break;
        default:
      }

      response.end(responseText);
    });
  };
};
