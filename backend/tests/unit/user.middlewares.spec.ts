import { ErrorHandler } from '../../src/infrastructure/middlewares/Error';
import { Response, Request, NextFunction } from 'express';

describe("ErrorHandler", () => {
  let res: Partial<Response>;
  let req: Partial<Request>;
  let next: Partial<NextFunction>;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    req = {};
    next = jest.fn();
  });

  it("should return 400 and 'InvalidCpfException' error message for InvalidCpfException error", () => {
    const error = { message: "InvalidCpfException" };
    ErrorHandler.execute(error as any, req as any, res as any, next as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ type: "InvalidCpfException", message: "CPF is not valid." });
  });

  it("should return 400 and 'ExistsCpfException' error message for ExistsCpfException error", () => {
    const error = { message: "ExistsCpfException" };
    ErrorHandler.execute(error as any, req as any, res as any, next as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ type: "ExistsCpfException", message: "CPF is not valid." });
  });

  it("should return 400 and 'NotFoundCpfException' error message for NotFoundCpfException error", () => {
    const error = { message: "NotFoundCpfException" };
    ErrorHandler.execute(error as any, req as any, res as any, next as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ type: "NotFoundCpfException", message: "CPF is not valid." });
  });

  it("should return 500 and 'InternalError' error message for any other error", () => {
    const error = { message: "SomeError" };
    ErrorHandler.execute(error as any, req as any, res as any, next as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ type: "InternalError", message: "Internal error." });
  });
});
