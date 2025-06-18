const path = require('path')

module.exports = {
    entry: {
        pedidos: './public/js/pedidos.js',
        adicionarPedido: '/public/js/adicionarPedido.js',
        editarPedido: '/public/js/editarPedido.js',
        itensPedido: '/public/js/itensPedido.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: '[name].bundle.js',
        clean: true
    },
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
            name: 'vendor'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}