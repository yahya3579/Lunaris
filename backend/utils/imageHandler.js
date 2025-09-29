import multer from "multer";
import fs from "fs";
import path from "path";

const multerStorage = (uploadPath) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const baseName = path
        .basename(file.originalname, ext)
        .replace(/\s+/g, "-");
      cb(null, `${baseName}-${Date.now()}${ext}`);
    },
  });

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new Error("Only images are allowed!"), false);
};

const upload = (folderPath) =>
  multer({
    storage: multerStorage(folderPath),
    fileFilter: multerFilter,
  });

export const uploadReviewUserImage = upload(
  "public/images/reviews/users"
).single("photo");

export const uploadPropertyImages = (req, res, next) => {
  const propertyFolder = `public/images/properties`;
  const reviewFolder = `public/images/reviews/users`;

  // Dynamically add reviewImages fields for up to 10 reviews
  const reviewImageFields = Array.from({ length: 10 }, (_, idx) => ({ name: `reviewImages[${idx}]`, maxCount: 1 }));

  const uploader = upload(propertyFolder).fields([
    { name: "imageCover", maxCount: 1 },
    { name: "images" },
    ...reviewImageFields
  ]);

  uploader(req, res, (err) => {
    if (err) return next(err);
    next();
  });
};

export const deleteImagePromise = (dirSegments, imageFile) => {
  const imageFullPath = path.join(...dirSegments, imageFile);
  return new Promise((resolve, reject) => {
    fs.unlink(imageFullPath, (err) => {
      if (err) {
        console.error(
          `Failed to delete image at ${imageFullPath}:`,
          err.message
        );
        reject(err);
      } else {
        console.log(`Image deleted successfully at ${imageFullPath}`);
        resolve();
      }
    });
  });
};
