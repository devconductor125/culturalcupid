import prisma from "../db";

export const getStorageInfo = async (req, res) => {
  const storage = await prisma.storage.findFirst();
  res.status(200).json(storage);
};

export const updateStorageInfo = async (req, res) => {
  const storage = await prisma.storage.findFirst();
  const updatedStorage = await prisma.storage.update({
    where: { id: storage.id },
    data: req.body,
  });
  res.status(201).json(updatedStorage);
};

export const createDefaultStorage = async (req, res) => {
  const storage = await prisma.storage.create({
    data: req.body,
  });
  res.status(201).json(storage);
};
