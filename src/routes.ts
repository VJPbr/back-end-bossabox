import express from 'express';
import ToolsController from './controllers/ToolsController';

const routes = express.Router();
const toolsControllers = new ToolsController();

// Métodos Get, Post, Put e Delete

// Corpo (Request Body): Dados para criação ou att de um registro
// Route params: identificar qual recurso eu quero att ou deletar
// Query params: paginação, filtros, ordenação

routes.get('/tools', toolsControllers.index);
routes.post('/tools', toolsControllers.create);
routes.delete('/tools/:id', toolsControllers.delete);

export default routes;