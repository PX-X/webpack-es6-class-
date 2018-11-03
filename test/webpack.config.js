const path=require('path');
const webpack=require('webpack');

module.exports={
    mode:"development",
    entry:{
        
        'class':'./src/2.js',
        "css":"./src/css.js"
    },
    output:{
        // 打包的文件存放的路径
        path:path.resolve('dist/'),
        // 文件名
        filename:'[name].build.js'
    },
    // 热更新
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    // 创建服务器
    devServer:{
        // 设置静态资源
        contentBase:path.resolve('static'),
        // 设置端口号
        port:8088,
        hot:true,
        // 历史回退

        historyApiFallback:true
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']

            },
            {
                // 检测文件名
                test:/\.js$/,
                // 排除node_module下面的模块，告诉webpack不要打包进去
                exclude:/node_modules/,
                // 使用的loader
                // use:'babel-loader'
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env']
                    }
                }
            }
        ]
    }

}