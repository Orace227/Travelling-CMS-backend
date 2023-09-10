import Package from "../schemas/Package.js";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:7000";
export const CreatePackage = async (req, res) => {
  try {
    const PackageObj = await req.body;
    console.log(PackageObj);
    const existingPackage = await Package.findOne({
      PackageId: PackageObj.PackageId,
    });
    if (!existingPackage) {
      // console.log(packageWithImage);
      const createdPackage = await Package.create(PackageObj);
      if (createdPackage) {
        // console.log(createdPackage);
        res.json({
          message: "Package was created!",
          Package: createdPackage,
        });
      }
    } else {
      res.json({
        message: "Package was already exist!!",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
