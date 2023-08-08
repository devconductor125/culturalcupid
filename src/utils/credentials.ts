import prisma from "../db";

// Storage
export const getStorageInfo = async () => {
  const storage = await prisma.storage.findFirst();
  return storage;
};

//Smtp
export const getSmtpInfo = async () => {
  const smtp = await prisma.sMTP.findFirst();
  return smtp;
};

//Payments
export const getPaymentsInfo = async () => {
  const payments = await prisma.payments.findFirst();
  return payments;
};
