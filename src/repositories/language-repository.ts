import prisma from "@config/db-config";
import { NotFound } from "@utils/errors";
import { TLanguage } from "@schemas/language-schema";

// ------------------------ POST --------------------------
const createLanguage = async (data: TLanguage) => {
  await prisma.language.create({ data });
};

// ------------------------ GET --------------------------
const getLanguages = async () => {
  return await prisma.language.findMany();
};

const getLanguage = async (id: number) => {
  const langauge = await prisma.language.findUnique({ where: { id: id } });
  if (!langauge) throw new NotFound("Language Doesnot Exist");
  return langauge;
};

// ------------------------ PUT --------------------------
const updateLanguage = async (id: number, data: TLanguage) => {
  await prisma.language.update({
    where: { id: id },
    data: data,
  });
};

// ------------------------ PATCH --------------------------
const updateActiveStatus = async (id: number, isActive: boolean) => {
  await prisma.language.update({
    where: { id: id },
    data: {
      isActive: isActive,
    },
  });
};

// ------------------------ DELETE --------------------------
const deleteLanguage = async (id: number) => {
  await prisma.language.delete({
    where: { id: id },
  });
};

const langaugeRepository = {
  createLanguage,
  getLanguages,
  getLanguage,
  updateLanguage,
  updateActiveStatus,
  deleteLanguage,
};

export default langaugeRepository;
