import prisma from "../db";
import { sendEmail } from "../utils/smtp";

export const createNewMessage = async (req, res, next) => {
  try {
    const message = await prisma.message.create({
      data: {
        content: req.body.content,
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
      },
    });

    const senderMessages = await getNumberOfUserMessages(req.body.senderId);
    const receiverMessages = await getNumberOfUserMessages(req.body.receiverId);

    const isFirstMessageSender = senderMessages <= 1;
    const isFirstMessageReceiver = receiverMessages <= 1;

    if (isFirstMessageSender) {
      ``;
      const sender = await prisma.user.findUnique({
        where: { id: req.body.senderId },
      });
      sendEmail(
        sender.email,
        `You've got a message!`,
        `Hello ${sender.name}, you've got a message! Go back to Corner Stone to check that out!`
      );
    }

    if (isFirstMessageReceiver) {
      const receiver = await prisma.user.findUnique({
        where: { id: req.body.receiverId },
      });
      sendEmail(
        receiver.email,
        `You've got a message!`,
        `Hello ${receiver.name}, you've got a message! Go back to Corner Stone to check that out!`
      );
    }

    res.json({ data: message });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

const getNumberOfUserMessages = async (userId) => {
  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
  });

  return messages.length;
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            AND: [
              { senderId: req.params.user1Id },
              { receiverId: req.params.user2Id },
            ],
          },
          {
            AND: [
              { senderId: req.params.user2Id },
              { receiverId: req.params.user1Id },
            ],
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400);
    next(error);
  }
};
export const getMessagesByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sender: true,
        receiver: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const processedMessages = messages.map((message) => {
      const isSender = message.senderId === userId;

      const userDetails = isSender ? message.receiver : message.sender;

      return { ...message, user: userDetails };
    });

    res.status(200).json(processedMessages);
  } catch (error) {
    res.status(400);
    next(error);
  }
};
