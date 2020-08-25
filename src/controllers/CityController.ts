import { Request, Response } from 'express';
import db from '../database/connection';

export default class CityController {
    
    async create(request: Request, response: Response) {
        const {
            nome,
            state_id
        } = request.body;

        await db('city').insert({
            nome,
            state_id
        });

        return response.send();
    }
}