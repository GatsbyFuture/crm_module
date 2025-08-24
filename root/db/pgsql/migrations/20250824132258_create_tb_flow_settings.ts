import type {Knex} from "knex";
import {config} from '../../../config/config';
import path from "path";
import fs from "fs";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_FLOW_SETTINGS
            },
            SEED_DATA: {
                FLOW_PLATFORMS_PATH
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_FLOW_SETTINGS} table...`);

        await knex.schema.createTable(TB_FLOW_SETTINGS, (t) => {
            t.increments('id').primary();
            t.string('code', 50).notNullable().unique();
            t.string('name', 100).notNullable();
            t.jsonb('meta').notNullable().defaultTo('{}');
            t.boolean('is_active').notNullable().defaultTo(true);
            t.integer('weight').notNullable().defaultTo(0);
            t.timestamps(true, true);
        });

        // this is trigger for updated_at colum in tb_users
        await knex.raw(`
            CREATE TRIGGER update_${TB_FLOW_SETTINGS}_updated_at
            BEFORE UPDATE ON ${TB_FLOW_SETTINGS}
            FOR EACH ROW
            EXECUTE FUNCTION set_updated_at();
        `);

        console.log(`Created ${TB_FLOW_SETTINGS} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_FLOW_SETTINGS} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_FLOW_SETTINGS);
    } catch (e) {
        console.error(`Error creating ${TB_FLOW_SETTINGS} table:`, e);
    }
}