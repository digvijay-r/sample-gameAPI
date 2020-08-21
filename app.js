const express = require('express');
require('./src/db/mongoose.js');
const systemConfig = require('./src/configs/systemConfig.json')
const apiRouter = require('./src/routes/index.js');
const app = express();
const port = process.env.PORT || systemConfig.serverPort;


app.use(express.json());
app.use(apiRouter);


app.listen(port, () => {
    console.log('Server is up on port ' + port);
})