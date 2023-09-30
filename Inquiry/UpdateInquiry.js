import TravelInquiry from "../schemas/Inquiry.js";

export const UpdateInquiry = async (req, res) => {
  try {
    const { _id, isConfirm } = await req.body;
    console.log(req.body);
    const UpdatedInquiry = await TravelInquiry.updateOne(
      { _id },
      { isConfirm: isConfirm }
    );
    if (UpdatedInquiry) {
      // console.log(UpdatedInquiry);
      res.status(200).json({ UpdatedInquiry });
    } else {
      res.status(200).json({ error: "Invalid Inquiry" });
    }
  } catch (err) {
    res.status(404).json("Inquiry not found");
    console.log({ error: err });
  }
};
