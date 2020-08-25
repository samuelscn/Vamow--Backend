import express from 'express';
import EventsController from './controllers/EventsController';
import CityController from './controllers/CityController';
import StateController from './controllers/StateController';
import CategoryController from './controllers/CategoryController';
import StyleController from './controllers/StyleController';
import LocalController from './controllers/LocalController';

const routes = express.Router();
const eventsController = new EventsController();
const cityController = new CityController();
const stateController = new StateController();
const categoryController = new CategoryController();
const styleController = new StyleController();
const localController = new LocalController();

routes.post('/events', eventsController.create);
routes.get('/events', eventsController.index);
routes.post('/city', cityController.create);
routes.post('/state', stateController.create);
routes.post('/category', categoryController.create);
routes.post('/style', styleController.create);
routes.post('/local', localController.create);

export default routes;