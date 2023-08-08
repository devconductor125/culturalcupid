// import { countries_list } from "../../countries";
// import prisma from "../db";

// export const getAllPriviliges = async (req, res) => {
//   try {
//     const pvs = await prisma.juniorAdminPriviliges.findFirst();
//     res.status(200).json(pvs);
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const createPriviliges = async (req, res) => {
//   const pvs = await prisma.juniorAdminPriviliges.create({
//     data: req.body,
//   });
// };
// export const updatePriviliges = async (req, res) => {
//   const pv = await prisma.juniorAdminPriviliges.findFirst();
//   const updatedPv = await prisma.juniorAdminPriviliges.update({
//     where: { id: pv.id },
//     data: req.body,
//   });
//   res.status(201).json(updatedPv);
// };
