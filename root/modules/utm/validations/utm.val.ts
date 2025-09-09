import {RouteShorthandOptions} from "fastify";

const createUtm = {
    type: 'object',
    required: ['url', 'utm_source'],
    properties: {
        url: {
            type: 'string',
            maxLength: 100,
            pattern: '^https?://.*',
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

const getAllUtm = {
    type: 'object',
    properties: {
        id: {type: 'number', minimum: 1},
        utm_source: {
            type: 'string',
            maxLength: 50,
            pattern: '^[A-Z]+$'
        },
    }
}

export const optsGetAllUtm: RouteShorthandOptions = {
    schema: {
        querystring: getAllUtm
    }
}

const delManyUtm = {
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

export const optsDelManyUtm: RouteShorthandOptions = {
    schema: {
        body: delManyUtm
    }
}

const createLead = {
    type: 'object',
    required: ['phone_number', 'full_name', 'utm_source'],
    additionalProperties: false,
    properties: {
        phone_number: {
            type: 'string',
            minLength: 9,
        },
        full_name: {
            type: 'object',
            required: ['first_name', 'last_name'],
            additionalProperties: false,
            properties: {
                first_name: {type: 'string', minLength: 1},
                last_name: {type: 'string', minLength: 1},
                middle_name: {type: 'string', minLength: 1, nullable: true}
            }
        },
        utm_source: {type: 'string', minLength: 1},
        extra: {
            type: 'object',
        },
        meta: {
            type: 'object',
        }
    }
};

export const optsCreateLead: RouteShorthandOptions = {
    schema: {body: createLead}
};

// DYNAMIC FORM
const createForm = {
    type: 'object',
    required: ['title', 'meta'],
    properties: {
        title: {type: 'string', minLength: 1},
        desc: {type: 'string', minLength: 1},
        meta: {
            type: 'object',
            required: ['phone_number', 'full_name'],
            properties: {
                phone_number: {type: 'string', minLength: 9},
                full_name: {
                    type: 'object',
                    required: ['first_name', 'last_name'],
                    properties: {
                        first_name: {type: 'string', minLength: 2},
                        last_name: {type: 'string', minLength: 2},
                        middle_name: {type: 'string', minLength: 2, nullable: true}
                    }
                }
            },
            additionalProperties: true,
        }
    }
}

export const optsCreateForm: RouteShorthandOptions = {
    schema: {
        body: createForm
    }
}

const queryOneForm = {
    type: 'object',
    properties: {
        id: {type: 'number', minimum: 1},
        title: {type: 'string', minLength: 1},
    },
    anyOf: [
        {required: ['id']},
        {required: ['title']}
    ]
}

export const optsQueryOneForm: RouteShorthandOptions = {
    schema: {
        querystring: queryOneForm
    }
}

const queryAllForms = {
    type: 'object',
    properties: {
        id: {type: 'number', minimum: 1},
        title: {type: 'string', minLength: 1},
    }
}

export const optsQueryAllForms: RouteShorthandOptions = {
    schema: {
        querystring: queryAllForms
    }
}