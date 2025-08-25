import type {FastifyInstance} from "fastify";
import {FlowPController} from "./flow.p.controller";

import {optsCreateFlowP, optsGetOneFlowP} from "./validations/flow.p.val";

export default async function flowPRoute(fastify: FastifyInstance) {
    const flowPController = new FlowPController(fastify);

    fastify.post('/create', optsCreateFlowP, flowPController.create.bind(flowPController));

    fastify.get('/get-one', optsGetOneFlowP, flowPController.getOne.bind(flowPController));


}