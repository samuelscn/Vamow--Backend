import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('schedule', table => {
        table.increments('id').primary();
        table.decimal('valor').notNullable;
        table.string('month').notNullable();
        table.integer('day').notNullable();
        table.integer('year').notNullable();

        table.string('local_id')
            .notNullable()
            .references('id')
            .inTable('local')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.string('city_id')
            .notNullable()
            .references('id')
            .inTable('city')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.integer('event_id')
            .notNullable()
            .references('id')
            .inTable('events')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('schedule');
}