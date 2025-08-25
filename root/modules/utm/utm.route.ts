import type {FastifyInstance} from 'fastify';
import {UtmController} from "./utm.controller";
import {optsCreateUtm, optsGetOneUtm} from "./validations/utm.val";

export default async function utmRoute(fastify: FastifyInstance) {
    const utmController = new UtmController(fastify);

    fastify.post('/create', optsCreateUtm, utmController.create.bind(utmController));

    fastify.get('/get-one', optsGetOneUtm, utmController.getOne.bind(utmController));
}