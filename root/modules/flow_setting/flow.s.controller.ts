import type {FastifyInstance} from "fastify";
import {FlowSService} from "./flow.s.service";


export class FlowSController {
    private flowSService: FlowSService;

    constructor(protected fastify: FastifyInstance) {
        this.flowSService = new FlowSService(fastify);
    }

    // CRUD
}