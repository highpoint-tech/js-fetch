const { highpoint: { dataURI } = {} } = self.window;

const getBaseURI = () =>
  dataURI ||
  (document.baseURI || document.querySelector('base').href).replace(
    /IScript_.*/,
    'IScript_'
  );

const isFramed = (() => {
  try {
    if (self.window === undefined) return false;
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
})();

// @link https://stackoverflow.com/a/25490531/719817
const getCookieValue = name => {
  const match = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return match ? match.pop() : '';
};

const getDefaultHeaders = () => {
  if (self.document === undefined) return undefined;
  return {
    'X-CSRF-Token': getCookieValue('CSRFCookie') // Send CSRF token
  };
};

const isOffline = () => 'onLine' in navigator && !navigator.onLine;

const checkResponse = async response => {
  const isOK =
    !response.headers.has('x-status-code') ||
    parseInt(response.headers.get('x-status-code'), 10) < 300;
  if (response.headers.get('content-type').indexOf('application/json') > -1) {
    if (response.ok && isOK) {
      const responseJson = await response.json();
      if (responseJson?.error) throw new Error(responseJson.error);
      return responseJson;
    }
    throw await response.json();
  }
  const responseText = await response.text();
  if (response.ok && isOK) {
    const authFailed = responseText.indexOf('Authorization Error') > -1;
    if (authFailed) throw new Error('Authorization Error');
    return responseText;
  }
  throw responseText;
};

const doFetch = (
  url,
  {
    method = 'GET',
    credentials = 'same-origin',
    accept = 'application/json',
    headers = {},
    ...otherArgs
  } = {}
) => {
  if (isFramed) {
    window.parent.postMessage({ type: 'is-active' }, '*'); // Let parent know child is active
  }
  if (isOffline()) throw new Error('Network Error. Are you offline?');
  return fetch(url.indexOf('http') === 0 ? url : getBaseURI() + url, {
    method,
    credentials,
    headers: { accept, ...headers },
    ...otherArgs
  });
};

const doPost = (url, { method = 'POST', headers = {}, ...otherArgs } = {}) =>
  doFetch(url, {
    method,
    headers: {
      ...getDefaultHeaders(),
      ...headers
    },
    ...otherArgs
  });

const doFormPost = (url, { headers = {}, ...otherArgs } = {}) =>
  doPost(url, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      ...headers
    },
    ...otherArgs
  });

// Set postDataBin if it has not already been set
const getBinaryURL = url => {
  if (/[?&]postDataBin=/.test(url)) return url;
  const separator = url.indexOf('?') === -1 ? '?' : '&';
  return `${url + separator}postDataBin=y`;
};

const doJSONPost = (url, { body, headers = {}, ...otherArgs } = {}) =>
  doPost(getBinaryURL(url), {
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
    ...otherArgs
  });

const json = async (...args) => {
  const response = await doFetch(...args);
  const responseBody = await checkResponse(response);
  if (
    !response.headers.get('content-type').includes('application/json') &&
    args[1]?.accept.includes('application/json')
  )
    throw new Error('Response not in expected JSON format');
  return responseBody;
};

const postForm = async (...args) => {
  const response = await doFormPost(...args);
  return checkResponse(response);
};

const postJSON = async (...args) => {
  const response = await doJSONPost(...args);
  return checkResponse(response);
};

const postRaw = async (url, args) => {
  const response = await doPost(getBinaryURL(url), args);
  return checkResponse(response);
};

export { getBaseURI, getDefaultHeaders, json, postForm, postJSON, postRaw };
