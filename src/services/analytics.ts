import prisma from "../db";

export const getAnalyticsInfo = async (req, res) => {
  const analytics = await prisma.analytics.findFirst();
  res.status(200).json(analytics);
};

export const updateanalyticsInfo = async (req, res) => {
  const analytics = await prisma.analytics.findFirst();
  const updatedanalytics = await prisma.analytics.update({
    where: { id: analytics.id },
    data: req.body,
  });
  res.status(201).json(updatedanalytics);
};

export const createDefaultanalytics = async (req, res) => {
  const storage = await prisma.analytics.create({
    data: req.body,
  });
  res.status(201).json(storage);
};
