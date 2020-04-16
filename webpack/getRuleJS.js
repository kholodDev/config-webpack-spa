const plugins = {
    develop: ['transform-react-remove-prop-types'],
    production: []
}

const getRuleJS = env => {
    return {
        test: /\.(js|jsx)/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                sourceMap: env === 'develop',
                plugins: plugins[env],
            },
        },
    }
}

module.exports = getRuleJS

