import { languages_list } from "../../languages";
import prisma from "../db";

export const insertDefaultLangs = async (req, res) => {
  try {
    languages_list?.forEach(async (language) => {
      await prisma.language.create({
        data: {
          name: language.name,
          code: language.code,
        },
      });
    });
    const langauges = await prisma.language.findMany();
    res.status(200).json(langauges);
  } catch (error) {
    console.log(error);
  }
};

export const getAllLanguages = async (req, res) => {
  try {
    const langauges = await prisma.language.findMany();
    res.status(200).json(langauges);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllLanguages = async (req, res) => {
  try {
    const langauges = await prisma.language.deleteMany();
    res.status(200).json(langauges);
  } catch (error) {
    console.log(error);
  }
};

export const deleteLanguagebyId = async (req, res) => {
  try {
    const langauge = await prisma.language.delete({
      where: { id: req.params.id },
    });
    res.status(200).json(langauge);
  } catch (error) {
    console.log(error);
  }
};

export const addLanguage = async (req, res) => {
  try {
    const langauge = await prisma.language.create({
      data: {
        name: req.body.name,
        code: req.body.code,
      },
    });
    res.status(200).json(langauge);
  } catch (error) {
    console.log(error);
  }
};
