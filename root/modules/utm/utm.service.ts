import type {FastifyInstance} from "fastify";
import {UtmModel} from "./models/utm.model";
import {FlowPModel} from "../flow_platform/models/flow.p.model";
import {FlowSModel} from "../flow_setting/models/flow.s.model";
import {UtmTools} from "./tools/utm.tools";

import {IUtm} from "./interfaces/utm.interface";
import {IClient} from "./interfaces/utm.client.interface";
import {ILead} from "./interfaces/utm.lead.interface";

import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

import {CreateUtmTagDto} from "./dto/tag/create.utm.tag.dto";
import {QueryUtmTagDto} from "./dto/tag/query.utm.tag.dto";
import {CreateUtmLeadDto} from "./dto/lead/create.utm.lead.dto";
import {CreateLeadDto} from "./dto/lead/create.lead.dto";
import {CreateClientDto} from "./dto/lead/create.client.dto";
import {CreateTaskDto} from "./dto/lead/create.task.dto";

export class UtmService {
    private utmModel: UtmModel;
    private flowPModel: FlowPModel;
    private flowSModel: FlowSModel;
    private utmTools: UtmTools;

    constructor(protected fastify: FastifyInstance) {
        this.utmModel = new UtmModel(fastify);
        this.flowPModel = new FlowPModel(fastify);
        this.flowSModel = new FlowSModel(fastify);
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
            const {phone_number, full_name, utm_source, extra, time_period} = createUtmLeadDto;

            let client: IClient | undefined;
            let lead: ILead | undefined;

            client = await this.utmTools.getClient(phone_number);

            if (!client) {
                const createClientDto: CreateClientDto = {
                    phone_number: phone_number,
                    full_name: full_name,
                }

                client = await this.utmTools.createClient(createClientDto);
            }

            if (client) {
                const platform = await this.flowPModel.readOne({code: utm_source});

                const createLeadDto: CreateLeadDto = {
                    platform_id: platform?.id || 1, // WE CAN GET FROM PLATFORM
                    client_id: client.id,
                    status: platform?.status || "BASE", // WE CAN GET FROM PLATFORM
                    extra: extra,
                    time_period: time_period || null
                }

                lead = await this.utmTools.createLead(createLeadDto);

                if (lead) {
                    console.log(lead);


                    // const createTaskDto: CreateTaskDto = {
                    //     // board_id: platform
                    // };
                    // const task = await this.utmTools.createTask();

                    // console.log(task);
                }
            }

            return client;
        } catch (e) {
            throw e;
        }
    }
}