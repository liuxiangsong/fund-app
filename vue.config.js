module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    },
  },
  chainWebpack: (config) => {
    config.plugin('html')
      .tap((args) => {
        // eslint-disable-next-line no-param-reassign
        args[0].title = '基金小助手';
        return args;
      });
  },
};
