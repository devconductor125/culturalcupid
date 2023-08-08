import prisma from "../db";

export const getkeysInfo = async (req, res) => {
  const keys = await prisma.keys.findFirst();
  res.status(200).json(keys);
};

export const updatekeysInfo = async (req, res) => {
  const keys = await prisma.keys.findFirst();
  const updatedkeys = await prisma.keys.update({
    where: { id: keys.id },
    data: req.body,
  });
  res.status(201).json(updatedkeys);
};

export const createDefaultkeys = async (req, res) => {
  const storage = await prisma.keys.create({
    data: req.body,
  });
  res.status(201).json(storage);
};
