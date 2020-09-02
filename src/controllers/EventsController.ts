import { Request, Response } from 'express';
import db from '../database/connection';

interface ScheduleItem {
    value: number;
    month: string;
    day: number;
    year: number;
    city: number;
    local: number;
}

interface StyleItem {
    id: number;
}

export default class EventsController {

    async index(request: Request, response: Response) {
        const filters = request.query;

        const month = filters.month as string;
        const style = filters.style as string;
        const city = filters.city as string;

        if (!filters.month || !filters.style || !filters.city) {
            return response.status(400).json ({
                error: 'Missing filter to search events'
            });
        }
        
        const getIdCity = await db('city')
            .where('city.nome', '=', city)
            .select('id');
        
        const city_id = getIdCity.map((cityItem: StyleItem) => {
            return cityItem.id
        });

        const getIdStyle = await db('style')
            .where('style.nome', '=', style)
            .select('id');

        const style_id = getIdStyle.map((styleItem: StyleItem) => {
            return styleItem.id
        });

        if (month != '1') {
            const filtro = await db('events')
                .where('events.style_id', '=', style_id)
                .join('schedule', 'events.id', '=', 'schedule.event_id')
                .where('schedule.city_id', '=', city_id)
                .where('schedule.month', '=', month)
                .select(['events.*', 'schedule.*']);

                return response.json(filtro);
        } else {
            const filtro = await db('events')
                .where('events.style_id', '=', style_id)
                .join('schedule', 'events.id', '=', 'schedule.event_id')
                .where('schedule.city_id', '=', city_id)
                .select(['events.*', 'schedule.*']);
            
            return response.json(filtro);
        }
    }

    async create(request: Request, response: Response) {
        const {
            id, //number
            eventName,
            description,
            avatar,
            category, //number
            style, //number
            scheduleItems
        } = request.body;

        const trx = await db.transaction();

        try {

            /*const getIdCategory = await trx('category')
                .where('category.nome', '=', category as string)
                .select('category.id');

            const getIdStyle = await trx('style')
                .where('style.nome', style)
                .select('id');

            const category_id = getIdCategory[0].id;

            const style_id = getIdStyle[0].id;*/

            const getIdEvents = await trx('events').insert({
                nome_evento: eventName,
                descricao: description,
                avatarEvento: avatar,
                user_id: id,
                category_id: category,
                style_id: style
            });

            const event_id = getIdEvents[0];

            const classSchedule = scheduleItems.map( (scheduleItem: ScheduleItem) => {
                /*const local_id =  trx('local')
                    .where('local.nome', '=', scheduleItem.local)
                    .select('local.id');

                const city_id =  trx('city')
                    .where('city.nome', '=', scheduleItem.city)
                    .select('city.id');*/

                return {
                    event_id,
                    local_id: scheduleItem.local,
                    city_id: scheduleItem.city,
                    valor: scheduleItem.value,
                    month: scheduleItem.month,
                    day: scheduleItem.day,
                    year: scheduleItem.year,
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