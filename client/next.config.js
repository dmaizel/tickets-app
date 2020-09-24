module.exports = {
  weppackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
