import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../database/utils/convertHourToMinutes';

interface ScheduleItem {
    valor: number;
    data: number;
    city: string;
    local: string;
}

interface CategoryItem {
    id: number;
}

interface StyleItem {
    id: number;
}

export default class EventsController {

    async index(request: Request, response: Response) {
        const filters = request.query;

        if (!filters.dia_da_semana || !filters.estilo || !filters.cidade) {
            return response.status(400).json ({
                error: 'Missing filter to search events'
            });
        }
        
        const events = await db('class_schedule')
            .where('class_schedule.estilo', '=' , filters.estilo as string)
            .andWhere('class_schedule.dia_da_semana', '=' , filters.dia_da_semana as string )
            .andWhere('class_schedule.cidade', '=' , filters.cidade as string)
            .join('events', 'class_schedule.events_id', '=', 'events.id')
            .select(['events.*', 'class_schedule.*']);

        return response.json(events);
    }

    async create(request: Request, response: Response) {
        const {
            nome,
            sobrenome,
            email,
            senha,
            avatar,
            nome_evento,
            descricao,
            avatarEvento,
            category,
            style,
            schedule
        } = request.body;

        const trx = await db.transaction();

        try {
            const getIdUsers = await trx('users').insert({
                nome,
                sobrenome,
                email,
                senha,
                avatar
            });

            const user_id = getIdUsers[0];

            const getIdCategory = await trx('category')
                .where('category.nome', '=', category as string)
                .select('category.id');

            const getIdStyle = await trx('style')
                .where('style.nome', style)
                .select('id');

            const category_id = getIdCategory.map((categoryItem: CategoryItem) => {
                return categoryItem.id;
            });

            const style_id = getIdStyle.map((styleItem: StyleItem) => {
                return styleItem.id;
            });

            const getIdEvents = await trx('events').insert({
                nome_evento,
                descricao,
                avatarEvento,
                user_id,
                category_id,
                style_id
            });

            const event_id = getIdEvents[0];

            const classSchedule = schedule.map( (scheduleItem: ScheduleItem) => {
                const local_id =  trx('local')
                    .where('local.nome', '=', scheduleItem.local)
                    .select('local.id');

                const city_id =  trx('city')
                    .where('city.nome', '=', scheduleItem.city)
                    .select('city.id');

                return {
                    event_id,
                    local_id,
                    city_id,
                    valor: scheduleItem.valor,
                    data: scheduleItem.data,
                };
            });

            await trx('schedule').insert(classSchedule);
            await trx.commit();
            
            return response.status(201).send();
        } catch(err) {
            await trx.rollback();
            
            return response.status(400).json({
                error: 'Unexpected error while creating new event'
            })
        }
    }
}