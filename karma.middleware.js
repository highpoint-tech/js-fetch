const queryString = require('query-string');

// eslint-disable-next-line func-names
module.exports = function() {
  // eslint-disable-next-line func-names
  return function({ _parsedUrl: url }, response) {
    const query = queryString.parse(url.query);

    if ('status' in query) {
      response.setHeader('Content-Type', 'application/json');
      response.setHeader('X-Status-Code', query.status);
    }

    let responseText;

    switch (url.pathname) {
      case '/json':
        responseText = JSON.stringify({ message: query.message || 'test' });
        break;
      default:
    }

    response.end(responseText);
  };
};
