import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('sobrenome').notNullable();
        table.string('email').notNullable().unique();
        table.string('senha').notNullable();
        table.string('avatar');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}