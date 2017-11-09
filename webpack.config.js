var path = require('path');
var Webpack = require('webpack');

module.exports = {
  entry: './src/app',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/js/')
  },
  devtool: "source-map",
  module: {
    loaders: [
        {
          test: /\.ts$/, 
          loader: 'ts-loader',
          include: path.resolve(__dirname, 'src')
        }
    ]
  },
  plugins: [
    new Webpack.ProvidePlugin({
      $: "jquery", 
      jQuery: "jquery"
    }),
    function () {
      this.plugin('watch-run',
          function(watching, callback) {
              console.log('Begin compile at ' + new Date());
              callback();
          });
    }
  ],
  resolve: {
      extensions: [".webpack.js", ".web.js", ".js", ".ts"],
      alias: {
          'backbone': 'backbone.marionette/node_modules/backbone/backbone',
          'handlebars': 'handlebars/dist/handlebars',
          'marionette': 'backbone.marionette/lib/backbone.marionette',
          'backbone-radio': 'backbone.radio/src/backbone.radio'
      }
  }
};