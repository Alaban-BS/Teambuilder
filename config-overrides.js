const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add polyfills
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "buffer": require.resolve("buffer/"),
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util/"),
    "assert": require.resolve("assert/"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "url": require.resolve("url/"),
    "vm": require.resolve("vm-browserify")
  };
  
  // Add Buffer polyfill to webpack.ProvidePlugin
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  );

  // Development-specific optimizations
  if (env === 'development') {
    // Disable type checking during development
    config.plugins = config.plugins.filter(
      plugin => !(plugin instanceof webpack.WatchIgnorePlugin)
    );
    
    // Reduce the number of files watched
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules/,
      aggregateTimeout: 300,
    };

    // Disable source maps in development for faster builds
    config.devtool = 'eval';
  }

  return config;
}; 