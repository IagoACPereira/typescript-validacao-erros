import AbrigoEntity from "../../entities/AbrigoEntity";

export default interface InterfaceAbrigoRepository {
  criaAbrigo(abrigo: AbrigoEntity): Promise<void>;

  listaAbrigos(): Promise<AbrigoEntity[]>;

  atualizaAbrigo(id: number, abrigo: AbrigoEntity): Promise<{ success: boolean; message?: string }>;

  deletaAbrigo(id: number): Promise<{ success: boolean; message?: string }>;
}