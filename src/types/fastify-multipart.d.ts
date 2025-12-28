declare module '@fastify/multipart' {
  import { FastifyPluginAsync } from 'fastify';
  const fastifyMultipart: FastifyPluginAsync<any>;
  export default fastifyMultipart;
}
