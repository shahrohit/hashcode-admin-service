import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import langaugeService from "@services/language-service";
import checkPrimaryKey from "@utils/check-primaryKey";
import { CREATED, DELETED, GET, UPDATED } from "@utils/constants";

import { type TLanguage } from "@schemas/language-schema";

const createLanguage = async (req: Req, res: Res, next: NextFn) => {
  try {
    const body = req.body as TLanguage;

    await langaugeService.createLanguage(body);

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

// ------------------------ POST --------------------------
const getLanguages = async (_: Req, res: Res, next: NextFn) => {
  try {
    const response = await langaugeService.getLanguages();

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

// ------------------------ GET --------------------------
const getLanguage = async (req: Req, res: Res, next: NextFn) => {
  try {
    const id = checkPrimaryKey(req.params.id);

    const response = await langaugeService.getLanguage(id);

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
const updateLanguage = async (req: Req, res: Res, next: NextFn) => {
  try {
    const id = checkPrimaryKey(req.params.id);

    const data = req.body as TLanguage;

    await langaugeService.updateLanguage(id, data);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: UPDATED,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------ PATCH --------------------------
const updateActiveStatus = async (req: Req, res: Res, next: NextFn) => {
  try {
    const id = checkPrimaryKey(req.params.id);

    const isActive = req.query.isActive === "true" ? true : false;

    await langaugeService.updateActiveStatus(id, isActive);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: UPDATED,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------ DELETE --------------------------
const deleteLanguage = async (req: Req, res: Res, next: NextFn) => {
  try {
    const id = checkPrimaryKey(req.params.id);

    await langaugeService.deleteLanguage(id);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: DELETED,
    });
  } catch (error) {
    next(error);
  }
};

const langaugeController = {
  createLanguage,
  getLanguages,
  getLanguage,
  updateLanguage,
  updateActiveStatus,
  deleteLanguage,
};

export default langaugeController;
