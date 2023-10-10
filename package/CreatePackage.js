import Package from "../schemas/Package.js";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:7000";

export const CreatePackage = async (req, res) => {
  try {
    const PackageObj = req.body;
    console.log(PackageObj);

    // Check if the package type is valid
    const validPackageTypes = [
      "destination",
      "Wellness Resorts",
      "Wildlife Drives",
      "Sustainable paths",
      "Cruise Vacations",
      "Leisure",
    ];
    if (!validPackageTypes.includes(PackageObj.packageType)) {
      return res.status(400).json({
        message: "Invalid package type!",
      });
    }

    // Check if there are already 4 packages with isShown=true for this type
    if (PackageObj.isShown == "true") {
      const isShownCount = await Package.countDocuments({
        packageType: PackageObj.packageType,
        isShown: true,
      });

      if (isShownCount >= 4) {
        return res.status(422).json({
          message:
            "You cannot make this package shown as there are already 4 packages of this type with isShown=true.",
        });
      }
    }

    const existingPackage = await Package.findOne({
      PackageId: PackageObj.PackageId,
    });

    if (!existingPackage) {
      const createdPackage = await Package.create(PackageObj);
      if (createdPackage) {
        res.json({
          message: "Package was created!",
          Package: createdPackage,
        });
      }
    } else {
      res.status(403).json({
        message: "Package already exists!",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
