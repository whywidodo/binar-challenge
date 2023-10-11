const express = require('express');
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config()
const port = process.env.port || 3000;
const router = require('./routers');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ strict: false }));
app.use('/api/v1', router);

app.listen(port, () => {
   console.log(`Server is running at port ${port}`);
})