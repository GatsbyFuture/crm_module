import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_FLOW_SETTINGS,
                TB_FLOW_PLATFORMS
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_FLOW_SETTINGS} table...`);

        await knex.schema.createTable(TB_FLOW_SETTINGS, (t) => {
            t.increments('id').primary();

            t.integer('platform_id')
                .references('id').inTable(TB_FLOW_PLATFORMS)
                .onDelete('CASCADE').notNullable();
            t.string('platform_code', 50).notNullable();

            t.string('name', 100).notNullable();

            t.integer('board_id').notNullable().defaultTo(0);
            t.integer('column_id').notNullable().defaultTo(0);
            t.string('desc', 100).notNullable().defaultTo('');

            t.jsonb('meta').notNullable().defaultTo('{}');

            t.boolean('is_active').notNullable().defaultTo(true);
            t.timestamps(true, true);

            t.unique(['platform_id', 'board_id', 'column_id'], 'uq_flow_settings_platform_board_column');
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