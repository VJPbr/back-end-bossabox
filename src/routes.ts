import express from 'express';
import ToolsController from './controllers/ToolsController';

const routes = express.Router();
const toolsControllers = new ToolsController();

routes.get('/tools', toolsControllers.index);
routes.post('/tools', toolsControllers.create);
routes.delete('/tools/:id', toolsControllers.delete);

export default routes;