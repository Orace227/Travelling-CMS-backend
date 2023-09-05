import Package from "../schemas/Package.js";

export const CreatePackage = async (req, res) => {
  try {
    const PackageObj = await req.body;
    const existingPackage = await Package.findOne({
      PackageId: PackageObj.PackageId,
    });
    if (!existingPackage) {
      const createdPackage = await Package.create(PackageObj);
      if (createdPackage) {
        // console.log(createdPackage);
        res.json({ message: "Package was created!", Package: createdPackage });
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
