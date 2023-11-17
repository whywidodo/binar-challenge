const express = require("express");
const router = express.Router();
const bookRoute = require("./books.route");
const swaggerUi = require("swagger-ui-express");
const swaggerJson = require("../openapi.json");

router.get("/", (req, res) => {
  return res.status(200).json({
    success: "Ok",
    statusCode: "200",
    message: "Your API url is ready to use. Please access in /api/v1",
    author: "Wahyu Widodo",
  });
});
router.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerJson));
router.use("/books", bookRoute);

module.exports = router;
