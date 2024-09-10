import { NextFunction, Request, Response } from "express";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";
import { ManipulaErros } from "../utils/manipulaErros";

export function erroMiddleware(erro: ManipulaErros, req: Request, res: Response, next: NextFunction) {
  const statusCode = erro.statusCode ?? EnumHttpStatusCode.INTERNAL_SERVER_ERROR;

  const mensagem = erro.statusCode ? erro.message : "Erro interno do servidor";

  res.status(statusCode).json({ mensagem });

  next();
}