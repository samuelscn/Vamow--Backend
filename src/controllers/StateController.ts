import { Request, Response } from 'express';
import db from '../database/connection';

export default class StateController {
    
    async index(request: Request, response: Response) {
        const getStateInformation = await db('state').select();
        
        return response.json(getStateInformation);
    }

    async create(request: Request, response: Response) {
        const {
            sigla
        } = request.body;

        await db('state').insert({sigla});

        return response.send();
    }
}