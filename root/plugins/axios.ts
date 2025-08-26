import type {FastifyInstance} from 'fastify';
import fp from 'fastify-plugin';
import axios from 'axios';

export default fp(async function (fastify: FastifyInstance) {
    fastify.decorate('axios', axios);
});
