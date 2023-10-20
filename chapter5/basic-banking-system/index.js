const express = require('express');
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config()
const port = process.env.port || 3000;
const router = require('./routers');
const swaggerUi = require('swagger-ui-express');
const swaggerJson = require('./openapi.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ strict: false }));
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use('/api/v1', router);

app.listen(port, () => {
   console.log(`Server is running at port ${port}`);
})