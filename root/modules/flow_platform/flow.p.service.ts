import type {FastifyInstance} from "fastify";
import {FlowPModel} from "./models/flow.p.model";

export class FlowPService {
    private flowPModel: FlowPModel;

    constructor(protected fastify: FastifyInstance) {
        this.flowPModel = new FlowPModel(fastify);
    }

    // CRUD
}