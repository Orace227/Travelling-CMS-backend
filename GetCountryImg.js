import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const GetCountryImg = (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "CountryImg", imageName);

  // Send the image file as a response
  res.sendFile(imagePath);
};
