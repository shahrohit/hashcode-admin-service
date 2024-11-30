import { TLanguage } from "@schemas/language-schema";
import langaugeRepository from "@repositories/language-repository";

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

const updateActiveStatus = async (id: number, isActive: boolean) => {
  return await langaugeRepository.updateActiveStatus(id, isActive);
};

const deleteLanguage = async (id: number) => {
  return await langaugeRepository.deleteLanguage(id);
};

const langaugeService = {
  createLanguage,
  getLanguages,
  getLanguage,
  updateLanguage,
  updateActiveStatus,
  deleteLanguage,
};

export default langaugeService;
