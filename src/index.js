const baseURI = (
  document.baseURI || document.querySelector('base').href
).replace('IScript_Main', 'IScript_');

const isFramed = (() => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
})();

const getCookieValue = name => {
  const match = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return match ? match.pop() : '';
};

const checkResponse = async response => {
  const isOK =
    !response.headers.has('x-status-code') ||
    parseInt(response.headers.get('x-status-code'), 10) < 300;
  if (response.ok && isOK) return response.json();
  throw await response.json();
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
    parent.postMessage('is-active', '*'); // Let parent know child is active
  }
  return fetch(url.indexOf('http') === 0 ? url : baseURI + url, {
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
      'X-CSRF-Token': getCookieValue('CSRFToken'),
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

const doJSONPost = (url, { headers = {}, ...otherArgs } = {}) =>
  doPost(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...otherArgs
  });

export const json = async (...args) => {
  const response = await doFetch(...args);
  return checkResponse(response);
};

export const postForm = async (...args) => {
  const response = await doFormPost(...args);
  return checkResponse(response);
};

export const postJSON = async (...args) => {
  const response = await doJSONPost(...args);
  return checkResponse(response);
};
