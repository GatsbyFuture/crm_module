import type {FastifyInstance} from "fastify";
import {config} from '../../../config/config';

import {IClient} from "../interfaces/utm.client.interface";

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
            console.log("CLIENT_URL", CLIENT_URL)
            const {data: response} = await this.fastify.axios({
                method: 'GET',
                url: `${CLIENT_URL}/user/get-one`,
                params: {phone_number}
            });

            const {success, data} = response;

            if (!success) return undefined;

            return data;
        } catch (e) {
            // WE MUST SEND ERROR TO TELEGRAM BOT.
            this.fastify.log.error(`❌ KPI API error [getClient]: ${e}`);
            throw e;
        }
    }

    async createClient() {
        try {

        } catch (e) {
            throw e;
        }
    }
}