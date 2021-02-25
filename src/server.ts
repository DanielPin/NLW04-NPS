import 'reflect-metadata';
import express, { response } from 'express';
import "./database";
import { router } from '../routes';

const app = express();

app.use(express.json());
app.use(router);

app.listen(3333, () => console.log("Server is running"));






/**
 * GET => BUSCA
 * POST => SALVAR
 * PUT => ALTERAR 
 * DELETE => DELETAR
 * PATCH => ALTERAÇÃO ESPECÍFICA
 */

 // http://localhost:3333/users
//app.get("/", (request, response)=>{
//    return response.json({message: "Hello World - NLW04"})
//});

// 1 param => Rota(recurso API)
// 2 param => request,response

//app.post("/", (request, response)=>{
//   return response.json({message: "Os dados foram salvos com sucesso"})
//});
