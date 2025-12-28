import { existsSync, mkdirSync } from 'fs';
import multer from 'multer';
import { extname } from 'path';

type MulterFile = {
  originalname: string;
  mimetype: string;
};

type MulterCallback = (error: Error | null, value: boolean | string) => void;

type DiskStorageOptions = {
  destination: string;
  filename: (req: unknown, file: MulterFile, callback: MulterCallback) => void;
};

type MulterOptions = {
  storage: unknown;
  fileFilter: (req: unknown, file: MulterFile, callback: MulterCallback) => void;
  limits: { fileSize: number };
};

const { diskStorage } = multer as {
  diskStorage: (options: DiskStorageOptions) => unknown;
};

type MulterOptionPropsType = { folder?: string };

export const GenerateMulterOption = ({ folder }: MulterOptionPropsType): MulterOptions => {
  const destFolder = `uploads/${folder ?? 'avatars'}`;

  // ensure destination folder exists (works inside Docker container too)
  const destPath = `./${destFolder}`;

  try {
    if (!existsSync(destPath)) {
      mkdirSync(destPath, { recursive: true });
    }
  } catch (err) {
    // log but don't throw here; multer will surface errors if necessary
    console.error('Failed to ensure upload directory', destPath, err);
  }

  const options: MulterOptions = {
    storage: diskStorage({
      destination: destPath,
      filename: (req, file, callback) => {
        void req;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `avatar-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      void req;
      const allowed = ['image/jpeg', 'image/png', 'image/webp'];

      if (!allowed.includes(file.mimetype)) {
        // Accept false and let controller throw BadRequest for unified response
        return callback(null, false);
      }

      callback(null, true);
    },
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  };

  return options;
};
