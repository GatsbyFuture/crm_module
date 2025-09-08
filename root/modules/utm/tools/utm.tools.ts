import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IClient} from "../interfaces/utm.client.interface";
import {ILead} from "../interfaces/utm.lead.interface";

import {CreateLeadDto} from "../dto/lead/create.lead.dto";
import {CreateClientDto} from "../dto/lead/create.client.dto";
import {CreateTaskDto} from "../dto/lead/create.task.dto";
import {ITask} from "../interfaces/utm.task.interface";
import {IColumn} from "../interfaces/utm.column.interface";

const {
    EXTRA_DATA: {
        CLIENT_MODULE: {
            URL: CLIENT_URL
        },
        KANBAN_MODULE: {
            URL: KANBAN_URL
        }
    }
} = config;

export class UtmTools {
    constructor(protected fastify: FastifyInstance) {
    }

    async getClient(phone_number: string): Promise<IClient | undefined> {
        try {
            const {data: response} = await this.fastify.axios({
                method: 'GET',
                url: `${CLIENT_URL}/user/get-one`,
                params: {phone_number},
                validateStatus: (s) => s < 500,
            });

            if (!response) {
                return undefined;
            }

            return response.data;
        } catch (e) {
            // WE MUST SEND ERROR TO TELEGRAM BOT.
            this.fastify.log.error(`❌ CLIENT API error [getClient]: ${e}`);
            throw e;
        }
    }

    async createClient(createUtmLeadDto: CreateClientDto): Promise<IClient | undefined> {
        try {
            const {data: response} = await this.fastify.axios({
                method: 'POST',
                url: `${CLIENT_URL}/user/create`,
                headers: {'Content-Type': 'application/json'},
                data: createUtmLeadDto,
                validateStatus: (s) => s < 500
            });

            if (!response) {
                return undefined;
            }

            return response.data;
        } catch (e) {
            this.fastify.log.error(`❌ CLIENT API error [createClient]: ${e}`);
            throw e;
        }
    }

    async createLead(createLeadDto: CreateLeadDto): Promise<ILead | undefined> {
        try {
            const {data: response} = await this.fastify.axios({
                method: 'POST',
                url: `${CLIENT_URL}/lead/create`,
                headers: {'Content-Type': 'application/json'},
                data: createLeadDto,
                // validateStatus: (s) => s < 500
            });

            if (!response) {
                return undefined;
            }

            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<ITask | undefined> {
        try {
            const {data: response} = await this.fastify.axios({
                method: 'POST',
                url: `${KANBAN_URL}/task/create`,
                headers: {'Content-Type': 'application/json'},
                data: createTaskDto,
                // validateStatus: (s) => s < 500
            });

            if (!response) {
                return undefined;
            }

            return response.data;
        } catch (e) {
            throw e;
        }
    }

    async getColumns(board_id: number): Promise<IColumn[]> {
        try {
            const {data: response} = await this.fastify.axios({
                method: 'GET',
                url: `${KANBAN_URL}/column/get-all`,
                params: {board_id},
                validateStatus: (s) => s < 500,
            });

            return response.data;
        } catch (e) {
            // WE MUST SEND ERROR TO TELEGRAM BOT.
            this.fastify.log.error(`❌ CLIENT API error [getColumns]: ${e}`);
            throw e;
        }
    }
}