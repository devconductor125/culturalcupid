import prisma from "../db";

export const getpaymentsInfo = async (req, res) => {
  const payments = await prisma.payments.findFirst();
  res.status(200).json(payments);
};

export const updatePaymentsInfo = async (req, res) => {
  const payments = await prisma.payments.findFirst();
  const updatedPayments = await prisma.payments.update({
    where: { id: payments.id },
    data: req.body,
  });
  res.status(201).json(updatedPayments);
};

export const createDefaultPayments = async (req, res) => {
  const storage = await prisma.payments.create({
    data: req.body,
  });
  res.status(201).json(storage);
};
