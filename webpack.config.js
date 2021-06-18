const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development", 
    // IT_ File Javascript di entrata pre-compilato. | EN_ Pre-compiled entry Javascript file.
    entry: {
        index: './src/scripts/index.js',
    },
    // IT_ Mappe di origine a supporto del mode development. | EN_ Source maps to help mode development.
    devtool: 'inline-source-map',
    //IT_ Aggiunta di dev server. | EN_ Dev server.
    devServer: {
        contentBase: './dist',
    },
    plugins: [
        // EN_ Generate an HTML file.
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: path.resolve(__dirname, "src", "index.html"),
        }),
    ],
    // IT_ Cartella di output per i file compilati e nome del file Javascript. | EN_ Output folder for compiled files and Javascript filename.
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            // EN_ Loader -> js babel.
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                generator: { filename: 'scripts/[name][ext]' }
            },
            // EN_ Loader -> CSS + SCSS.
            {
                test: /\.s[ac]ss$/,
                use: [
                    // IT_ Crea i nodi style dal JS. | EN_ Creates `style` nodes from JS strings.
                    "style-loader",
                    // IT_ Traduce CSS in CommonJS + generazione di mappe sorgente. | EN_ Translates CSS into CommonJS + generation of source maps.
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    // IT_ Compila Sass to CSS + generazione di mappe sorgente. | EN_ Compiles Sass to CSS + generation of source maps.
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
                generator: { filename: 'css/[name][ext]' }
            },
            // EN_ Loader -> fonts.
            {
                test: /\.(woff|woff2)$/,
                type: 'asset/resource',
                generator: { filename: 'fonts/[name][ext]' }
            },
            // EN_ Loader -> images.
            {
                test: /\.(jpg|png|svg|ico|webp)$/,
                type: 'asset',
                generator: { filename: 'img/[name][ext]' }
            },
            // EN_ Loader -> html.
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }
        ]
    }
}