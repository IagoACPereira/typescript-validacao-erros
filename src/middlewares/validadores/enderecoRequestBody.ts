import { NextFunction, Request, Response } from "express";
import * as yup from 'yup';
import EnderecoEntity from "../../entities/Endereco";
import { pt } from "yup-locale-pt";

yup.setLocale(pt)

const schemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> = yup.object({
  cidade: yup
    .string()
    .defined()
    .required(),
  estado: yup
    .string()
    .defined()
    .required(),
});

async function middlewareValidadorBodyEndereco(req: Request, res: Response, next: NextFunction) {
  try {
    await schemaBodyEndereco.validate(req.body, {
      abortEarly: false,
    });

    next();
  } catch (error) {
    const yupErrors = error as yup.ValidationError;

    const validationErrors: Record<string, string> = {}

    yupErrors.inner.forEach((error) => {
      if (!error.path) return;
      validationErrors[error.path] = error.message;
    })
    return res.status(400).json({ error: validationErrors });
  }
}

export { middlewareValidadorBodyEndereco };
