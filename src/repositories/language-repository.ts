import prisma from "@config/db-config";
import { NotFound } from "@utils/errors";
import { TLanguage } from "@schemas/language-schema";

const createLanguage = async (data: TLanguage) => {
  await prisma.language.create({ data });
};

const getLanguages = async () => {
  return await prisma.language.findMany();
};

const getLanguage = async (id: number) => {
  const langauge = await prisma.language.findUnique({ where: { id: id } });
  if (!langauge) throw new NotFound("Language Doesnot Exist");
  return langauge;
};

const updateLanguage = async (id: number, data: TLanguage) => {
  await prisma.language.update({
    where: { id: id },
    data: data,
  });
};

const updateActiveStatus = async (id: number, isActive: boolean) => {
  await prisma.language.update({
    where: { id: id },
    data: {
      isActive: isActive,
    },
  });
};

const deleteLanguage = async (id: number) => {
  await prisma.language.delete({
    where: { id: id },
  });
};

// ---------------------- User ------------------------
const getUserLanguages = async () => {
  return await prisma.language.findMany({
    select: {
      name: true,
      version: true,
    },
  });
};

const langaugeRepository = {
  createLanguage,
  getLanguages,
  getLanguage,
  updateLanguage,
  updateActiveStatus,
  deleteLanguage,
  getUserLanguages,
};

export default langaugeRepository;
