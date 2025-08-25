import type {FastifyInstance} from "fastify";
import {UtmModel} from "./models/utm.model";

import {IUtm} from "./interfaces/utm.interface";

import {CreateUtmDto} from "./dto/create.utm.dto";
import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";
import {QueryFlowPDto} from "../flow_platform/dto/query.flow.p.dto";
import {IFlowP} from "../flow_platform/interfaces/flow.p.interface";
import {QueryUtmDto} from "./dto/query.utm.dto";

export class UtmService {
    private utmModel: UtmModel;

    constructor(protected fastify: FastifyInstance) {
        this.utmModel = new UtmModel(fastify);
    }

    async create(createUtmDto: CreateUtmDto): Promise<IUtm> {
        try {
            const {url, utm_source} = createUtmDto;

            const utm_tag = await this.utmModel.readOne({url, utm_source});

            if (utm_tag) {
                throw new HttpException(ErrorCodes.DATA_ALREADY_EXIST);
            }

            return this.utmModel.create(createUtmDto);
        } catch (e) {
            throw e;
        }
    }

    async getOne(query: Partial<QueryUtmDto>): Promise<IUtm | undefined> {
        try {
            const utm_tag = await this.utmModel.readOne(query);

            if (!utm_tag) {
                throw new HttpException(ErrorCodes.DATA_NOT_FOUND);
            }

            return utm_tag;
        } catch (e) {
            throw e;
        }
    }
}