import { NextFunction, Request, Response } from "express";
import * as yup from 'yup';
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import { pt } from 'yup-locale-pt';

yup.setLocale(pt);

const schemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup.string().defined().required().matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, 'Celular inválido!'),
  senha: yup.string().defined().required().min(6).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, "Senha inválida"),
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
