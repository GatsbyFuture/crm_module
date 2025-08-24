import dotenv from 'dotenv';

dotenv.config();

interface Config {
    DB_DATA: {
        PGSQL: {
            CONNECTION: {
                PG_HOST: string,
                PG_PORT: number,
                PG_USER: string,
                PG_PASS: string,
                PG_NAME: string
            },
            TABLES: {
                TB_FLOW_PLATFORMS: string,
                // TB_FLOW_SOURCES: string,
                TB_FLOW_SETTINGS: string,
            },
            SEED_DATA: {
                FLOW_PLATFORMS_PATH: string,
            }
        }
    },
    DB_SESS: {
        CONNECTION: {
            DB_HOST: string;
            DB_PORT: number;
        }
    },
    EXTRA_DATA: {}
}

export const config: Config = {
    DB_DATA: {
        PGSQL: {
            CONNECTION: {
                PG_HOST: getConfigEnv('DB_HOST', '127.0.0.1'),
                PG_PORT: Number(getConfigEnv('DB_PORT', '5432')),
                PG_USER: getConfigEnv('DB_USER', 'super'),
                PG_PASS: getConfigEnv('DB_PASS', 'jop13$'),
                PG_NAME: getConfigEnv('DB_NAME', 'db_call_center_x')
            },
            TABLES: {
                TB_FLOW_PLATFORMS: 'tb_flow_platforms',
                // TB_FLOW_SOURCES: 'tb_flow_sources',
                TB_FLOW_SETTINGS: 'tb_flow_settings',
            },
            SEED_DATA: {
                FLOW_PLATFORMS_PATH: '../../pgsql/json/default.flow.platforms.json',
            }
        }
    },
    DB_SESS: {
        CONNECTION: {
            DB_HOST: getConfigEnv('REDIS_HOST', '127.0.0.1'),
            DB_PORT: Number(getConfigEnv('REDIS_HOST', '6379')),
        }
    },
    EXTRA_DATA: {}
}

function getConfigEnv(name: string, initial = ''): string {
    return process.env[name] || initial;
}