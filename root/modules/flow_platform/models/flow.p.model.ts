import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IFlowP} from "../interfaces/flow.p.interface";

import {CreateFlowPDto} from "../dto/create.flow.p.dto";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_FLOW_PLATFORMS
            }
        }
    }
} = config;

export class FlowPModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(createBoardRoleDto: CreateFlowPDto): Promise<IFlowP> {
        return this.fastify.pgsql(TB_FLOW_PLATFORMS).insert(createBoardRoleDto)
            .returning('*').then(rows => rows[0]);
    }

    async readOne(query: Partial<QueryBoardRoleDto>): Promise<IFlowP | undefined> {
        return this.fastify.pgsql(TB_FLOW_PLATFORMS).select('*')
            .where(query).first();
    }

    async readAll(query: Partial<QueryBoardRoleDto>): Promise<IFlowP[]> {
        return this.fastify.pgsql(TB_FLOW_PLATFORMS).select('*')
            .where(query);
    }

    async deleteMany(ids: number[]): Promise<Partial<IFlowP>[]> {
        return this.fastify.pgsql(TB_FLOW_PLATFORMS).whereIn('id', ids)
            .returning(['code', 'name']).del();
    }
}