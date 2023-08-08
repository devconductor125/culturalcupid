import prisma from "../db";

export const getAllPlans = async (req, res, next) => {
  try {
    const plans = await prisma.plan.findMany();
    res.send({ data: plans });
  } catch (error) {
    next(error);
  }
};

export const createPlan = async (req, res, next) => {
  try {
    const plan = await prisma.plan.create({
      data: {
        name: req.body.name,
        featuedPostNumber: parseInt(req.body.featuedPostNumber),
        postNumber: parseInt(req.body.postNumber),
        price: parseFloat(req.body.price),
        browseAndSaveAds: req.body.browseAndSaveAds,
        messageAdvertisers: req.body.messageAdvertisers,
        chatWithAdvertisers: req.body.chatWithAdvertisers,
        createGroupChats: req.body.createGroupChats,
        postVideoUrls: req.body.postVideoUrls,
        uploadVideos: req.body.uploadVideos,
        featuredMember: req.body.featuredMember,
      },
    });
    res.send({ data: plan });
  } catch (error) {
    next(error);
  }
};

export const editPlan = async (req, res, next) => {
  try {
    const plan = await prisma.plan.update({
      data: {
        name: req.body.name,
        postNumber: parseFloat(req.body.postNumber),
        featuedPostNumber: parseFloat(req.body.featuedPostNumber),
        price: parseFloat(req.body.price),
        browseAndSaveAds: req.body.browseAndSaveAds,
        messageAdvertisers: req.body.messageAdvertisers,
        chatWithAdvertisers: req.body.chatWithAdvertisers,
        createGroupChats: req.body.createGroupChats,
        postVideoUrls: req.body.postVideoUrls,
        uploadVideos: req.body.uploadVideos,
        featuredMember: req.body.featuredMember,
        price90Days: parseFloat(req.body.price90Days),
        priceAnnual: parseFloat(req.body.priceAnnual),
        discountPercent: parseFloat(req.body.discountPercent),
        discountedPrice: parseFloat(req.body.discountedPrice),
      },
      where: {
        id: req.body.id,
      },
    });
    res.send({ data: plan });
  } catch (error) {
    next(error);
  }
};

export const getPlan = async (req, res, next) => {
  try {
    const plan = await prisma.plan.findFirst({
      where: {
        name: req.params.planName,
      },
    });
    res.send({ data: plan });
  } catch (error) {
    next(error);
  }
};

export const deletePlan = async (req, res, next) => {
  try {
    const plan = await prisma.plan.delete({
      where: {
        name: req.params.planName,
      },
    });
    res.send({ data: plan });
  } catch (error) {
    next(error);
  }
};
