const { usersModel } = require("../models");
const utils = require("../utils");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await usersModel.create({
      data: {
        email: email,
        password: await utils.encryptPassword(password),
      },
    });

    return res.status(201).json({
      error: false,
      message: "Account successful registered",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await usersModel.findFirst({
      where: {
        email: email,
      },
    });

    if (!findUser) {
      return res.status(404).json({
        error: "User not exists",
      });
    }

    if (bcrypt.compareSync(password, findUser.password)) {
      const token = jwt.sign({ id: findUser.id }, process.env.SECRET_KEY, {
        expiresIn: "6h",
      });

      return res.status(200).json({
        error: false,
        message: "Login successfully.",
        data: { token },
      });
    }

    return res.status(403).json({
      error: "Invalid credentials",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const allUsers = async (req, res) => {
  try {
    const data = await usersModel.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.status(201).json({
      error: false,
      message: "Load data successful",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const findUser = await usersModel.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!findUser) {
      return res.status(403).json({
        error: true,
        message: `User with email ${userEmail} not registered.`,
      });
    }

    const encrypt = await utils.encryptPassword(userEmail);

    await usersModel.update({
      data: {
        resetPasswordToken: encrypt,
      },
      where: {
        id: findUser.id,
      },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: "system@gmail.com",
      to: userEmail,
      subject: "Reset Password",
      html: `<p>Reset Password <a href="http://localhost:3000/set-password/${encrypt}">Click Here</a></p>`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: true,
          message: err,
        });
      }

      return res.status(200).json({
        error: false,
        message: "Successful send link reset password",
      });
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error,
    });
  }
};

const setPassword = async (req, res) => {
  try {
    const findUser = await usersModel.findFirst({
      where: {
        resetPasswordToken: req.body.key,
      },
    });

    if (!findUser) {
      return res.render("error");
    }

    await usersModel.update({
      data: {
        password: await utils.encryptPassword(req.body.password),
        resetPasswordToken: null,
      },
      where: {
        id: findUser.id,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Password successful change",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

module.exports = {
  register,
  login,
  allUsers,
  resetPassword,
  setPassword,
};
