import { StatusCodes } from "http-status-codes";

export default class BaseError extends Error {
  name: string;
  statusCode: number;

  constructor(name: string, statusCode: number, message: string) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export class BadRequest extends BaseError {
  constructor(message: string) {
    super(BadRequest.name, StatusCodes.BAD_REQUEST, message);
  }
}

export class Forbidden extends BaseError {
  constructor(message: string) {
    super(Forbidden.name, StatusCodes.FORBIDDEN, message);
  }
}

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super(InternalServerError.name, StatusCodes.INTERNAL_SERVER_ERROR, message);
  }
}

export class NotFound extends BaseError {
  constructor(message: string) {
    super(NotFound.name, StatusCodes.NOT_FOUND, message);
  }
}

export class Unauthorized extends BaseError {
  constructor(message: string) {
    super(Unauthorized.name, StatusCodes.UNAUTHORIZED, message);
  }
}

export class Conflict extends BaseError {
  constructor(message: string) {
    super(Conflict.name, StatusCodes.CONFLICT, message);
  }
}

export class NotImplemented extends BaseError {
  constructor(message: string) {
    super(NotImplemented.name, StatusCodes.NOT_IMPLEMENTED, message);
  }
}
