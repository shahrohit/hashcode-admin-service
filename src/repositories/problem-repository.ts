import prisma from "@config/db-config";
import { Conflict, NotFound } from "@utils/errors";

import {
  type TProblem,
  type TProblemLangCode,
  type TProblemTestcase,
} from "@schemas/problem-schema";

const createProblem = async (data: TProblem) => {
  const problem = await prisma.problem.findUnique({
    where: { slug: data.slug },
  });
  if (problem) throw new Conflict("Problem Already Exist");

  await prisma.problem.create({
    data: {
      ...data,
      topics: { connect: data.topics.map(topic => ({ id: topic })) },
    },
  });
};

const createProblemTestcase = async (
  problemId: number,
  data: TProblemTestcase,
) => {
  await prisma.testcase.create({
    data: {
      ...data,
      problemId,
    },
  });
};

const createProblemCode = async (problemId: number, data: TProblemLangCode) => {
  const problem = await prisma.code.findFirst({
    where: { problemId, langId: data.langId },
  });

  if (problem) throw new Conflict("Problem Code Already Exist");

  await prisma.code.create({
    data: {
      ...data,
      problemId,
    },
  });
};

const searchProblems = async (query: string) => {
  if (!isNaN(+query)) {
    return await prisma.problem.findMany({
      where: {
        OR: [
          { id: +query },
          { title: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        difficulty: true,
        isActive: true,
        memoryLimit: true,
        timeLimit: true,
        topics: true,
      },
    });
  }

  return await prisma.problem.findMany({
    where: {
      title: { contains: query, mode: "insensitive" },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      difficulty: true,
      isActive: true,
      memoryLimit: true,
      timeLimit: true,
      topics: true,
    },
  });
};

const getProblems = async () => {
  return await prisma.problem.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      difficulty: true,
      isActive: true,
      memoryLimit: true,
      timeLimit: true,
      topics: true,
    },
  });
};

const getProblem = async (slug: string) => {
  const problem = await prisma.problem.findUnique({
    where: { slug: slug },
    include: {
      topics: true,
    },
  });
  if (!problem) throw new NotFound("Problem Not Found");
  return problem;
};

const getProblemTestcases = async (problemId: number) => {
  return await prisma.testcase.findMany({
    where: { problemId: problemId },
  });
};
const getProblemCodes = async (problemId: number) => {
  return await prisma.code.findMany({
    where: { problemId: problemId },
    include: {
      language: true,
    },
  });
};

const updateProblem = async (slug: string, data: TProblem) => {
  await prisma.problem.update({
    where: { slug: slug },
    data: {
      ...data,
      topics: { connect: data.topics.map(topic => ({ id: topic })) },
    },
  });
};

const updateProblemTestcase = async (id: number, data: TProblemTestcase) => {
  await prisma.testcase.update({
    where: { id: id },
    data,
  });
};

const updateProblemCode = async (id: number, data: TProblemLangCode) => {
  await prisma.code.update({
    where: { id: id },
    data: {
      starterCode: data.starterCode,
      driverCode: data.driverCode,
      solutionCode: data.solutionCode,
    },
  });
};

const updateActiveStatus = async (slug: string, isActive: boolean) => {
  await prisma.problem.update({
    where: { slug: slug },
    data: {
      isActive: isActive,
    },
  });
};

const deleteProblem = async (slug: string, data: TProblem) => {
  await prisma.problem.delete({
    where: { slug: slug },
  });
};

const deleteProblemTestcase = async (id: number, data: TProblemTestcase) => {
  await prisma.testcase.delete({
    where: { id: id },
  });
};

const deleteProblemCode = async (id: number, data: TProblemLangCode) => {
  await prisma.code.delete({
    where: { id: id },
  });
};

// ---------------------- User -----------------------------------
const searchUserProblems = async (query: string) => {
  if (!isNaN(+query)) {
    return await prisma.problem.findMany({
      where: {
        OR: [
          { id: +query },
          { title: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        title: true,
        slug: true,
        difficulty: true,
        topics: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });
  }

  return await prisma.problem.findMany({
    where: {
      title: { contains: query, mode: "insensitive" },
    },
    select: {
      title: true,
      slug: true,
      difficulty: true,
      topics: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
};

const getUserProblems = async () => {
  return await prisma.problem.findMany({
    select: {
      title: true,
      slug: true,
      difficulty: true,
      topics: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });
};

const getUserProblem = async (slug: string) => {
  const problem = await prisma.problem.findUnique({
    where: { slug: slug },
    select: {
      title: true,
      slug: true,
      difficulty: true,
      description: true,
      topics: {
        select: {
          name: true,
          slug: true,
        },
      },
      sampleTestcases: true,
      parameterName: true,
    },
  });
  if (!problem) throw new NotFound("Problem Not Found");
  return problem;
};

const problemRepository = {
  createProblem,
  searchProblems,
  getProblems,
  getProblem,
  getProblemTestcases,
  getProblemCodes,
  createProblemTestcase,
  createProblemCode,
  updateProblem,
  updateProblemTestcase,
  updateProblemCode,
  updateActiveStatus,
  deleteProblem,
  deleteProblemTestcase,
  deleteProblemCode,
  searchUserProblems,
  getUserProblems,
  getUserProblem,
};

export default problemRepository;
