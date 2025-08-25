import {RouteShorthandOptions} from "fastify";

const createFlowS = {
    type: 'object',
    required: ['platform_id', 'platform_code', 'name', 'board_id'],
    properties: {
        platform_id: {type: 'integer', minimum: 1},
        platform_code: {type: 'string'},
        name: {type: 'string', minLength: 1},
        board_id: {type: 'integer', minimum: 1},
        column_id: {type: 'integer', minimum: 1},
        desc: {type: 'string'},
        meta: {type: 'object'},
    }
}

export const optsCreateFlowS: RouteShorthandOptions = {
    schema: {
        body: createFlowS
    }
}