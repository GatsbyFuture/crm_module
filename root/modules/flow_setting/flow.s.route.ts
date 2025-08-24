import type {FastifyInstance} from "fastify";
import {FlowSController} from "./flow.s.controller";


export default async function flowSRoute(fastify: FastifyInstance) {
    const flowSController = new FlowSController(fastify);

}