import { Request, Response } from 'express';
import db from '../database/connection';

export default class StateController {
    
    async create(request: Request, response: Response) {
        const {
            sigla
        } = request.body;

        await db('state').insert({sigla});

        return response.send();
    }
}