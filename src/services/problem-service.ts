import problemRepository from "@repositories/problem-repository";
import {
  TProblem,
  TProblemLangCode,
  TProblemTestcase,
} from "@schemas/problem-schema";

const createProblem = async (data: TProblem) => {
  return await problemRepository.createProblem(data);
};

const createProblemTestcase = async (
  problemId: number,
  data: TProblemTestcase,
) => {
  return await problemRepository.createProblemTestcase(problemId, data);
};

const createProblemCode = async (problemId: number, data: TProblemLangCode) => {
  return await problemRepository.createProblemCode(problemId, data);
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

const getProblemTestcases = async (problemId: number) => {
  return await problemRepository.getProblemTestcases(problemId);
};

const getProblemCodes = async (problemId: number) => {
  return await problemRepository.getProblemCodes(problemId);
};

const updateProblem = async (slug: string, data: TProblem) => {
  return await problemRepository.updateProblem(slug, data);
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
