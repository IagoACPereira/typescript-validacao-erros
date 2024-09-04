import { NextFunction, Request, Response } from "express";
import * as yup from 'yup';
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";

const schemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
  nome: yup.string().defined().required('nome é obrigatório'),
  celular: yup.string().defined().required(),
  senha: yup.string().defined().required('senha é obrigatório').min(6),
  foto: yup.string().optional(),
});

async function middlewareValidadorBodyAdotante(req: Request, res: Response, next: NextFunction) {
  try {
    await schemaBodyAdotante.validate(req.body, {
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

export { middlewareValidadorBodyAdotante };
