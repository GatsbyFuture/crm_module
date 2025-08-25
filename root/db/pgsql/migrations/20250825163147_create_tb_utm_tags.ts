import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_UTM_TAGS
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_UTM_TAGS} table...`);

        await knex.schema.createTable(TB_UTM_TAGS, (t) => {
            t.increments('id').primary();

            t.string('url', 100).notNullable();

            t.string('utm_source', 50).notNullable().defaultTo('OTHER');
            t.string('utm_content', 100).defaultTo(null);
            t.string('utm_medium', 50).defaultTo(null);
            t.string('utm_term', 100).defaultTo(null);
            t.string('utm_campaign', 50).defaultTo(null);

            t.jsonb('meta').notNullable().defaultTo('{}');

            t.boolean('is_active').notNullable().defaultTo(true);
            t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        });

        console.log(`Created ${TB_UTM_TAGS} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_UTM_TAGS} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_UTM_TAGS);
    } catch (e) {
        console.error(`Error creating ${TB_UTM_TAGS} table:`, e);
    }
}