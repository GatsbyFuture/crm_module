import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {FlowPService} from "./flow.p.service";
import {CreateFlowPDto} from "./dto/create.flow.p.dto";
import {QueryFlowPDto} from "./dto/query.flow.p.dto";
import {DeleteFlowPDto} from "./dto/delete.flow.p.dto";

export class FlowPController {
    private flowPService: FlowPService;

    constructor(protected fastify: FastifyInstance) {
        this.flowPService = new FlowPService(fastify);
    }

    // CRUD
    async create(req: FastifyRequest, _reply: FastifyReply) {
        const createFlowPDto = req.body as CreateFlowPDto;

        return {
            success: true,
            data: await this.flowPService.create(createFlowPDto)
        }
    }

    async getOne(req: FastifyRequest, _reply: FastifyReply) {
        const queryFlowPDto = req.query as QueryFlowPDto;

        return {
            success: true,
            data: await this.flowPService.getOne(queryFlowPDto)
        }
    }

    async getAll(req: FastifyRequest, _reply: FastifyReply) {
        const queryFlowPDto = req.query as Partial<QueryFlowPDto>;

        return {
            success: true,
            data: await this.flowPService.getAll(queryFlowPDto)
        }
    }

    async deleteMany(req: FastifyRequest, _reply: FastifyReply) {
        const deleteFlowPDto = req.body as DeleteFlowPDto;

        return {
            success: true,
            data: await this.flowPService.deleteMany(deleteFlowPDto.ids)
        }
    }
}