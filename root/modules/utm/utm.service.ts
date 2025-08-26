import type {FastifyInstance} from "fastify";
import {UtmModel} from "./models/utm.model";

import {IUtm} from "./interfaces/utm.interface";

import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

import {CreateUtmTagDto} from "./dto/tag/create.utm.tag.dto";
import {QueryUtmTagDto} from "./dto/tag/query.utm.tag.dto";

export class UtmService {
    private utmModel: UtmModel;

    constructor(protected fastify: FastifyInstance) {
        this.utmModel = new UtmModel(fastify);
    }

    async create(createUtmDto: CreateUtmTagDto): Promise<IUtm> {
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

    async getOne(query: Partial<QueryUtmTagDto>): Promise<IUtm | undefined> {
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

    async getAll(query: Partial<QueryUtmTagDto>): Promise<IUtm[]> {
        try {
            return this.utmModel.readAll(query);
        } catch (e) {
            throw e;
        }
    }

    async deleteMany(ids: number[]): Promise<Partial<IUtm>[]> {
        try {
            return this.utmModel.deleteMany(ids);
        } catch (e) {
            throw e;
        }
    }

    // FOR UTM LEAD
    // async utmLead()
}