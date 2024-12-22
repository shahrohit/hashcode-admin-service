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

const createProblemTestcase = async (slug: string, data: TProblemTestcase) => {
  const problem = await prisma.problem.findUnique({
    where: { slug: slug },
    select: {
      id: true,
    },
  });

  if (!problem) throw new NotFound("Problem Doesnot Exist");

  await prisma.testcase.create({
    data: {
      ...data,
      problemId: problem.id,
    },
  });
};

const createProblemCode = async (
  slug: string,
  langId: number,
  data: TProblemLangCode,
) => {
  const problem = await prisma.problem.findUnique({
    where: { slug: slug },
    select: {
      id: true,
    },
  });

  if (!problem) throw new NotFound("Problem Doesnot Exist");

  const code = await prisma.code.findFirst({
    where: { problemId: problem.id, langId },
  });

  if (code) throw new Conflict("Problem Code Already Exist");

  await prisma.code.create({
    data: {
      ...data,
      problemId: problem.id,
      langId,
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
      timeLimit: true,
      topics: true,
      createdAt: true,
      updatedAt: true,
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

const getProblemTestcases = async (slug: string) => {
  const problem = await prisma.problem.findUnique({
    where: { slug: slug },
    select: {
      id: true,
    },
  });

  if (!problem) throw new NotFound("Problem Doesnot Exist");

  return await prisma.testcase.findMany({
    where: { problemId: problem.id },
  });
};

const getProblemCodes = async (slug: string, langId: number) => {
  const problem = await prisma.problem.findUnique({
    where: { slug: slug },
    select: {
      id: true,
    },
  });

  if (!problem) throw new NotFound("Problem Doesnot Exist");

  return await prisma.code.findFirst({
    where: { problemId: problem.id, langId },
  });
};

const updateProblem = async (id: number, data: TProblem) => {
  await prisma.problem.update({
    where: { id: id },
    data: {
      ...data,
      topics: { set: data.topics.map(topic => ({ id: topic })) },
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

const deleteProblem = async (slug: string) => {
  await prisma.problem.delete({
    where: { slug: slug },
  });
};

const deleteProblemTestcase = async (id: number) => {
  await prisma.testcase.delete({
    where: { id: id },
  });
};

const deleteProblemCode = async (id: number) => {
  await prisma.code.delete({
    where: { id: id },
  });
};

// ---------------------- User -----------------------------------
const searchUserProblems = async (query: string) => {
  if (!isNaN(+query)) {
    return await prisma.problem.findMany({
      where: {
        isActive: true,
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
      isActive: true,
      title: { contains: query, mode: "insensitive" },
    },
    select: {
      id: true,
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
    where: { isActive: true },
    select: {
      id: true,
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

const getUserProblemDescription = async (slug: string) => {
  const problem = await prisma.problem.findUnique({
    where: { slug: slug, isActive: true },
    select: {
      id: true,
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
    },
  });
  if (!problem) throw new NotFound("Problem Not Found");
  return problem;
};

const getUserSampleTestcase = async (slug: string) => {
  const problem = await prisma.problem.findUnique({
    where: { slug: slug, isActive: true },
    select: {
      sampleTestcases: true,
      parameterName: true,
    },
  });
  if (!problem) throw new NotFound("Problem Not Found");
  return problem;
};

const getUserProblemCodes = async (slug: string) => {
  const problem = await prisma.problem.findUnique({
    where: { slug: slug },
    select: {
      id: true,
    },
  });

  if (!problem) throw new NotFound("Problem Doesnot Exist");

  const codes = await prisma.code.findMany({
    where: { problemId: problem.id },
    select: {
      language: {
        select: {
          lang: true,
        },
      },
      starterCode: true,
    },
  });

  const response: { [lang: string]: string } = {};
  codes.forEach(code => {
    response[code.language.lang] = code.starterCode;
  });

  return response;
};

// --------------- Submission -------------
const getProblemForSubmission = async (slug: string, lang: string) => {
  const problem = await prisma.problem.findUnique({
    where: { slug: slug },
    select: {
      id: true,
      timeLimit: true,
    },
  });
  if (!problem) throw new NotFound("Problem Not Found");

  const language = await prisma.language.findUnique({
    where: {
      lang,
    },
    select: {
      id: true,
    },
  });
  if (!language) throw new NotFound("Language Not Found");

  const codes = await prisma.code.findFirst({
    where: {
      problemId: problem.id,
      langId: language.id,
    },
    select: {
      driverCode: true,
    },
  });

  if (!codes) throw new NotFound("Problem Code Doesnot Exist");

  const testcases = await prisma.testcase.findMany({
    where: { problemId: problem.id },
    select: {
      input: true,
      output: true,
    },
  });

  const response = {
    id: problem.id,
    langId: language.id,
    language: lang,
    code: codes.driverCode,
    testcases: testcases,
    timeLimit: problem.timeLimit,
  };

  return response;
};
const getProblemForRun = async (slug: string, lang: string) => {
  const problem = await prisma.problem.findUnique({
    where: { slug: slug },
    select: {
      id: true,
      timeLimit: true,
    },
  });
  if (!problem) throw new NotFound("Problem Not Found");

  const language = await prisma.language.findUnique({
    where: {
      lang,
    },
    select: {
      id: true,
    },
  });
  if (!language) throw new NotFound("Language Not Found");

  const codes = await prisma.code.findFirst({
    where: {
      problemId: problem.id,
      langId: language.id,
    },
    select: {
      driverCode: true,
      solutionCode: true,
    },
  });

  if (!codes) throw new NotFound("Problem Code Doesnot Exist");

  const response = {
    id: problem.id,
    langId: language.id,
    language: lang,
    code: codes.driverCode,
    solutionCode: codes.solutionCode,
    timeLimit: problem.timeLimit,
  };

  return response;
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
  getUserProblemDescription,
  getUserSampleTestcase,
  getUserProblemCodes,
  getProblemForSubmission,
  getProblemForRun,
};

export default problemRepository;
