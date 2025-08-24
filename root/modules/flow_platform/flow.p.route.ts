import type {FastifyInstance} from "fastify";
import {FlowPController} from "./flow.p.controller";

export default async function flowPRoute(fastify: FastifyInstance) {
    const flowPController = new FlowPController(fastify);

}