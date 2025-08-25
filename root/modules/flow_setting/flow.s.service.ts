import type {FastifyInstance} from "fastify";
import {FlowSModel} from "./models/flow.s.model";
import {CreateFlowSDto} from "./dto/create.flow.s.dto";
import {IFlowS} from "./interfaces/flow.s.interface";
import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";
import {QueryFlowSDto} from "./dto/query.flow.s.dto";

export class FlowSService {
    private flowSModel: FlowSModel;

    constructor(protected fastify: FastifyInstance) {
        this.flowSModel = new FlowSModel(fastify);
    }

    // CRUD
    async create(createFlowSDto: CreateFlowSDto): Promise<IFlowS> {
        try {
            const {name} = createFlowSDto;

            const flow_setting = await this.flowSModel.readOne({name: name});

            if (flow_setting) {
                throw new HttpException(ErrorCodes.FLOW_SETTING_ALREADY_EXIST);
            }

            return await this.flowSModel.create(createFlowSDto);
        } catch (e) {
            throw e;
        }
    }

    async getOne(query: Partial<QueryFlowSDto>): Promise<IFlowS | undefined> {
        try {
            const flow_setting = await this.flowSModel.readOne(query);

            if (!flow_setting) {
                throw new HttpException(ErrorCodes.FLOW_SETTING_NOT_FOUND);
            }

            return flow_setting;
        } catch (e) {
            throw e;
        }
    }

    async getAll(query: Partial<QueryFlowSDto>): Promise<IFlowS[]> {
        try {
            return await this.flowSModel.readAll(query);
        } catch (e) {
            throw e;
        }
    }
}