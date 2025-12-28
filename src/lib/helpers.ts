import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
type MulterOptionPropsType = { folder?: string; type?: string };
export const GenerateMulterOption = ({ folder, type }: MulterOptionPropsType): any => {
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

  const options: any = {
    storage: diskStorage({
      destination: destPath,
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        callback(null, `avatar-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, callback) => {
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
