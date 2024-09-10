import 'express-async-errors';
import express, { Request, Response } from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";
import { erroMiddleware } from "./middlewares/erro";
const app = express();
app.use(express.json());
router(app);

app.get('/teste', (req: Request, res: Response) => {
  throw new Error('Erro Teste');
})

app.use(erroMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((erro) => {
    console.log(erro);
  });

export default app;
