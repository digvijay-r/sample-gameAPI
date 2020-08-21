const express = require('express');
const apiRouter = require('./src/routes/index.js');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(apiRouter);


app.listen(port, () => {
    console.log('Server is up on port ' + port);
})