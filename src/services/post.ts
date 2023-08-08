import prisma from '../db';

export const createPost = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        plan: true,
        Post: {
          where: {
            featured: true,
          },
        },
      },
    });

    if (!user.plan) {
      return res.status(400).send({ message: 'User does not have a plan.' });
    }
    const totalPosts = await prisma.post.count({
      where: {
        userId: req.user.id,
      },
    });
    if (totalPosts >= user.plan.postNumber) {
      return res.status(400).send({ message: 'Post limit exceeded.' });
    }
    if (req.body.featured && user.Post.length >= user.plan.featuedPostNumber) {
      return res.status(400).send({ message: 'Featured post limit exceeded.' });
    }
    const post = await prisma.post.create({
      data: {
        description: req.body.description,
        location: req.body.location,
        title: req.body.title,
        images: req.body.images,
        userId: req.user.id,
        featured: req.body.featured,
        categoryId: req.body.categoryId || null,
        advertiserType: req.body.advertiserType,
        adType: req.body.adType,
        adLanguage: req.body.adLanguage,
        adRegion: req.body.adRegion,
        adCountry: req.body.adCountry,
      },
    });

    res.send({ data: post });
  } catch (error) {
    next(error);
  }
};

export const getUserPost = async (req, res, next) => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: req.body.id,
        userId: req.user.id,
      },
    });

    res.send({ data: post });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const posts = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        Post: true,
      },
    });

    res.send({
      data: posts?.Post?.filter((post) => post?.status === 'ACTIVE'),
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await prisma.post.update({
      data: {
        status: 'DELETED',
      },
      where: {
        id_userId: {
          id: req.body.id,
          userId: req.user.id,
        },
      },
    });

    res.send({ data: post });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await prisma.post.update({
      data: {
        description: req.body.description,
        title: req.body.title,
        images: req.body.images,
        location: req.body.location,
      },
      where: {
        id_userId: {
          id: req.body.id,
          userId: req.user.id,
        },
      },
    });

    res.send({ data: post });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
      },
      where: {
        status: 'ACTIVE',
      },
    });
    res.send({ data: posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getDeletedPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
      },
      where: {
        status: 'DELETED',
      },
    });
    res.send({ data: posts });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const recoverPost = async (req, res, next) => {
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: req.body.id,
      },
      data: {
        status: 'ACTIVE',
      },
    });
    res.status(200).json({ message: 'RECOVERED', data: updatedPost });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const searchPosts = async (req, res, next) => {
  try {
    const {
      adCountry,
      adRegion,
      categoryId,
      adLanguage,
      adType,
      advertiserType,
      type,
      keyword,
    } = req.body;

    let where = {
      status: 'ACTIVE',
      ...(adCountry && { adCountry }),
      ...(adRegion && { adRegion }),
      ...(categoryId && { categoryId }),
      ...(adLanguage && { adLanguage }),
      ...(adType && { adType }),
      ...(advertiserType && { advertiserType }),
      ...(type === 'keyword' &&
        keyword && {
          OR: [
            { title: { contains: keyword } },
            { description: { contains: keyword } },
          ],
        }),
    };

    const posts = await prisma.post.findMany({
      where,
      include: { user: true },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
