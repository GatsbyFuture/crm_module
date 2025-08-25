import {RouteShorthandOptions} from "fastify";

const createUtm = {
    type: 'object',
    required: ['url', 'utm_source'],
    properties: {
        url: {type: 'string', maxLength: 100},
        utm_source: {type: 'string', maxLength: 50},
        utm_content: {type: 'string', maxLength: 100},
        utm_medium: {type: 'string', maxLength: 50},
        utm_term: {type: 'string', maxLength: 100},
        utm_campaign: {type: 'string', maxLength: 50},
        meta: {type: 'object'}
    }
}

export const optsCreateUtm: RouteShorthandOptions = {
    schema: {
        body: createUtm
    }
}