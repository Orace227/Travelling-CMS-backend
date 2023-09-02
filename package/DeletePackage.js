import Package from "../schemas/Package.js";

export const DeletePackage = async (req, res) => {
  try {
    const { id } = await req.body;
    if (id) {
      const deletePackage = await Package.findOne({ PackageId: id });
      if (deletePackage) {
        const deletedPackage = await Package.deleteOne({ PackageId: id });
        if (deletedPackage) {
          // console.log(deletedPackage);
          res.json({
            message: `Package was deleted which has id : ${id} !!`,
            Package: deletedPackage,
          });
        }
      } else {
        res.status(404).json(`package with id ${id} is not found`);
      }
    } else {
      res.status(500).json(`we cannot get a package for this id:${id} `);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
