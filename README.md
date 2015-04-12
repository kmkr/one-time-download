# one-time-download
Node web server that allow one-time downloads for files in current directory

## Usage

Running `node one-time-download.js` will expose files in current directory for download. The `one-time-download.js` script will be excluded, if present. Downloads by index or by exact file name.

If you want to expose only some files, supply a regexp as first argument:

`node one-time-download.js RE.*

E.g.

When files `fuu-foo.js` and `README.md`

`README.md` will be available for one-time-download via the first hit on any of these URLs

- http://localhost:4322/0
- http://localhost:4322/0.md
- http://localhost:4322/0.any
- http://localhost:4322/README.md

Similar for `fuu-foo.js`:

- http://localhost:4322/1
- http://localhost:4322/1.js
- http://localhost:4322/1.any
- http://localhost:4322/fuu-foo.js

