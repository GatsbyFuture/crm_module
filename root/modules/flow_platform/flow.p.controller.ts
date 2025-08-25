import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {FlowPService} from "./flow.p.service";
import {CreateFlowPDto} from "./dto/create.flow.p.dto";

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
}