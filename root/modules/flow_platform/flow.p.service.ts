import type {FastifyInstance} from "fastify";
import {FlowPModel} from "./models/flow.p.model";

import {IFlowP} from "./interfaces/flow.p.interface";

import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

import {CreateFlowPDto} from "./dto/create.flow.p.dto";
import {QueryFlowPDto} from "./dto/query.flow.p.dto";

export class FlowPService {
    private flowPModel: FlowPModel;

    constructor(protected fastify: FastifyInstance) {
        this.flowPModel = new FlowPModel(fastify);
    }

    // CRUD
    async create(createFlowPDto: CreateFlowPDto): Promise<IFlowP> {
        try {
            const {name} = createFlowPDto;

            const flow_platform = await this.flowPModel.readOne({name: name});

            if (flow_platform) {
                throw new HttpException(ErrorCodes.FLOW_PLATFORM_ALREADY_EXIST);
            }

            return this.flowPModel.create(createFlowPDto);
        } catch (e) {
            throw e;
        }
    }

    async getOne(query: Partial<QueryFlowPDto>): Promise<IFlowP> {
        try {
            const flow_platform = await this.flowPModel.readOne(query);

            if (!flow_platform) {
                throw new HttpException(ErrorCodes.FLOW_PLATFORM_NOT_FOUND);
            }

            return flow_platform;
        } catch (e) {
            throw e;
        }
    }
}