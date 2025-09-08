import type {Knex} from "knex";
import {config} from '../../../config/config';

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_UTM_FORM
            }
        }
    }
} = config;

export async function up(knex: Knex): Promise<void> {
    try {
        console.log(`Creating ${TB_UTM_FORM} table...`);

        await knex.schema.createTable(TB_UTM_FORM, (t) => {
            t.increments('id').primary();

            t.string('title', 80).notNullable();
            t.string('desc', 200);

            t.jsonb('meta').notNullable().defaultTo(knex.raw(`\'{}\'::jsonb`));

            t.boolean('is_active').notNullable().defaultTo(true);
            t.timestamps(true, true);
        });

        // this is trigger for updated_at colum in tb_utm_form
        await knex.raw(`
            CREATE TRIGGER update_${TB_UTM_FORM}_updated_at
            BEFORE UPDATE ON ${TB_UTM_FORM}
            FOR EACH ROW
            EXECUTE FUNCTION set_updated_at();
        `);

        console.log(`Created ${TB_UTM_FORM} table successfully!!!`);
    } catch (e) {
        console.error(`Error creating ${TB_UTM_FORM} table:`, e);
    }
}


export async function down(knex: Knex): Promise<void> {
    try {
        await knex.schema.dropTableIfExists(TB_UTM_FORM);
    } catch (e) {
        console.error(`Error creating ${TB_UTM_FORM} table:`, e);
    }
}