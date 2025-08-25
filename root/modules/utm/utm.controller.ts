import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {UtmService} from "./utm.service";
import {CreateUtmDto} from "./dto/create.utm.dto";

export class UtmController {
    private utmService: UtmService;

    constructor(protected fastify: FastifyInstance) {
        this.utmService = new UtmService(fastify);
    }

    async create(req: FastifyRequest, _reply: FastifyReply) {
        const createUtmDto = req.body as CreateUtmDto;

        return {
            success: true,
            data: await this.utmService.create(createUtmDto),
        }
    }
}