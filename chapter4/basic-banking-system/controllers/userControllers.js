const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, identity_number, identity_type, address } =
    req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });

    const profile = await prisma.profiles.create({
      data: {
        identity_number: identity_number,
        identity_type: identity_type,
        address: address,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return res.json({
      error: false,
      message: "Register user successfully ",
      data: { user, profile },
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({
      error: true,
      message: "Internal server error.",
    });
  }
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
      message: "Load successfully",
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
  getAllUser,
  getUserById,
  delUserById,
};
