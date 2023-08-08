import prisma from "../db";

export const createTransaction = async (userId, amount, type, description) => {
  try {
    const transaction = await prisma.transaction.create({
      data: {
        userId,
        amount,
        type,
        description,
      },
    });
    return transaction;
  } catch (error) {
    console.error("Error creating transaction: ", error);
    throw error;
  }
};

export const getTransactionsByUserId = async (req, res, next) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error getting transactions: ", error);
    next(error);
  }
};
