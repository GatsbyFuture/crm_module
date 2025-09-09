import type {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {UtmService} from "./utm.service";

import {CreateUtmTagDto} from "./dto/tag/create.utm.tag.dto";
import {QueryUtmTagDto} from "./dto/tag/query.utm.tag.dto";
import {DeleteUtmTagDto} from "./dto/tag/delete.utm.tag.dto";

import {CreateUtmLeadDto} from "./dto/lead/create.utm.lead.dto";
import {CreateFormDto} from "./dto/form/create.form.dto";
import {QueryFormDto} from "./dto/form/query.form.dto";
import {UpdateFormDto} from "./dto/form/update.form.dto";

export class UtmController {
    private utmService: UtmService;

    constructor(protected fastify: FastifyInstance) {
        this.utmService = new UtmService(fastify);
    }

    async create(req: FastifyRequest, _reply: FastifyReply) {
        const createUtmDto = req.body as CreateUtmTagDto;

        return {
            success: true,
            data: await this.utmService.create(createUtmDto),
        }
    }

    async getOne(req: FastifyRequest, _reply: FastifyReply) {
        const queryUtmDto = req.query as Partial<QueryUtmTagDto>;

        return {
            success: true,
            data: await this.utmService.getOne(queryUtmDto),
        }
    }

    async getAll(req: FastifyRequest, _reply: FastifyReply) {
        const queryUtmDto = req.query as Partial<QueryUtmTagDto>;

        return {
            success: true,
            data: await this.utmService.getAll(queryUtmDto),
        }
    }

    async deleteMany(req: FastifyRequest, _reply: FastifyReply) {
        const deleteUtmDto = req.body as DeleteUtmTagDto;

        return {
            success: true,
            data: await this.utmService.deleteMany(deleteUtmDto.ids),
        }
    }

    // FOR UTM LEAD
    async createLead(req: FastifyRequest, _reply: FastifyReply) {
        const createUtmLeadDto = req.body as CreateUtmLeadDto;

        return {
            success: true,
            data: await this.utmService.createLead(createUtmLeadDto)
        }
    }

    // DYNAMIC FORM
    async createForm(req: FastifyRequest, reply: FastifyReply) {
        const createFormDto = req.body as CreateFormDto;

        return reply.code(201).send({
            success: true,
            data: await this.utmService.createForm(createFormDto),
        });
    }

    async getOneForm(req: FastifyRequest, _reply: FastifyReply) {
        const queryFormDto = req.query as Partial<QueryFormDto>;

        return {
            success: true,
            data: await this.utmService.getOneForm(queryFormDto)
        }
    }

    async getAllForms(req: FastifyRequest, _reply: FastifyReply) {
        const queryFormDto = req.query as Partial<QueryFormDto>;

        return {
            success: true,
            data: await this.utmService.getAllForms(queryFormDto)
        }
    }

    async updateForms(req: FastifyRequest, _reply: FastifyReply) {
        const queryFormDto = req.query as Partial<QueryFormDto>;
        const updateFormDto = req.body as Partial<UpdateFormDto>;

        return {
            success: true,
            data: await this.utmService.updateForms(queryFormDto, updateFormDto)
        }
    }
}