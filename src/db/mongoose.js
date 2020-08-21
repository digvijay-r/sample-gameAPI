const mongoose = require('mongoose');
const systemConfig = require('../configs/systemConfig.json');

const connectUrl = 'mongodb://' + systemConfig.dbConfig.host + ':' + systemConfig.dbConfig.port + '/' + systemConfig.dbConfig.dbName;

mongoose.connect(connectUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})