import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IFlowS} from "../interfaces/flow.s.interface";
import {CreateFlowSDto} from "../dto/create.flow.s.dto";
import {QueryFlowSDto} from "../dto/query.flow.s.dto";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_FLOW_SETTINGS
            }
        }
    }
} = config;

export class FlowSModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(createFlowSDto: CreateFlowSDto): Promise<IFlowS> {
        const pgsql = this.fastify.pgsql;

        const rows = await pgsql(TB_FLOW_SETTINGS)
            .insert(createFlowSDto)
            .onConflict(['platform_id', 'board_id', 'column_id'])
            .merge({
                platform_code: pgsql.raw('excluded.platform_code'),
                name: pgsql.raw('excluded.name'),
                desc: pgsql.raw('excluded."desc"'),
                meta: pgsql.raw('excluded.meta'),
                updated_at: pgsql.fn.now(),
            })
            .returning('*');

        return rows[0];
    }

    async readOne(query: Partial<QueryFlowSDto>): Promise<IFlowS | undefined> {
        return this.fastify.pgsql(TB_FLOW_SETTINGS).select('*')
            .where(query).first();
    }

    async readAll(query: Partial<QueryFlowSDto>): Promise<IFlowS[]> {
        return this.fastify.pgsql(TB_FLOW_SETTINGS).select('*')
            .where(query);
    }

    async deleteMany(ids: number[]): Promise<Partial<IFlowS>[]> {
        return this.fastify.pgsql(TB_FLOW_SETTINGS).whereIn('id', ids)
            .returning(['platform_code', 'name', 'desc']).del();
    }
}