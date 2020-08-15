import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('events', table => {
        table.increments('id').primary();
        table.string('nomeEvento').notNullable();
        table.string('descricao').notNullable();
        table.string('avatarEvento').notNullable();

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('events');
}