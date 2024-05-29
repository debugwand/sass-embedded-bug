const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssLoaderOptions = {
  // Allow css-loader to resolve @import because the sass-loader
  // does not successfully resolve files with a .css extension.
  import: true,
  // Disable Webpack from resolving url() because we do not
  // currently use this functionality.
  url: false,
};

const extract = new MiniCssExtractPlugin();

module.exports = {
  mode: "development",
  
  plugins: [extract],
  entry: () => {
    return {
		'styles': './src/main.scss'
	}
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Extracts CSS into separate, non-JS files
          // https://github.com/webpack-contrib/mini-css-extract-plugin
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // Add support for handling .css files
          // https://github.com/webpack-contrib/css-loader
          {
            loader: require.resolve("css-loader"),
            options: cssLoaderOptions,
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass-embedded"),
              sassOptions: {
                includePaths: ['node_modules', 'node_modules/@somenamespace'], // this line seems to make no difference, sass still works without it, sass-embedded still fails with it
                outputStyle: 'compressed',
				
              }
            },
          },
        ],
      },
    ],
  },
};