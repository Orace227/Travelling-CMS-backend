import multer from "multer";
import path from "path";
import fs from "fs";
import { time } from "console";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const { clientId, bookingDetails } = await req.body;
      //   console.log("clientId:", clientId);
      //   console.log("bookingDetails:", bookingDetails);

      if (!clientId || !bookingDetails || bookingDetails.length === 0) {
        throw new Error("Invalid request body");
      }
      const parsedBookingDetails = JSON.parse(bookingDetails);
      // Create a set to ensure unique booking types
      //   console.log(parsedBookingDetails);
      //   for (let i = 0; i < parsedBookingDetails.length; i++) {
      //     const folderPath = path.join(
      //       "BookingDocuments",
      //       clientId,
      //       parsedBookingDetails[i].bookingType
      //     );
      parsedBookingDetails.map((bookingDetails) => {
        const folderPath = path.join(
          "BookingDocuments",
          clientId,
          bookingDetails.bookingType
        );

        console.log("folderPath:", folderPath);

        // Create the directory if it doesn't exist
        fs.mkdirSync(folderPath, { recursive: true });

        cb(null, folderPath);
      });
    } catch (err) {
      console.error(err);
      cb(err, null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Append bookingType at the beginning
  },
});

const UploadDocuments = multer({ storage });
export default UploadDocuments;
