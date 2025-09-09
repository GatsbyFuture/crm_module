import type {FastifyInstance} from 'fastify';
import {UtmController} from "./utm.controller";
import {
    optsCreateLead, optsCreateUtm,
    optsGetAllUtm, optsGetOneUtm,
    optsDelManyUtm,
    optsCreateForm,
} from "./validations/utm.val";

export default async function utmRoute(fastify: FastifyInstance) {
    const utmController = new UtmController(fastify);

    fastify.post('/create-tag', optsCreateUtm, utmController.create.bind(utmController));

    fastify.get('/get-one-tag', optsGetOneUtm, utmController.getOne.bind(utmController));

    fastify.get('/get-all-tags', optsGetAllUtm, utmController.getAll.bind(utmController));

    fastify.delete('/delete-many-tags', optsDelManyUtm, utmController.deleteMany.bind(utmController));

    // FOR DIRECTION
    fastify.post('/create-lead', optsCreateLead, utmController.createLead.bind(utmController));

    // DYNAMIC FORM
    fastify.post('/create-form', optsCreateForm, utmController.createForm.bind(utmController));

    fastify.get('/get-one-form', utmController.getOneForm.bind(utmController));
}