import {
  NextFunction as NextFn,
  Request as Req,
  Response as Res,
} from "express";
import { StatusCodes } from "http-status-codes";

import topicService from "@services/topic-service";
import { NotFound } from "@utils/errors";
import { CREATED, DELETED, GET, UPDATED } from "@/utils/strings";

import { type TTopic } from "@schemas/topic-schema";
import checkPrimarykey from "@utils/check-primarykey";

const createTopic = async (req: Req, res: Res, next: NextFn) => {
  try {
    const body = req.body as TTopic;

    await topicService.createTopic(body);

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

const getTopics = async (_: Req, res: Res, next: NextFn) => {
  try {
    const response = await topicService.getTopics();

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

const getTopic = async (req: Req, res: Res, next: NextFn) => {
  try {
    const slug = req.params.slug;
    if (!slug) throw new NotFound("Topic doesnot Exist");

    const response = await topicService.getTopic(slug);

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

const updateTopic = async (req: Req, res: Res, next: NextFn) => {
  try {
    const id = checkPrimarykey(req.params.slug);
    if (!id) throw new NotFound("Topic doesnot Exist");

    const data = req.body as TTopic;

    await topicService.updateTopic(id, data);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: UPDATED,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTopic = async (req: Req, res: Res, next: NextFn) => {
  try {
    const id = checkPrimarykey(req.params.slug);
    if (!id) throw new NotFound("Topic doesnot Exist");

    await topicService.deleteTopic(id);

    res.status(StatusCodes.OK).json({
      succcess: true,
      statusCode: StatusCodes.OK,
      message: DELETED,
    });
  } catch (error) {
    next(error);
  }
};

const getUserTopics = async (_: Req, res: Res, next: NextFn) => {
  try {
    const response = await topicService.getUserTopics();

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
const topicController = {
  createTopic,
  getTopics,
  getTopic,
  updateTopic,
  deleteTopic,
  getUserTopics,
};

export default topicController;
