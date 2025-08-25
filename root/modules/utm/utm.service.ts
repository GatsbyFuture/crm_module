import type {FastifyInstance} from "fastify";
import {UtmModel} from "./models/utm.model";

import {IUtm} from "./interfaces/utm.interface";

import {CreateUtmDto} from "./dto/create.utm.dto";
import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

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
}