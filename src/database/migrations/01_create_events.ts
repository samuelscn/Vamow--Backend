import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('events', table => {
        table.increments('id').primary();
        table.string('nome_evento').notNullable();
        table.string('descricao').notNullable();
        table.string('avatarEvento').notNullable();

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        
        table.integer('category_id')
            .notNullable()
            .references('id')
            .inTable('category')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        table.integer('style_id')
            .notNullable()
            .references('id')
            .inTable('style')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('events');
}