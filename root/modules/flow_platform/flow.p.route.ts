import type {FastifyInstance} from "fastify";
import {FlowPController} from "./flow.p.controller";

import {optsCreateFlowP, optsDelManyFlowP, optsGetAllFlowP, optsGetOneFlowP} from "./validations/flow.p.val";

export default async function flowPRoute(fastify: FastifyInstance) {
    const flowPController = new FlowPController(fastify);

    fastify.post('/create', optsCreateFlowP, flowPController.create.bind(flowPController));

    fastify.get('/get-one', optsGetOneFlowP, flowPController.getOne.bind(flowPController));

    fastify.get('/get-all', optsGetAllFlowP, flowPController.getAll.bind(flowPController));

    fastify.delete('/delete-many', optsDelManyFlowP, flowPController.deleteMany.bind(flowPController));
}