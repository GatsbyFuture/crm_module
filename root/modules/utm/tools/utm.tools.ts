import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IClient} from "../interfaces/utm.client.interface";
import {CreateUtmLeadDto} from "../dto/lead/create.utm.lead.dto";

const {
    EXTRA_DATA: {
        CLIENT_MODULE: {
            URL: CLIENT_URL
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

    async createClient(createUtmLeadDto: CreateUtmLeadDto): Promise<IClient | undefined> {
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
}