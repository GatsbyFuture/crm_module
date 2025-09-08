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
        due_date: {type: 'string'},
        meta: {type: 'object'},
    }
}

export const optsCreateFlowS: RouteShorthandOptions = {
    schema: {
        body: createFlowS
    }
}

const queryGetOneFlowS = {
    type: 'object',
    properties: {
        id: {type: 'integer', minimum: 1},
        platform_id: {type: 'integer', minimum: 1},
        platform_code: {type: 'string', minLength: 1},
        name: {type: 'string'},
        board_id: {type: 'integer'},
        column_id: {type: 'integer'},
        is_active: {type: 'boolean'},
    },
    anyOf: [
        {required: ['id']},
        {required: ['platform_id']},
        {required: ['platform_code']},
        {required: ['board_id']},
        {required: ['column_id']},
    ]
}

export const optsGetOneFlowS: RouteShorthandOptions = {
    schema: {
        querystring: queryGetOneFlowS,
    }
}

const queryGetAllFlowS = {
    type: 'object',
    properties: {
        id: {type: 'integer', minimum: 1},
        platform_id: {type: 'integer', minimum: 1},
        platform_code: {type: 'string', minLength: 1},
        name: {type: 'string'},
        board_id: {type: 'integer'},
        column_id: {type: 'integer'},
        is_active: {type: 'boolean'},
    }
}

export const optsGetAllFlowS: RouteShorthandOptions = {
    schema: {
        querystring: queryGetAllFlowS,
    }
}

const delManyFlowS = {
    type: 'object',
    required: ['ids'],
    properties: {
        ids: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'integer',
                minimum: 1,
            }
        }
    }
}

export const optsDelManyFlowS: RouteShorthandOptions = {
    schema: {
        body: delManyFlowS
    }
}