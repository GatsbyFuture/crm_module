import type {FastifyInstance} from "fastify";
import {FlowSController} from "./flow.s.controller";

import {optsCreateFlowS, optsDelManyFlowS, optsGetAllFlowS, optsGetOneFlowS} from "./validations/flow.s.val";


export default async function flowSRoute(fastify: FastifyInstance) {
    const flowSController = new FlowSController(fastify);

    fastify.post('/create', optsCreateFlowS, flowSController.create.bind(flowSController));

    fastify.get('/get-one', optsGetOneFlowS, flowSController.getOne.bind(flowSController));

    fastify.get('/get-all', optsGetAllFlowS, flowSController.getAll.bind(flowSController));

    fastify.delete('/delete-many', optsDelManyFlowS, flowSController.deleteMany.bind(flowSController));
}