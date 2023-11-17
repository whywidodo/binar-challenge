const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routers/router");
const bodyParser = require("body-parser");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ strict: false }));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(router);

app.listen(port, () => console.log(`App is running at PORT ${port}`));
