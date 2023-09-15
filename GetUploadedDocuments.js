import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const GetUploadedDocuments = async (req, res) => {
  try {
    const { clientId, bookingType, img } = req.params;

    if (!clientId || !bookingType || !img) {
      // If any of the required parameters are missing, return a 400 Bad Request response.
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const imagePath = path.join(
      __dirname,
      "BookingDocuments",
      clientId,
      bookingType,
      img
    );

    // Check if the file exists, and if it doesn't, return a 404 Not Found response.
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "File not found" });
    }

    res.status(200).sendFile(imagePath);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
