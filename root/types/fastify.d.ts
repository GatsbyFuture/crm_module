import "fastify";
import {Knex} from "knex";
import {AxiosInstance} from "axios";

declare module "fastify" {
    interface FastifyInstance {
        pgsql: Knex;
        axios: AxiosInstance;
    }
}