import express from 'express';
import EventsController from './controllers/EventsController';
import CityController from './controllers/CityController';
import StateController from './controllers/StateController';
import CategoryController from './controllers/CategoryController';
import StyleController from './controllers/StyleController';
import LocalController from './controllers/LocalController';
import UsersController from './controllers/UsersController';
import authHeader from './middlewares/auth';

const routes = express.Router();
const eventsController = new EventsController();
const cityController = new CityController();
const stateController = new StateController();
const categoryController = new CategoryController();
const styleController = new StyleController();
const localController = new LocalController();
const usersController = new UsersController();
const AuthHeader = new authHeader();

routes.post('/events', eventsController.create);
routes.get('/events', eventsController.index);

routes.post('/city', cityController.create);
routes.get('/city', cityController.index);
routes.get('/city/:stateId', cityController.getCity);

routes.post('/state', stateController.create);
routes.get('/state', stateController.index);

routes.post('/category', categoryController.create);
routes.get('/category', categoryController.index);

routes.post('/style', styleController.create);
routes.get('/style', styleController.index);
routes.get('/style/:styleId', styleController.getstyleforid);

routes.post('/local', localController.create);
routes.get('/local', localController.index);
routes.get('/local/:cityId', localController.getLocal);

routes.post('/local/data', localController.getlocaldata);

routes.get('/users/:email/:senha', usersController.authenticated);
routes.post('/users', usersController.create);
routes.use(AuthHeader.authentication);
routes.get('/users', usersController.index);
routes.get('/users/:email', usersController.searchforemail);

export default routes;