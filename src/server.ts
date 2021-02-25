import 'reflect-metadata';
import express, { response } from 'express';
import "./database";
const app = express();



/**
 * GET => BUSCA
 * POST => SALVAR
 * PUT => ALTERAR 
 * DELETE => DELETAR
 * PATCH => ALTERAÇÃO ESPECÍFICA
 */

 // http://localhost:3333/users
app.get("/", (request, response)=>{
    return response.json({message: "Hello World - NLW04"})
});

// 1 param => Rota(recurso API)
// 2 param => request,response

app.post("/", (request, response)=>{
    return response.json({message: "Os dados foram salvos com sucesso"})
});

app.listen(3333, () => console.log("Server is running"));

