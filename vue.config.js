module.exports = {

	publicPath: '/',

	lintOnSave:false,

    devServer: {

    //open:true,
    //host:'localhost',
    //port:8000,

        proxy:{
            '/api':{
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/api':'/mock'
                }
            }
        }
    }

}
