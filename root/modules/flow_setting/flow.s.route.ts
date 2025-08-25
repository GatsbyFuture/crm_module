import type {FastifyInstance} from "fastify";
import {FlowSController} from "./flow.s.controller";

import {optsCreateFlowS} from "./validations/flow.s.val";


export default async function flowSRoute(fastify: FastifyInstance) {
    const flowSController = new FlowSController(fastify);

    fastify.post('/create', optsCreateFlowS, flowSController.create.bind(flowSController));
}