import multer from "multer";
import fs from "fs";

// Define the destination path for multer uploads
const uploadDestination = "CountryImg/";

// Ensure the directory exists, creating it if it doesn't
if (!fs.existsSync(uploadDestination)) {
  fs.mkdirSync(uploadDestination);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDestination);
  },
  filename: async (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const UploadCountryImg = multer({ storage: storage });

export default UploadCountryImg;
