## 简介

node.js的koa搭建静态服务器

fork：<https://github.com/heartsuit/devcloud-static-server>

原博客：<https://heartsuit.github.io/2019/04/20/Huawei-DevCloud-Static-Resource-Node.html>



华为云部署前，**先fork到自己的仓库，之后务必修改index.js第32行服务器地址为自己的服务器地址**

需要先手动clone到指定目录下，华为云shell命令直接clone会失败（我也不知道为什么）

```
git clone https://github.com/Andy1621/front-server.git ./opt/front-server
```

```javascript
const proxyTable = {
  "/3rd": {
    target: "http://www.tuling123.com/openapi/api",
    changeOrigin: true,
    pathRewrite: {
      "^/3rd": ""
    }
  },
  "/api": {
    target: "http://114.116.138.139:8666", // remember to change this to your ip address
    changeOrigin: true
    // pathRewrite: {
    //   '^/api': ''
    // }
  }
};
```

