# vue3-demo

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```npm run serve```

### Compiles and minifies for production

```npm run build```

### Lints and fixes files

```npm run lint```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 其它

- 添加electron插件：`vue add vue-cli-plugin-electron-builder`
- 安装nedb-promises：`yarn add nedb-promises`

### 问题

1. 设置electron淘宝镜像:```npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/```
2. remote.app.getPath('userData') 报错，要在vue.config.js中配置以下内容

    ``` js
    pluginOptions: {
            electronBuilder: {
                nodeIntegration: true
            }
        },
    ```

3. nedb的数据没有存在单独的文件里，而是存在indexedDb中
   // <https://stackoverflow.com/questions/52900791/nedb-with-vue-electron-couldnt-save-local-db-file>
   ：在渲染进程中创建的数据文件默认使用indexedDb，主线程中创建的数据文件则会生成文件。
