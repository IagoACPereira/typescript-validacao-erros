import { Router } from "express";
import AbrigoController from "../controller/AbrigoController";
import { AbrigoRepository } from "../repositories/AbrigoRepository";
import { AppDataSource } from "../config/dataSource";
import { verificaIdMiddleware } from "../middlewares/verificaId";

const abrigoRepository = new AbrigoRepository(AppDataSource.getRepository('AbrigoEntity'));
const abrigoController = new AbrigoController(abrigoRepository);

export default Router()
  .post('/', (req, res) => abrigoController.criaAbrigo(req, res))
  .get('/', (req, res) => abrigoController.listaAbrigo(req, res))
  .put('/:id', verificaIdMiddleware, (req, res) => abrigoController.atualizaAbrigo(req, res))
  .delete('/:id', verificaIdMiddleware, (req, res) => abrigoController.deletaAbrigo(req, res));