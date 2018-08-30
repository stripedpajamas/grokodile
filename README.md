# grokodile

#### get your code/website publicly accessible while developing

use case: developing a website and you want someone to be able to watch your progress live.

## install / setup
to run in your project:
```bash
$ npx grokodile
```

the default config runs a local dev server on port 3000 and builds your project with `npm run build`. it assumes your build script puts files to be served in the directory `./build`.

you can override any of these settings by creating a config file for your project by creating a `.grokodile.json` file.

(optionally, you could name the file anything and tell `grokodile` with the `--config <file>` option.)

### config options
| option | description | default |
|--------|-------------|---------|
|port|the port the local dev server will listen on|3000|
|build|the command `grokodile` should run to build your project|`npm run build`|
|path|the path to serve (where the built files are)|`./dist`|
|httpServer|enable/disable the local dev http server|`true`|

### sample config file
this sample config file uses parcel for the builder and doesn't enable `grokodile`'s built-in http server because parcel automatically starts one on port 1234 (note we specify the port even though the http server is disabled, because it is needed for ngrok).
```json
{
  "build": "parcel",
  "httpServer": false, 
  "port": 1234
}
```

## what's happening
- start a local http server that serves static files
- connect ngrok so the server is accessible on the internet
- run your build script (which should be set up to watch files and rebuild)

## license
MIT