const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Create Transaction
const createTransaction = async (req, res) => {
  let { source_account_id, destination_account_id, amount } = req.body;
  source_account_id = parseInt(source_account_id);
  destination_account_id = parseInt(destination_account_id);
  amount = parseInt(amount);

  try {
    const saveTransaction = await prisma.bank_account_transactions.create({
      data: {
        amount: amount,
        source_account: { connect: { id: source_account_id } },
        destination_account: {
          connect: { id: destination_account_id },
        },
      },
    });

    const updateSource = await prisma.bank_accounts.update({
      where: { id: source_account_id },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    const updateDestination = await prisma.bank_accounts.update({
      where: { id: destination_account_id },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return res.status(201).json({
      error: false,
      message: "Create Transaction Successfully",
      data: {
        source_account_id,
        destination_account_id,
        amount,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

// Get All Transaction
const getAllTransaction = async (req, res) => {
  try {
    const transactions = await prisma.bank_account_transactions.findMany({
      include: {
        source_account: true,
        destination_account: true,
      },
    });

    const response = transactions.map((transaction) => {
      return {
        transaction_id: parseInt(transaction.id),
        source_account: parseInt(transaction.source_account_id),
        destination_account: parseInt(transaction.destination_account_id),
        amount: parseInt(transaction.amount),
      }
    });

    return res.status(201).json({
      error: false,
      message: "Load transaction successfully",
      data: response,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({
      error: true, 
      message: "Internal server error."
    })
  }
};

// Get Transaction by ID
const getTransactionById = async (req, res) => {
  try {
    const transaction = await prisma.bank_account_transactions.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    });

    const response = {
      transaction_id: parseInt(transaction.id),
      source_account: parseInt(transaction.source_account_id),
      destination_account: parseInt(transaction.destination_account_id),
      amount: parseInt(transaction.amount),
    };

    return res.status(201).json({
      error: false,
      message: "Load transaction successfully",
      data: response,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({
      error: true,
      message: "Internal server error."
    })
  }
}

module.exports = {
  createTransaction,
  getAllTransaction,
  getTransactionById
};
