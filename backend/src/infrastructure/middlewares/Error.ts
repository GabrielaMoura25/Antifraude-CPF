import { ErrorRequestHandler } from 'express';

class ErrorHandler {
  public static execute: ErrorRequestHandler = (error, _req, res, _next) => {
    switch(error.message) {
      case 'InvalidCpfException':
      res.status(400).json({type: "InvalidCpfException", message: "CPF is not valid."});
      break;
      case 'ExistsCpfException':
      res.status(400).json({type: "ExistsCpfException", message: "CPF is not valid."});
      break;
      case 'NotFoundCpfException':
      res.status(400).json({type: "NotFoundCpfException", message: "CPF is not valid."});
      break;
      default:
      res.status(500).json({type: "InternalError", message: "Internal error."});
      break;
    }
  }
}

export { ErrorHandler }