import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "BannerImg/"); // Store files in the 'uploads' directory
  },
  filename: async (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file
  },
});

const UploadBanner = multer({ storage: storage });

export default UploadBanner;
