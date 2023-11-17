require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes");

app.use(express.json({ strict: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1", router);

// Main page
app.use("/", (req, res) => {
  return res.status(200).json({
    success: "Ok",
    statusCode: "200",
    message: "Your API url is ready to use. Please access in /api/v1",
    author: "Wahyu Widodo",
    doc: `${req.protocol}://${req.headers.host}/api/v1/documentation`,
  });
});

app.listen(port, () => {
  console.log(`Server is runing at port ${port}`);
});
