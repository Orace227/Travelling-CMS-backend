import Package from "../schemas/Package.js";

export const UpdatePackage = async (req, res) => {
  try {
    const PackageObj = await req.body;
    if (PackageObj) {
      const updatePackage = await Package.findOne({
        PackageId: PackageObj.PackageId,
      });
      if (updatePackage) {
        const updatedPackage = await Package.updateOne(
          { PackageId: PackageObj.PackageId },
          PackageObj
        );
        if (updatedPackage) {
          // console.log(updatedPackage);
          res.json({
            message: `Package was updated Package !!`,
            Package: updatedPackage,
          });
        }
      } else {
        res.status(404).json(`package is not found`);
      }
    } else {
      res.status(500).json(`please add the package in body`);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
