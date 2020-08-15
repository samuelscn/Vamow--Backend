import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('class_schedule', table => {
        table.increments('id').primary();
        table.string('cidade').notNullable();
        table.string('local').notNullable();
        table.string('estilo').notNullable();
        table.decimal('valor').notNullable();
        table.integer('dia_da_semana').notNullable();
        table.integer('inicio').notNullable();
        table.integer('termino').notNullable();

        table.integer('events_id')
        .notNullable()
        .references('id')
        .inTable('classes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('class_schedule');
}