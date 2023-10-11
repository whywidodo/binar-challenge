const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create Bank Account
const createAccount = async (req, res) => {
  const account = await prisma.bank_accounts.create({
    data: {
      bank_name: req.body.bank_name,
      bank_account_number: req.body.bank_account_number,
      balance: BigInt(req.body.balance),
      user: {
        connect: { id: parseInt(req.body.user_id) },
      },
    },
  });

  const balanceInt = parseInt(req.body.balance);

  return res.status(201).json({
    error: false,
    message: "Create account successfully",
    data: {
      ...account,
      balance: balanceInt,
    },
  });
};

// Get Bank Account
const getAllAccount = async (req, res) => {
  const account = await prisma.bank_accounts.findMany({
    orderBy: {
      id: "asc",
    },
  });

  const response = account.map((account) => {
    return {
      ...account,
      balance: parseInt(account.balance),
    };
  });

  return res.status(200).json({
    error: false,
    message: "Load successfully",
    data: response,
  });
};

// Get Account by ID
const getAccountById = async (req, res) => {
  const account = await prisma.bank_accounts.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  const response = {
    ...account,
    balance: parseInt(account.balance),
  };

  return res.status(200).json({
    error: false,
    message: "Load successfully",
    data: response,
  });
};

module.exports = {
  createAccount,
  getAllAccount,
  getAccountById,
};
