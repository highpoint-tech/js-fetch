# v4.2.0

- Revert 4.1.0, use postRaw instead

# v4.1.0

- Allow non-JSON return if 'Accept' request header is not 'application/json'

# v4.0.0

### POTENTIALLY BREAKING CHANGE

- On each fetch, the postMessage call will pass an object instead of a string (prevents PT_COMMON error)

# v3.1.0

- Added functionality to override the `<base>` url of the page with the bootstrap field `window.highpoint.dataURI`

# v2.1.0

- postJSON now accepts _also_ an object as the body

# v2.0.1

- Retrieve `baseURI` before each request so if `<base href>` changes, the change
  will take effect.

# v2.0.0

- Export ES modules instead of CommonJS

# v1.1.0

- Throw exception when device is offline

# v1.0.1

- Throw exception on authorization errors

# v1.0.0

- Add function to post raw, non-JSON content.
- Only parse JSON if response declares it to be JSON. Otherwise return body as
  text.

# v0.1.3

- Support IScript functions other than `IScript_Main`

# v0.1.2

- Fix CSRF cookie name

# v0.1.1

- Automatically add `postDataBin=y` to JSON requests (if it's not already there)

# v0.1.0

- Initial release
