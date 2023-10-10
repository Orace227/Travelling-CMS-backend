import Package from "../schemas/Package.js";

export const UpdatePackage = async (req, res) => {
  try {
    const PackageObj = await req.body;
    if (PackageObj) {
      const updatePackage = await Package.findOne({
        PackageId: PackageObj.PackageId,
      });

      if (updatePackage) {
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

        // Check if the package is changing to isShown=true
        if (PackageObj.isShown === "true") {
          // Check if there are already 4 packages with isShown=true for this type
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

        const updatedPackage = await Package.updateOne(
          { PackageId: PackageObj.PackageId },
          PackageObj
        );

        if (updatedPackage) {
          res.json({
            message: "Package was updated successfully!",
            Package: updatedPackage,
          });
        }
      } else {
        res.status(404).json({ message: "Package is not found" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Please provide package data in the request body" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
