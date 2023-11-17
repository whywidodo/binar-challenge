const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controller");
const { usersModel } = require("../models");

router.get("/", (req, res) => {
  return res.render("index");
});

router.get("/registrasi-akun", (req, res) => {
  return res.render("registerAccount");
});

router.get("/ganti-password", (req, res) => {
  return res.render("forgotPassword");
});

router.get("/set-password/:key", async (req, res) => {
  try {
    console.log(req.params.key);
    const findData = await usersModel.findFirst({
      where: {
        resetPasswordToken: req.params.key,
      },
    });
    if (!findData) {
      return res.render("error");
    }

    return res.render("setPassword", { user: findData });
  } catch (error) {
    console.log(error);
    return res.render("error");
  }
});

router.post("/api/v1/register", controller.register);
router.post("/api/v1/login", controller.login);
router.post("/api/v1/reset-password", controller.resetPassword);
router.post("/api/v1/set-password", controller.setPassword);
router.get("/api/v1/users/list", controller.allUsers);

module.exports = router;
