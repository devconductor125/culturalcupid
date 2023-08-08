import prisma from "../db";

export const getuploadsInfo = async (req, res) => {
  const uploads = await prisma.uploads.findFirst();
  res.status(200).json(uploads);
};

export const updateuploadsInfo = async (req, res) => {
  const uploads = await prisma.uploads.findFirst();
  const updateduploads = await prisma.uploads.update({
    where: { id: uploads.id },
    data: req.body,
  });
  res.status(201).json(updateduploads);
};

export const createDefaultuploads = async (req, res) => {
  const storage = await prisma.uploads.create({
    data: req.body,
  });
  res.status(201).json(storage);
};
