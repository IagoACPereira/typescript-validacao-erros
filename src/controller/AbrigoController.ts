import { Request, Response } from "express";
import { AbrigoRepository } from "../repositories/AbrigoRepository";
import AbrigoEntity from "../entities/AbrigoEntity";
import { 
  TipoRequestBodyAbrigo, 
  TipoRequestParamsAbrigo, 
  TipoResponseBodyAbrigo 
} from "../tipos/tiposAbrigo";

export default class AbrigoController {
  constructor(private repository: AbrigoRepository) {}
  
  async criaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const {
      nome,
      celular,
      email,
      senha,
      endereco,
    } = <AbrigoEntity>req.body;

    const novoAbrigo = new AbrigoEntity(
      nome,
      email,
      senha,
      celular,
      endereco,
    );
    
    await this.repository.criaAbrigo(novoAbrigo);

    res.status(201).json({ dados: { id: novoAbrigo.id, nome, celular, email, endereco } });
  }

  async listaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const listaDeAbrigos = await this.repository.listaAbrigos();
    const dados = listaDeAbrigos.map((abrigo) => {
      return {
        id: abrigo.id,
        nome: abrigo.nome,
        email: abrigo.email,
        celular: abrigo.celular,
        endereco: abrigo.endereco !== null ? abrigo.endereco : undefined,
      };
    });

    return res.json({ dados });
  }

  async atualizaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaAbrigo(
      Number(id),
      req.body as AbrigoEntity
    );

    if (!success) {
      return res.status(404).json({ erros: message });
    }

    return res.sendStatus(204);
  }

  async deletaAbrigo(req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaAbrigo(
      Number(id)
    );

    if (!success) {
      return res.status(404).json({ erros: message });
    }
    return res.sendStatus(204);
  }
}