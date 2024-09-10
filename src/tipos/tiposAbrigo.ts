import AbrigoEntity from "../entities/AbrigoEntity";

type TipoRequestBodyAbrigo = Omit<AbrigoEntity, "id">;
type TipoResponseBodyAbrigo = {
  dados?: 
    | Pick<AbrigoEntity, "id"  | "nome" | "email" | "celular" | "endereco"> 
    | Pick<AbrigoEntity, "id" | "nome" | "email" | "celular" | "endereco">[];
  erros?: unknown;
};
type TipoRequestParamsAbrigo = { id?: string };

export {
  TipoRequestBodyAbrigo,
  TipoResponseBodyAbrigo,
  TipoRequestParamsAbrigo,
};
