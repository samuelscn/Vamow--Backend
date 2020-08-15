import express from 'express';
import EventsController from './controllers/EventsController';

const routes = express.Router();
const eventsController = new EventsController();

routes.post('/events', eventsController.create);
routes.get('/events', eventsController.index);

export default routes;