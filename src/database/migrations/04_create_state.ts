import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('state', table => {
        table.increments('id').primary();
        table.string('sigla').notNullable().unique();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('state');
}
