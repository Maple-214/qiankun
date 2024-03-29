const path = require('path')
const fs = require('fs');
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const useTailwind = fs.existsSync(
  path.join(resolveApp('.'), 'tailwind.config.js')
);
const isEnvDevelopment = process.env.APP_ENV === 'development'
const isEnvProduction = process.env.APP_ENV === 'production'
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
      // options: paths.publicUrlOrPath.startsWith('.')
      //   ? { publicPath: '../../' }
      //   : {},
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          ident: 'postcss',
          config: false,
          plugins: !useTailwind
            ? [
              'postcss-flexbugs-fixes',
              [
                'postcss-preset-env',
                {
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                },
              ],
              'postcss-normalize',
            ]
            : [
              'tailwindcss',
              'postcss-flexbugs-fixes',
              [
                'postcss-preset-env',
                {
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                },
              ],
            ],
        },
        // sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        sourceMap: isEnvDevelopment ? true : false,

      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: {
          sourceMap: isEnvDevelopment ? true : false,
          root: resolveApp('src'),
        },
      },
      {
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: true,
        },
      }
    );
  }
  return loaders;
};
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/bundle.[contenthash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my react',
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new WebpackBar(),
    new CleanWebpackPlugin()
  ].filter(Boolean),
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|ts|jsx|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              },
            },
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              // sourceMap: isEnvProduction
              //   ? shouldUseSourceMap
              //   : isEnvDevelopment,
              sourceMap: isEnvDevelopment ? true : false,
              modules: {
                mode: 'icss',
              },
            }),
            sideEffects: true,
          },
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              // sourceMap: isEnvProduction
              //   ? shouldUseSourceMap
              //   : isEnvDevelopment,
              sourceMap: isEnvDevelopment ? true : false,
              modules: {
                mode: 'local',
                // getLocalIdent: getCSSModuleLocalIdent,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            }),
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                // sourceMap: isEnvProduction
                //   ? shouldUseSourceMap
                //   : isEnvDevelopment,
                sourceMap: isEnvDevelopment ? true : false,
                modules: {
                  mode: 'icss',
                },
              },
              'sass-loader'
            ),
            sideEffects: true,
          },
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                // sourceMap: isEnvProduction
                //   ? shouldUseSourceMap
                //   : isEnvDevelopment,
                sourceMap: isEnvDevelopment ? true : false,
                modules: {
                  mode: 'local',
                  // getLocalIdent: getCSSModuleLocalIdent,
                  localIdentName: '[local]--[hash:base64:5]',
                },
              },
              'sass-loader'
            ),
          },
        ].filter(Boolean)
      }

    ]
  }
}
