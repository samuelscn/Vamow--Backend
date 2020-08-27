import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('local', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();

        table.integer('city_id')
            .notNullable()
            .references('id')
            .inTable('city')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('local');
}