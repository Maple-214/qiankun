const path = require('path')

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                exclude: /node_modules/,
                rules: [
                    {
                        test: /\.(ts|tsx|js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                            },
                        },
                    },
                ],
                // use:[
                //     {
                //         loader:'babel-loader',
                //         options:{
                //             presets:['@babel/preset-env'],
                //         }
                //     }
                // ]
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3333,
    },
}