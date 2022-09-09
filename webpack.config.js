const path = require('path');
//process.env.NODE_ENV = 'producton'; 베포할때 환경 설정도 바꿔줘야함
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { isBooleanObject } = require('util/types');

module.exports = {
    name : 'wordrelay-setting',
    mode : 'development', // 실서비스 : production
    devtool: 'eval', // 빠르게 돌리겠다.
    resolve: {
        extensions : ['.js','.jsx',]
    }, // webpack이 확장자를 찾아서 entry에 추가해줌
    entry: {
        app:['./client'],
    }, // 입력

    module:{
        rules:[{
            test:/\.jsx?/,// 정규 표현식 js,jsx파일 적용대상으로 설정
            loader:'babel-loader',// 무슨 규칙인지
            options: {
                presets:['@babel/preset-env','@babel/preset-react'],
                plugins:[
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel'
            ],
        },
      }],
    },
    plugins: [
        new RefreshWebpackPlugin()
    ],
    output:{
        path: path.join(__dirname,'dist'),
        filename: 'app.js',
        publicPath: '/dist',
    },// 출력
    devServer: {
        devMiddleware: { publicPath: '/dist' }, // 나중에 webpack에서 저장해주는 위치
        static: { directory: path.resolve(__dirname) }, //실제 파일
        hot: true,
    },
};
