import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IUtm} from "../interfaces/utm.interface";

import {CreateUtmTagDto} from "../dto/tag/create.utm.tag.dto";
import {QueryUtmTagDto} from "../dto/tag/query.utm.tag.dto";
import {IUtmForm} from "../interfaces/utm.form.interface";
import {CreateFormDto} from "../dto/form/create.form.dto";
import {QueryFormDto} from "../dto/form/query.form.dto";
import {UpdateFormDto} from "../dto/form/update.form.dto";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {
                TB_UTM_TAGS,
                TB_UTM_FORM
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

    // UTM FORM
    async createForm(createFormDto: CreateFormDto): Promise<IUtmForm> {
        return this.fastify.pgsql(TB_UTM_FORM).insert(createFormDto)
            .returning('*').then(rows => rows[0]);
    }

    async readOneForm(query: Partial<QueryFormDto>): Promise<IUtmForm | undefined> {
        return this.fastify.pgsql(TB_UTM_FORM).select('*')
            .where(query).first();
    }

    async readAllForms(query: Partial<QueryFormDto>): Promise<IUtmForm[]> {
        return this.fastify.pgsql(TB_UTM_FORM).select('*')
            .where(query);
    }

    async updateForms(query: Partial<QueryFormDto>, update: Partial<UpdateFormDto>): Promise<IUtmForm[]> {
        return this.fastify.pgsql(TB_UTM_FORM).update(update)
            .where(query).returning('*');
    }

    async deleteForms(ids: number[]): Promise<Partial<IUtmForm>[]> {
        return this.fastify.pgsql(TB_UTM_FORM).whereIn('id', ids)
            .returning(['title', 'meta']).del();
    }
}