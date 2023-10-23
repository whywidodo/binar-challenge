const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const cryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(5);

  return bcrypt.hash(password, salt);
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, identity_number, identity_type, address } =
    req.body;

  // Another Version for Create Users
  try {
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: await cryptPassword(password),
        profile: {
          create: {
            identity_number: identity_number,
            identity_type: identity_type,
            address: address,
          },
        },
      },
    });

    return res.json({
      error: false,
      message: "Register user successfully.",
      data: user,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }

  // Another Version for Create Users
  // try {
  //   const user = await prisma.users.create({
  //     data: {
  //       name: name,
  //       email: email,
  //       password: await cryptPassword(password),
  //     },
  //   });

  //   const profile = await prisma.profiles.create({
  //     data: {
  //       identity_number: identity_number,
  //       identity_type: identity_type,
  //       address: address,
  //       user: {
  //         connect: { id: user.id },
  //       },
  //     },
  //   });

  //   return res.json({
  //     error: false,
  //     message: "Register user successfully ",
  //     data: { user, profile },
  //   });
  // } catch (error) {
  //   console.log(`Error: ${error}`);
  //   return res.status(500).json({
  //     error: true,
  //     message: "Internal server error.",
  //   });
  // }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await prisma.users.findFirst({
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
      const token = jwt.sign({ id: findUser.id }, "secret_key", {
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
  } catch (error) {}
};

// Get Profile
const getProfile = async (req, res) => {
  const user = await prisma.users.findUnique({
    where: {
      id: res.user.id,
    },
  });

  return res.status(200).json({
    error: false,
    message: "Load successfully.",
    data: user,
  });
};

// Get All User
const getAllUser = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json({
      error: false,
      message: "Load successfully.",
      data: users,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        profile: true,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Load successfully",
      data: user,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

// Delete User by ID
const delUserById = async (req, res) => {
  try {
    const user = await prisma.users.delete({
      where: {
        id: Number(req.params.id),
      },
      include: {
        profile: true,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Delete successfully",
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getAllUser,
  getUserById,
  delUserById,
};
