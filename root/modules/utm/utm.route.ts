import type {FastifyInstance} from 'fastify';
import {UtmController} from "./utm.controller";
import {optsCreateUtm, optsDelManyUtm, optsGetAllUtm, optsGetOneUtm} from "./validations/utm.val";

export default async function utmRoute(fastify: FastifyInstance) {
    const utmController = new UtmController(fastify);

    fastify.post('/create', optsCreateUtm, utmController.create.bind(utmController));

    fastify.get('/get-one', optsGetOneUtm, utmController.getOne.bind(utmController));

    fastify.get('/get-all', optsGetAllUtm, utmController.getAll.bind(utmController));

    fastify.delete('/delete-many', optsDelManyUtm, utmController.deleteMany.bind(utmController));

    // FOR DIRECTION
}