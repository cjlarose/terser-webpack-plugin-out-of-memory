# terser-webpack-plugin-out-of-memory

This project reliably reproduces `JavaScript heap out of memory` errors in `terser-webpack-plugin`.

To run:

```
npm install
npm run build
```

A workaround that works is to increase the size of Node's old space:

```
node --max-old-space-size=4096 node_modules/.bin/webpack
```

The issue is described in https://github.com/webpack-contrib/terser-webpack-plugin/issues/143

My fix is proposed in https://github.com/webpack-contrib/terser-webpack-plugin/pull/206
