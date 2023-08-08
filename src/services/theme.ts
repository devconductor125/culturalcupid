import prisma from "../db";

export const getthemeInfo = async (req, res) => {
  const theme = await prisma.theme.findFirst();
  res.status(200).json(theme);
};

export const updatethemeInfo = async (req, res) => {
  const theme = await prisma.theme.findFirst();
  const updatedtheme = await prisma.theme.update({
    where: { id: theme.id },
    data: req.body,
  });
  res.status(201).json(updatedtheme);
};

export const createDefaulttheme = async (req, res) => {
  const storage = await prisma.theme.create({
    data: req.body,
  });
  res.status(201).json(storage);
};
