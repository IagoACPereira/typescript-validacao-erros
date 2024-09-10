import { NextFunction, Request, Response } from "express";
import * as yup from 'yup';
import { pt } from 'yup-locale-pt';
import { TipoRequestBodyPet } from "../../tipos/tiposPet";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";

yup.setLocale(pt);

const schemaBodyPet: yup.ObjectSchema<Omit<TipoRequestBodyPet, "adotante" | "abrigo">> = yup.object({
  nome: yup
    .string()
    .defined()
    .required(),
  especie: yup
    .string()
    .oneOf(Object.values(EnumEspecie))
    .defined()
    .required(),
  porte: yup
    .string()
    .oneOf(Object.values(EnumPorte))
    .defined()
    .required(),
  dataDeNascimento: yup
    .date()
    .defined()
    .required(),
  adotado: yup
    .boolean()
    .defined()
    .required(),
});

async function middlewareValidadorBodyPet(req: Request, res: Response, next: NextFunction) {
  try {
    await schemaBodyPet.validate(req.body, {
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

export { middlewareValidadorBodyPet };
