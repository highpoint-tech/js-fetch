# v1.0.0
* Add function to post raw, non-JSON content.
* Only parse JSON if response declares it to be JSON. Otherwise return body as
  text.

# v0.1.3
* Support IScript functions other than `IScript_Main`

# v0.1.2
* Fix CSRF cookie name

# v0.1.1
* Automatically add `postDataBin=y` to JSON requests (if it's not already there)

# v0.1.0
* Initial release
