import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {FlowSService} from "./flow.s.service";

import {CreateFlowSDto} from "./dto/create.flow.s.dto";
import {QueryFlowSDto} from "./dto/query.flow.s.dto";


export class FlowSController {
    private flowSService: FlowSService;

    constructor(protected fastify: FastifyInstance) {
        this.flowSService = new FlowSService(fastify);
    }

    // CRUD
    async create(req: FastifyRequest, _reply: FastifyReply) {
        const createFlowSDto = req.body as CreateFlowSDto;

        return {
            success: true,
            data: await this.flowSService.create(createFlowSDto)
        }
    }

    async getOne(req: FastifyRequest, reply: FastifyReply) {
        const queryFlowSDto = req.query as QueryFlowSDto;

        return {
            success: true,
            data: await this.flowSService.getOne(queryFlowSDto)
        }
    }
}