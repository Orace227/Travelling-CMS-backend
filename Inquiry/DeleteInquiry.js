import TravelInquiry from "../schemas/Inquiry.js";

export const DeleteInquiry = async (req, res) => {
  try {
    const { id } = req.body;
    const DeletedInquiry = await TravelInquiry.deleteOne({ _id:id });
    if (DeletedInquiry) {
      res.status(200).json("Inquiry is deleted successfully!!");
    } else {
      res.status(403).json({ error: " Inquiry is not deleted successfully!" });
    }
  } catch (err) {
    res.status(404).json("Inquiry not found");
    console.log({ error: err });
  }
};
