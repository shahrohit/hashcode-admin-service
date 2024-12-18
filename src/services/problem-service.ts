import problemRepository from "@repositories/problem-repository";
import {
  TProblem,
  TProblemLangCode,
  TProblemTestcase,
} from "@schemas/problem-schema";

const createProblem = async (data: TProblem) => {
  return await problemRepository.createProblem(data);
};

const createProblemTestcase = async (slug: string, data: TProblemTestcase) => {
  return await problemRepository.createProblemTestcase(slug, data);
};

const createProblemCode = async (
  slug: string,
  langId: number,
  data: TProblemLangCode,
) => {
  return await problemRepository.createProblemCode(slug, langId, data);
};

const searchProblems = async (query: string) => {
  return problemRepository.searchProblems(query);
};

const getProblems = async () => {
  return problemRepository.getProblems();
};

const getProblem = async (slug: string) => {
  return await problemRepository.getProblem(slug);
};

const getProblemTestcases = async (slug: string) => {
  return await problemRepository.getProblemTestcases(slug);
};

const getProblemCodes = async (slug: string, langId: number) => {
  return await problemRepository.getProblemCodes(slug, langId);
};

const updateProblem = async (id: number, data: TProblem) => {
  return await problemRepository.updateProblem(id, data);
};

const updateProblemTestcase = async (id: number, data: TProblemTestcase) => {
  return await problemRepository.updateProblemTestcase(id, data);
};

const updateProblemCode = async (id: number, data: TProblemLangCode) => {
  return await problemRepository.updateProblemCode(id, data);
};

const updateActiveStatus = async (slug: string, isActive: boolean) => {
  return await problemRepository.updateActiveStatus(slug, isActive);
};

const deleteProblem = async (slug: string, data: TProblem) => {
  return await problemRepository.deleteProblem(slug, data);
};

const deleteProblemTestcase = async (id: number, data: TProblemTestcase) => {
  return await problemRepository.deleteProblemTestcase(id, data);
};

const deleteProblemCode = async (id: number, data: TProblemLangCode) => {
  return await problemRepository.deleteProblemCode(id, data);
};

// --------------------- User --------------------------
const searchUserProblems = async (query: string) => {
  return problemRepository.searchUserProblems(query);
};
const getUserProblems = async () => {
  return problemRepository.getUserProblems();
};

const getUserProblemDescription = async (slug: string) => {
  return await problemRepository.getUserProblemDescription(slug);
};
const getUserSampleTestcase = async (slug: string) => {
  return await problemRepository.getUserSampleTestcase(slug);
};

const getUserProblemCodes = async (slug: string) => {
  return await problemRepository.getUserProblemCodes(slug);
};

// ---------- submission -----------
const getProblemForSubmission = async (slug: string, lang: string) => {
  return await problemRepository.getProblemForSubmission(slug, lang);
};
const getProblemForRun = async (slug: string, lang: string) => {
  return await problemRepository.getProblemForRun(slug, lang);
};

const problemService = {
  createProblem,
  searchProblems,
  getProblems,
  getProblem,
  createProblemTestcase,
  createProblemCode,
  getProblemTestcases,
  getProblemCodes,
  updateProblem,
  updateProblemTestcase,
  updateProblemCode,
  updateActiveStatus,
  deleteProblem,
  deleteProblemTestcase,
  deleteProblemCode,
  searchUserProblems,
  getUserProblems,
  getUserProblemDescription,
  getUserSampleTestcase,
  getUserProblemCodes,
  getProblemForSubmission,
  getProblemForRun,
};

export default problemService;
