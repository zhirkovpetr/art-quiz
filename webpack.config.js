const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');


const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 8080,
    }
};

module.exports = ({ develop }) => ({
    mode: develop ? 'development' : 'production',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        assetModuleFilename: '[file]'
    },
    module: {
        rules: [
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {minimize: false}
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "sass-resources-loader",
                        options: {
                            resources: [
                                'src/styles/variables.scss',
                            ]
                        }
                    }
                ]
            },

        ],

    },
    performance: {
        hints: false
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new CopyPlugin({
            patterns: [{
                from: '**/*',
                context: path.resolve(__dirname, './src'),
                globOptions: {
                    ignore: [
                        '**/*.js',
                        '**/*.ts',
                        '**/*.scss',
                        '**/*.sass',
                        '**/*.html',
                    ],
                },
                noErrorOnMissing: true,
                force: true,
            }],
        }),
        new CleanWebpackPlugin(),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }],
                ]
            }})
    ],
    ...devServer(develop),
});

