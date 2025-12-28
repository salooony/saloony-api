declare module 'multer' {
  type MulterModule = {
    diskStorage: (options: unknown) => unknown;
  };

  const multer: MulterModule;

  export default multer;
}
