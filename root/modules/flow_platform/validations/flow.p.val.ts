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