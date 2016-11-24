/**
 * Created by qinfan on 2016/11/24.
 */

var path = require('path');

module.exports = {
    entry:'./entry.js',
    output:{
        path: path.join(__dirname,'dist'),
        filename:'bundle.js'
    },
    resolve:{
        extensions:['','.js','.jsx']
    },
    module:{
        loaders:[
            {test:/\.js|jsx$/,loaders:['babel']}
        ]
    }
};
