import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IUtm} from "../interfaces/utm.interface";

import {CreateUtmDto} from "../dto/create.utm.dto";
import {QueryUtmDto} from "../dto/query.utm.dto";

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

    async create(createUtmDto: CreateUtmDto): Promise<IUtm> {
        return this.fastify.pgsql(TB_UTM_TAGS).insert(createUtmDto)
            .returning('*').then(rows => rows[0]);
    }

    async readOne(query: Partial<QueryUtmDto>): Promise<IUtm | undefined> {
        return this.fastify.pgsql(TB_UTM_TAGS).select('*')
            .where(query).first();
    }

    async readAll(query: Partial<QueryUtmDto>): Promise<IUtm[]> {
        return this.fastify.pgsql(TB_UTM_TAGS).select('*')
            .where(query);
    }

    async deleteMany(ids: number[]): Promise<Partial<IUtm>[]> {
        return this.fastify.pgsql(TB_UTM_TAGS).whereIn('id', ids)
            .returning(['code', 'name']).del();
    }
}