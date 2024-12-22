import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import problemService from "@services/problem-service";
import { BadRequest, NotFound } from "@utils/errors";
import { CREATED, DELETED, GET, UPDATED } from "@/utils/strings";

import {
  type TProblem,
  type TProblemLangCode,
  type TProblemTestcase,
} from "@schemas/problem-schema";
import checkPrimarykey from "@utils/check-primarykey";

const createProblem = async (req: Req, res: Res, next: NextFn) => {
  try {
    const body = req.body as TProblem;
    await problemService.createProblem(body);

    res.status(StatusCodes.CREATED).json({
      succcess: true,
      statusCode: StatusCodes.CREATED,
      message: CREATED,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const createProblemTestcase = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    const body = req.body as TProblemTestcase;
    if (!slug) throw new NotFound("Problem Not Found");

    await problemService.createProblemTestcase(slug, body);

    res.status(StatusCodes.CREATED).json({
      succcess: true,
      statusCode: StatusCodes.CREATED,
      message: CREATED,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const createProblemCode = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    const langId = checkPrimarykey(req.params.langId);
    const body = req.body as TProblemLangCode;
    if (!slug) throw new NotFound("Problem Not Found");

    await problemService.createProblemCode(slug, langId, body);

    res.status(StatusCodes.CREATED).json({
      succcess: true,
      statusCode: StatusCodes.CREATED,
      message: CREATED,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const searchProblems = async (req: Req, res: Res, next: NextFn) => {
  try {
    const query = req.query.query as string;
    const response = query
      ? await problemService.searchProblems(query)
      : await problemService.getProblems();

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getProblems = async (_: Req, res: Res, next: NextFn) => {
  try {
    const response = await problemService.getProblems();

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getProblem = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    if (!slug) throw new NotFound("Problem Doesnot Exist");

    const response = await problemService.getProblem(slug);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getProblemTestcases = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    if (!slug) throw new NotFound("Problem Not Found");

    const response = await problemService.getProblemTestcases(slug);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getProblemCodes = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    const langId = checkPrimarykey(req.params.langId);
    if (!slug) throw new NotFound("Problem Not Found");

    const response = await problemService.getProblemCodes(slug, langId);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const updateProblem = async (req: Req, res: Res, next: NextFn) => {
  try {
    const id = checkPrimarykey(req.params.slug);
    if (!id) throw new NotFound("Problem Not Found");

    const body = req.body as TProblem;
    await problemService.updateProblem(id, body);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: UPDATED,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const updateProblemTestcase = async (req: Req, res: Res, next: NextFn) => {
  try {
    const id = checkPrimarykey(req.params.id);
    if (!id) throw new NotFound("Problem Testcase Not Found");

    const body = req.body as TProblemTestcase;
    await problemService.updateProblemTestcase(id, body);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: UPDATED,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const updateProblemCode = async (req: Req, res: Res, next: NextFn) => {
  try {
    const id = checkPrimarykey(req.params.id);
    if (!id) throw new NotFound("Problem Code Not Found");

    const body = req.body as TProblemLangCode;
    await problemService.updateProblemCode(id, body);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: UPDATED,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const updateActiveStatus = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    if (!slug) throw new NotFound("Problem Not Found");

    let isActive: boolean;
    if (req.query.isActive === "true") isActive = true;
    else if (req.query.isActive === "false") isActive = false;
    else throw new BadRequest("Invalid Data Provided");

    await problemService.updateActiveStatus(slug, isActive);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: UPDATED,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProblem = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    if (!slug) throw new NotFound("Problem Not Found");

    await problemService.deleteProblem(slug);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: DELETED,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const deleteProblemTestcase = async (req: Req, res: Res, next: NextFn) => {
  try {
    const id = checkPrimarykey(req.params.id);
    if (!id) throw new NotFound("Problem Testcase Not Found");

    await problemService.deleteProblemTestcase(id);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: DELETED,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const deleteProblemCode = async (req: Req, res: Res, next: NextFn) => {
  try {
    const id = checkPrimarykey(req.params.id);
    if (!id) throw new NotFound("Problem Code Not Found");

    await problemService.deleteProblemCode(id);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: DELETED,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// --------------------------------- User ----------------------------
const searchUserProblems = async (req: Req, res: Res, next: NextFn) => {
  try {
    const query = req.query.query as string;
    const response = query
      ? await problemService.searchUserProblems(query)
      : await problemService.getUserProblems();

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getUserProblems = async (_: Req, res: Res, next: NextFn) => {
  try {
    const response = await problemService.getUserProblems();

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const getUserProblemDescription = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    if (!slug) throw new NotFound("Problem Doesnot Exist");

    const response = await problemService.getUserProblemDescription(slug);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
const getUserSampleTestcase = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    if (!slug) throw new NotFound("Problem Doesnot Exist");

    const response = await problemService.getUserSampleTestcase(slug);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
const getUserProblemCodes = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    if (!slug) throw new NotFound("Problem Not Found");

    const response = await problemService.getUserProblemCodes(slug);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

// ----------- submission --------------
const getProblemForSubmission = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    const lang = req.params.lang;
    if (!slug) throw new NotFound("Problem Doesnot Exist");
    if (!lang) throw new NotFound("Language Doesnot Exist");

    const response = await problemService.getProblemForSubmission(slug, lang);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
const getProblemForRun = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    const lang = req.params.lang;
    if (!slug) throw new NotFound("Problem Doesnot Exist");
    if (!lang) throw new NotFound("Language Doesnot Exist");

    const response = await problemService.getProblemForRun(slug, lang);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: GET,
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const langaugeController = {
  createProblem,
  createProblemTestcase,
  createProblemCode,
  searchProblems,
  getProblems,
  getProblem,
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

export default langaugeController;
