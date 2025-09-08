import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IUtm} from "../interfaces/utm.interface";

import {CreateUtmTagDto} from "../dto/tag/create.utm.tag.dto";
import {QueryUtmTagDto} from "../dto/tag/query.utm.tag.dto";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_UTM_TAGS
            }
        }
    }
} = config;

export class UtmModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(createUtmDto: CreateUtmTagDto): Promise<IUtm> {
        return this.fastify.pgsql(TB_UTM_TAGS).insert(createUtmDto)
            .returning('*').then(rows => rows[0]);
    }

    async readOne(query: Partial<QueryUtmTagDto>): Promise<IUtm | undefined> {
        return this.fastify.pgsql(TB_UTM_TAGS).select('*')
            .where(query).first();
    }

    async readAll(query: Partial<QueryUtmTagDto>): Promise<IUtm[]> {
        return this.fastify.pgsql(TB_UTM_TAGS).select('*')
            .where(query);
    }

    async deleteMany(ids: number[]): Promise<Partial<IUtm>[]> {
        return this.fastify.pgsql(TB_UTM_TAGS).whereIn('id', ids)
            .returning(['url', 'utm_source']).del();
    }

    // UTM LEAD LOGS
    // async createLogs(log: object): Promise<void> {
    //     await this.fastify.pgsql(TB_FLOW_LOGS).insert(log);
    // }

    // async readLogs(query: object): Promise<any> {
    //     return this.fastify.pgsql(TB_FLOW_LOGS).select('*').where(query);
    // }
}