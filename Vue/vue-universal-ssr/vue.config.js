const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';

module.exports = {
    devServer:{
        port:'8080',
        headers: { 'Access-Control-Allow-Origin': '*' }
    },
    configureWebpack: TARGET_NODE ?
    {
        entry: './src/entry-server.js',
        devtool: 'source-map',
        target: 'node',
        output: { libraryTarget: 'commonjs2' },
        externals: nodeExternals({ allowlist: /\.css$/ }),
        plugins: [new VueSSRServerPlugin(), new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }), new webpack.DefinePlugin({ TARGET_NODE })]
    } :
    {
        entry: './src/entry-client.js',
        devtool: 'source-map',
        target: 'web',
        node: false,
        plugins: [new VueSSRClientPlugin(), new webpack.DefinePlugin({ TARGET_NODE })]
    }
}