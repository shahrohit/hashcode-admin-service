import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import problemService from "@services/problem-service";
import checkPrimaryKey from "@utils/check-primaryKey";
import { NotFound } from "@utils/errors";
import { CREATED, DELETED, GET, UPDATED } from "@utils/constants";

import {
  type TProblem,
  type TProblemLangCode,
  type TProblemTestcase,
} from "@schemas/problem-schema";

// ------------------------ POST --------------------------
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
    const body = req.body as TProblemTestcase;
    await problemService.createProblemTestcase(body);

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
    const body = req.body as TProblemLangCode;
    await problemService.createProblemCode(body);

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

// ------------------------ GET --------------------------
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
    const problemId = checkPrimaryKey(req.params.id);
    const response = await problemService.getProblemTestcases(problemId);

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
    const problemId = checkPrimaryKey(req.params.id);
    const response = await problemService.getProblemCodes(problemId);

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

// ------------------------ PUT --------------------------
const updateProblem = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    if (!slug) throw new NotFound("Problem Not Found");

    const body = req.body as TProblem;
    await problemService.updateProblem(slug, body);

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
    const id = checkPrimaryKey(req.params.id);
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
    const id = checkPrimaryKey(req.params.id);
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

// ------------------------ DELETE --------------------------
const deleteProblem = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    if (!slug) throw new NotFound("Problem Not Found");

    const body = req.body as TProblem;
    await problemService.deleteProblem(slug, body);

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
    const id = checkPrimaryKey(req.params.id);
    if (!id) throw new NotFound("Problem Testcase Not Found");

    const body = req.body as TProblemTestcase;
    await problemService.deleteProblemTestcase(id, body);

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
    const id = checkPrimaryKey(req.params.id);
    if (!id) throw new NotFound("Problem Code Not Found");

    const body = req.body as TProblemLangCode;
    await problemService.deleteProblemCode(id, body);

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

const langaugeController = {
  createProblem,
  createProblemTestcase,
  createProblemCode,
  getProblems,
  getProblem,
  getProblemTestcases,
  getProblemCodes,
  updateProblem,
  updateProblemTestcase,
  updateProblemCode,
  deleteProblem,
  deleteProblemTestcase,
  deleteProblemCode,
};

export default langaugeController;
