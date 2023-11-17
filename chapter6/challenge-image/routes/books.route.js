const express = require("express");
const router = express.Router();
const controller = require("../controllers/books.controller");
const multerLib = require("multer")();

router.post("/create", multerLib.single("image"), controller.createBook);
router.get("/list", controller.allBook);
router.get("/detail/:bookId", controller.detailBook);
router.put("/update/:bookId", controller.updateBook);
router.delete("/delete/:bookId", controller.deleteBook);

module.exports = router;
