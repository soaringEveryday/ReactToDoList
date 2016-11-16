var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'app/component/App.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    externals:{
        'react': 'React'
    },
    module: {
        loaders: [
            //babel
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015','react']
                }
            },
            //url-loader
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192' // 这里的 limit=8192 表示用 base64 编码 <= ８K 的图像
            },
            //css-loader, style-loader
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            //scss-loader
            {
                test:/\.scss$/,
                loader: "style!css!sass"
            }
        ]
    }
};