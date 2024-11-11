import problemRepository from "@repositories/problem-repository";
import {
  TProblem,
  TProblemLangCode,
  TProblemTestcase,
} from "@schemas/problem-schema";

// ------------------------ POST --------------------------
const createProblem = async (data: TProblem) => {
  return await problemRepository.createProblem(data);
};

const createProblemTestcase = async (data: TProblemTestcase) => {
  return await problemRepository.createProblemTestcase(data);
};

const createProblemCode = async (data: TProblemLangCode) => {
  return await problemRepository.createProblemCode(data);
};

// ------------------------ GET --------------------------
const searchProblems = async (query: string) => {
  return problemRepository.searchProblems(query);
};
const getProblems = async () => {
  return problemRepository.getProblems();
};

const getProblem = async (slug: string) => {
  return await problemRepository.getProblem(slug);
};

const getProblemTestcases = async (problemId: number) => {
  return await problemRepository.getProblemTestcases(problemId);
};

const getProblemCodes = async (problemId: number) => {
  return await problemRepository.getProblemCodes(problemId);
};

// ------------------------ PUT --------------------------
const updateProblem = async (slug: string, data: TProblem) => {
  return await problemRepository.updateProblem(slug, data);
};

const updateProblemTestcase = async (id: number, data: TProblemTestcase) => {
  return await problemRepository.updateProblemTestcase(id, data);
};

const updateProblemCode = async (id: number, data: TProblemLangCode) => {
  return await problemRepository.updateProblemCode(id, data);
};

// ------------------------ PATCH --------------------------
const updateActiveStatus = async (slug: string, isActive: boolean) => {
  return await problemRepository.updateActiveStatus(slug, isActive);
};

// ------------------------ DELETE --------------------------
const deleteProblem = async (slug: string, data: TProblem) => {
  return await problemRepository.deleteProblem(slug, data);
};

const deleteProblemTestcase = async (id: number, data: TProblemTestcase) => {
  return await problemRepository.deleteProblemTestcase(id, data);
};

const deleteProblemCode = async (id: number, data: TProblemLangCode) => {
  return await problemRepository.deleteProblemCode(id, data);
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
};

export default problemService;
