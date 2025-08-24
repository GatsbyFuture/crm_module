import type {FastifyInstance} from "fastify";
import {FlowPService} from "./flow.p.service";

export class FlowPController {
    private flowPService: FlowPService;

    constructor(protected fastify: FastifyInstance) {
        this.flowPService = new FlowPService(fastify);
    }
    
    // CRUD
}