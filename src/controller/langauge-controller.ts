import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import langaugeService from "@services/language-service";
import checkPrimaryKey from "@utils/check-primaryKey";
import { CREATED, DELETED, GET, UPDATED } from "@utils/strings";

import { type TLanguage } from "@schemas/language-schema";
import { BadRequest } from "@utils/errors";

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

const updateActiveStatus = async (req: Req, res: Res, next: NextFn) => {
  try {
    const id = checkPrimaryKey(req.params.id);

    let isActive: boolean;
    if (req.query.isActive === "true") isActive = true;
    else if (req.query.isActive === "false") isActive = false;
    else throw new BadRequest("Invalid Data Provided");

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

// ------------------------- USER --------------------------------------
const getUserLanguage = async (_: Req, res: Res, next: NextFn) => {
  try {
    const response = await langaugeService.getUserLanguages();
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
  createLanguage,
  getLanguages,
  getLanguage,
  updateLanguage,
  updateActiveStatus,
  deleteLanguage,
  getUserLanguage,
};

export default langaugeController;
