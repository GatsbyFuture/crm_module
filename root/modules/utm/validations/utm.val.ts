import {RouteShorthandOptions} from "fastify";

const createUtm = {
    type: 'object',
    required: ['url', 'utm_source'],
    properties: {
        url: {
            type: 'string',
            maxLength: 100,
            pattern: '^https://.*'
        },
        utm_source: {
            type: 'string',
            maxLength: 50,
            pattern: '^[A-Z]+$'
        },
        utm_content: {type: 'string', maxLength: 100},
        utm_medium: {type: 'string', maxLength: 50},
        utm_term: {type: 'string', maxLength: 100},
        utm_campaign: {type: 'string', maxLength: 50},
        meta: {type: 'object'}
    }
};

export const optsCreateUtm: RouteShorthandOptions = {
    schema: {
        body: createUtm
    }
};

const getOneUtm = {
    type: 'object',
    properties: {
        id: {type: 'number', minimum: 1},
        utm_source: {
            type: 'string',
            maxLength: 50,
            pattern: '^[A-Z]+$'
        },
    },
    anyOf: [
        {required: ['id']},
        {required: ['utm_source']},
    ]
}

export const optsGetOneUtm: RouteShorthandOptions = {
    schema: {
        querystring: getOneUtm
    }
}