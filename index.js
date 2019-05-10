const path = require("path");
const Koa = require("koa");
const static = require("koa-static");
const httpProxyMiddleware = require("http-proxy-middleware");
const koaConnect = require("koa2-connect");

const app = new Koa();

app.use(static(path.join(__dirname, "dist")));

const proxy = function(context, options) {
  if (typeof options === "string") {
    options = {
      target: options
    };
  }
  return async function(ctx, next) {
    await koaConnect(httpProxyMiddleware(context, options))(ctx, next);
  };
};

// proxy config
const proxyTable = {
  "/3rd": {
    target: "http://www.tuling123.com/openapi/api",
    changeOrigin: true,
    pathRewrite: {
      "^/3rd": ""
    }
  },
  "/api": {
    target: "http://114.116.138.139:8081", // remember to change this to your ip address
    changeOrigin: true
    // pathRewrite: {
    //   '^/api': ''
    // }
  }
};

Object.keys(proxyTable).map(context => {
  const options = proxyTable[context];
  app.use(proxy(context, options));
});

const port = process.env.PORT || 8888;

app.listen(port, () => {
  console.log(`Koa app listening at ${port}...`);
});
