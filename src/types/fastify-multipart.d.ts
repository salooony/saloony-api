declare module '@fastify/multipart' {
  import { FastifyPluginAsync } from 'fastify';
  const fastifyMultipart: FastifyPluginAsync<any>;
  export default fastifyMultipart;
}

declare module 'fastify' {
  interface FastifyMultipartFile {
    type: 'file';
    toBuffer: () => Promise<Buffer>;
    file: import('stream').Readable;
    fieldname: string;
    filename: string;
    encoding: string;
    mimetype: string;
    fields: Record<string, unknown>;
  }

  interface FastifyRequest {
    file: () => Promise<FastifyMultipartFile | undefined>;
  }
}
