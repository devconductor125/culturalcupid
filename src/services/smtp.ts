import prisma from "../db";

export const getSmtpInfo = async (req, res) => {
  const storage = await prisma.sMTP.findFirst();
  res.status(200).json(storage);
};

export const updateSmtpInfo = async (req, res) => {
  const storage = await prisma.sMTP.findFirst();
  const updatedStorage = await prisma.sMTP.update({
    where: { id: storage.id },
    data: req.body,
  });
  res.status(201).json(updatedStorage);
};

export const createDefaultSmtp = async (req, res) => {
  const storage = await prisma.sMTP.create({
    data: req.body,
  });
  res.status(201).json(storage);
};
