# js-fetch

This is a small library to make using JavaScript's `fetch` a bit easier. It 
provides some utility functions to handle common request types.

The library assumes that responses will be in JSON format. If a response is not
going to be in that format, then you can still use the library, but most of its
usefulness will be gone.

Also included are some HighPoint-specific requirements like CSRF support and
`postMessage`s to `parent` informing it that the user is actively using `child`.

## Installation

`yarn add @highpoint/js-fetch`

## Usage

GET request

```javascript
import { json } from '@highpoint/js-fetch';

(async () => {
  try {
    const jsonResponse = await json('https://api.example.com');
    console.log(jsonResponse);
  } catch (e) {
    // Handle the exception
  }
})();
```

POST Form

```javascript
import { postForm } from '@highpoint/js-fetch';

(async () => {
  try {
    const jsonResponse = await postForm('https://api.example.com', {
      body: 'value1=1&value2=2'
    });
    console.log(jsonResponse);
  } catch (e) {
    // Handle the exception
  }
})();

```

POST JSON

```javascript
import { postJSON } from '@highpoint/js-fetch';

(async () => {
  try {
    const jsonResponse = await postJSON('https://api.example.com', {
      body: JSON.stringify({
        value1: 1,
        value2: 2
      })
    });
    console.log(jsonResponse);
  } catch (e) {
    // Handle the exception
  }
})();

```
