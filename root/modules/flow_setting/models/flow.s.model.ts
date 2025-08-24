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

    async create(createBoardRoleDto: CreateFlowSDto): Promise<IFlowS> {
        return this.fastify.pgsql(TB_FLOW_SETTINGS).insert(createBoardRoleDto)
            .returning('*').then(rows => rows[0]);
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
            .returning(['code', 'name']).del();
    }
}