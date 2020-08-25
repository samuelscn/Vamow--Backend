import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('city', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        
        table.string('state_id')
            .notNullable()
            .references('id')
            .inTable('state')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('city');
}
