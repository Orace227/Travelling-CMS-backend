import multer from "multer";
import path from "path";
import fs from "fs";

// Create a multer instance for handling file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      let { clientId, key } = req.body;
      // bookingType = JSON.parse(bookingType);
      console.log("all keys", key);
      if (!clientId || !key) {
        throw new Error("Invalid request body");
      }
      const folderPath = path.join("BookingDocuments", clientId, key);

      // Create the directory if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      cb(null, folderPath);
    } catch (err) {
      console.error(err);
      cb(err, null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const UploadDocuments = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default UploadDocuments;
