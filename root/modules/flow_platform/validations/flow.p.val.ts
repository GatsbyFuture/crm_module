import {RouteShorthandOptions} from "fastify";

const createFlowP = {
    type: 'object',
    required: ['code', 'name'],
    properties: {
        code: {
            type: 'string',
            pattern: '^[A-Z]+$',
            minLength: 1
        },
        name: {type: 'string', minLength: 1},
        meta: {type: 'object'},
        weight: {type: 'number'},
    }
}

export const optsCreateFlowP: RouteShorthandOptions = {
    schema: {
        body: createFlowP
    }
}

const queryGetOneFlowP = {
    type: 'object',
    properties: {
        id: {type: 'integer', minimum: 1},
        code: {type: 'string'},
        name: {type: 'string'},
    },
    anyOf: [
        {required: ['id']},
        {required: ['code']},
        {required: ['name']}
    ]
}

export const optsGetOneFlowP: RouteShorthandOptions = {
    schema: {
        querystring: queryGetOneFlowP,
    }
}

const queryGetAllFlowP = {
    type: 'object',
    properties: {
        id: {type: 'integer', minimum: 1},
        code: {type: 'string'},
        name: {type: 'string'},
    }
}

export const optsGetAllFlowP: RouteShorthandOptions = {
    schema: {
        querystring: queryGetAllFlowP,
    }
}