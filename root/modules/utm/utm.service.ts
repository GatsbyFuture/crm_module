import type {FastifyInstance} from "fastify";
import {UtmModel} from "./models/utm.model";
import {UtmTools} from "./tools/utm.tools";

import {IUtm} from "./interfaces/utm.interface";

import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

import {CreateUtmTagDto} from "./dto/tag/create.utm.tag.dto";
import {QueryUtmTagDto} from "./dto/tag/query.utm.tag.dto";
import {CreateUtmLeadDto} from "./dto/lead/create.utm.lead.dto";

export class UtmService {
    private utmModel: UtmModel;
    private utmTools: UtmTools;

    constructor(protected fastify: FastifyInstance) {
        this.utmModel = new UtmModel(fastify);
        this.utmTools = new UtmTools(fastify);
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
    async createLead(createUtmLeadDto: CreateUtmLeadDto): Promise<any> {
        try {
            const {phone_number, full_name, utm_source, meta} = createUtmLeadDto;

            const client = await this.utmTools.getClient(phone_number);

            if (!client) {
                
            }
        } catch (e) {
            throw e;
        }
    }
}