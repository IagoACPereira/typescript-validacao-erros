import { Repository } from "typeorm";
import AbrigoEntity from "../entities/AbrigoEntity";
import InterfaceAbrigoRepository from "./interfaces/InterfaceAbrigoRepository";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";

export class AbrigoRepository implements InterfaceAbrigoRepository {
  constructor(private repository: Repository<AbrigoEntity>) {}

  private async verificaCelularAbrigo(celular: string) {
    return this.repository.findOne({
      where: { celular },
    });
  }

  private async verificaEmailAbrigo(email: string) {
    return this.repository.findOne({
      where: { email },
    });
  }

  async criaAbrigo(abrigo: AbrigoEntity): Promise<void> {
    if (await this.verificaCelularAbrigo(abrigo.celular)) {
      throw new RequisicaoRuim('Celular já está cadastrado');
    }

    if (await this.verificaEmailAbrigo(abrigo.email)) {
      throw new RequisicaoRuim('Email já está cadastrado');
    }
    
    await this.repository.save(abrigo);
  }

  async listaAbrigos(): Promise<AbrigoEntity[]> {
    return await this.repository.find();
  }

  async atualizaAbrigo(
    id: number, 
    newData: AbrigoEntity
  ): Promise<{ success: boolean; message?: string }> {
    const abrigoToUpdate = await this.repository.findOne({ where: { id } });

    if (!abrigoToUpdate) {
      throw new NaoEncontrado('Abrigo não encontrado');
    }

    Object.assign(abrigoToUpdate, newData);

    await this.repository.save(abrigoToUpdate);

    return { success: true };
  }

  async deletaAbrigo(id: number): Promise<{ success: boolean; message?: string }> {
    const abrigoToRemove = await this.repository.findOne({ where: { id } });

    if (!abrigoToRemove) {
      throw new NaoEncontrado('Abrigo não encontrado');
    }

    await this.repository.remove(abrigoToRemove);

    return { success: true };
  }
}