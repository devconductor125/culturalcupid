import { countries_list } from "../../countries";
import prisma from "../db";

export const insertDefaultCountries = async (req, res) => {
  try {
    countries_list?.forEach(async (country) => {
      await prisma.country.create({
        data: {
          name: country.name,
          code: country.code,
        },
      });
    });
    const countries = await prisma.country.findMany();
    res.status(200).json(countries);
  } catch (error) {
    console.log(error);
  }
};

export const getAllCountries = async (req, res) => {
  try {
    const countries = await prisma.country.findMany();
    res.status(200).json(countries);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllCountries = async (req, res) => {
  try {
    const countries = await prisma.country.deleteMany();
    res.status(200).json(countries);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCountrybyId = async (req, res) => {
  try {
    const country = await prisma.country.delete({
      where: { id: req.params.id },
    });
    res.status(200).json(country);
  } catch (error) {
    console.log(error);
  }
};

export const addCountry = async (req, res) => {
  try {
    const country = await prisma.country.create({
      data: {
        name: req.body.name,
        code: req.body.code,
      },
    });
    res.status(200).json(country);
  } catch (error) {
    console.log(error);
  }
};
