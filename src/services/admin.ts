import prisma from "../db";
import { createJWT, hashPassword } from "../modules/auth";

//This service os temporary meant to be used one time in order to create a user with senior admin previliges
export const createSeniorAdmin = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        email: req.body.email,
        isAdmin: true,
        adminType: "SENIOR",
        address: req.body.address,
        name: req.body.name,
        telephone: req.body.telephone,
        status: "ACTIVE",
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const suspendUser = async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      status: "SUSPENDED",
    },
  });
  res.send(user);
};
export const activateUser = async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      status: "ACTIVE",
    },
  });
  res.send(user);
};

export const createOrUpdateStaticContent = async (req, res, next) => {
  try {
    const {
      siteName,
      siteSlogan,
      logo,
      favicon,
      maintainence,
      defaultLanguage,
      dateFormat,
      background,
    } = req.body;

    const existingContent = await prisma.staticContent.findFirst();

    let content;

    if (existingContent) {
      content = await prisma.staticContent.update({
        where: {
          id: existingContent.id,
        },
        data: {
          siteName,
          siteSlogan,
          logo,
          favicon,
          maintainence,
          defaultLanguage,
          dateFormat,
          background,
        },
      });
    } else {
      content = await prisma.staticContent.create({
        data: {
          siteName,
          siteSlogan,
          logo,
          favicon,
          maintainence,
          defaultLanguage,
          dateFormat,
          background,
        },
      });
    }

    res.json({ content });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getStaticContent = async (req, res, next) => {
  try {
    const content = await prisma.staticContent.findFirst();

    if (!content) {
      return res.status(404).send({ message: "No website content found" });
    }

    res.json(content);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    if (!user) return res.status(404).send({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(user);
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await prisma.post.deleteMany({
      where: { userId: req.params.id },
    });

    const user = await prisma.user.delete({
      where: { id: req.params.id },
    });

    res.json({ user });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await prisma.user.findMany({});
    const users = allUsers.filter(
      (user) =>
        !user.isAdmin || (user.isAdmin && !(user.adminType === "SENIOR"))
    );
    res.json(users);
  } catch (error) {
    res.status(400);
    next(error);
  }
};
