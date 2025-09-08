import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_FLOW_LOGS
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_FLOW_LOGS} table...`);

        await knex.schema.createTable(TB_FLOW_LOGS, (t) => {
            t.increments('id').primary();

            t.integer('client_id');
            t.integer('lead_id');
            t.integer('task_id');

            t.integer('board_id');
            t.integer('column_id');

            t.jsonb('meta').notNullable().defaultTo(knex.raw(`\'{}\'::jsonb`));

            t.boolean('is_active').notNullable().defaultTo(true);
            t.timestamps(true, true);
        });

        console.log(`Created ${TB_FLOW_LOGS} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_FLOW_LOGS} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_FLOW_LOGS);
    } catch (e) {
        console.error(`Error creating ${TB_FLOW_LOGS} table:`, e);
    }
}