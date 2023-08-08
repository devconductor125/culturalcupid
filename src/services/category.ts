import prisma from "../db";
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subCategoriesRelation: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    categories.forEach((category) => {
      category.subCategoriesRelation.sort((a, b) => a.order - b.order);
    });

    res.send({ data: categories });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getCategory = async (req, res, next) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: req.params.categoryId,
      },
      include: {
        subCategoriesRelation: true,
      },
    });
    res.send({ data: category });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getPostCategories = async (req, res, next) => {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: req.params.categoryId,
      },
      include: {
        Post: true,
      },
    });
    res.send({ data: category });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// export const deleteCommentWithChildren = async(req,res, next) => {
//     const children = await prisma.category.findMany({
//       where: {

//       },
//     });

//     for (const child of children) {
//       await deleteCommentWithChildren(prisma, child);
//     }

//     await prisma.comment.delete({
//       where: {
//         id: node.id,
//       },
//     });
//   }

export const createCategory = async (req, res, next) => {
  try {
    // Find the maximum existing order
    const maxOrderCategory = await prisma.category.findFirst({
      orderBy: {
        order: "desc",
      },
    });

    // If it's the first category, order will be 0, otherwise it will be one greater than the current max
    const newOrder = maxOrderCategory ? maxOrderCategory.order + 1 : 0;

    const category = await prisma.category.create({
      data: {
        name: req.body.name,
        order: newOrder,
      },
    });

    res.send({ data: category });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const editCategory = async (req, res, next) => {
  try {
    const newOrder = req.body.order;
    const categoryToUpdate = await prisma.category.findUnique({
      where: {
        id: req.params.categoryId,
      },
    });

    if (!categoryToUpdate) throw new Error("Category not found");

    const oldOrder = categoryToUpdate.order;
    const swapCategory = await prisma.category.findFirst({
      where: {
        order: newOrder,
      },
    });
    if (swapCategory) {
      await prisma.category.update({
        where: {
          id: swapCategory.id,
        },
        data: {
          order: oldOrder,
        },
      });
    }
    const category = await prisma.category.update({
      where: {
        id: req.params.categoryId,
      },
      data: {
        name: req.body.name,
        order: newOrder,
      },
    });

    res.send({ data: category });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

async function deleteCategoryCascade(categoryId) {
  const subCategories = await prisma.category.findMany({
    where: {
      subCategoryId: categoryId,
    },
  });

  for (const subCategory of subCategories) {
    await deleteCategoryCascade(subCategory.id);
  }

  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
}

export const deleteCategory = async (req, res, next) => {
  try {
    await deleteCategoryCascade(req.params.categoryId);
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const createSubCategory = async (req, res, next) => {
  try {
    const maxOrderSubCategory = await prisma.category.findFirst({
      where: {
        subCategoryId: req.body.categoryId,
      },
      orderBy: {
        order: "desc",
      },
    });

    const newOrder = maxOrderSubCategory ? maxOrderSubCategory.order + 1 : 0;

    const category = await prisma.category.create({
      data: {
        name: req.body.name,
        order: newOrder,
        subCategory: {
          connect: {
            id: req.body.categoryId,
          },
        },
      },
    });

    res.send({ data: category });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
