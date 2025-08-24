import type {FastifyInstance} from "fastify";
import {FlowSModel} from "./models/flow.s.model";

export class FlowSService {
    private flowSModel: FlowSModel;

    constructor(protected fastify: FastifyInstance) {
        this.flowSModel = new FlowSModel(fastify);
    }

    // CRUD
}