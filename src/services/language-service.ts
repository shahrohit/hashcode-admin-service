import { TLanguage } from "@schemas/language-schema";
import langaugeRepository from "@repositories/language-repository";

// ----------------------- Admin --------------------------------------
const createLanguage = async (data: TLanguage) => {
  return await langaugeRepository.createLanguage(data);
};

const getLanguages = async () => {
  return langaugeRepository.getLanguages();
};

const getLanguage = async (id: number) => {
  return await langaugeRepository.getLanguage(id);
};

const updateLanguage = async (id: number, data: TLanguage) => {
  return await langaugeRepository.updateLanguage(id, data);
};

const deleteLanguage = async (id: number) => {
  return await langaugeRepository.deleteLanguage(id);
};

// ------------------------- User -----------------------
const getUserLanguages = async () => {
  return langaugeRepository.getUserLanguages();
};

const langaugeService = {
  createLanguage,
  getLanguages,
  getLanguage,
  updateLanguage,
  deleteLanguage,
  getUserLanguages,
};

export default langaugeService;
