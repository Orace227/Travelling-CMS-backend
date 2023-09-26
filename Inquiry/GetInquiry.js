import TravelInquiry from "../schemas/Inquiry.js";

export const GetInquiries = async (req, res) => {
  try {
    const allInquiries = await TravelInquiry.find({});
    if (allInquiries) {
      res.status(200).json({ allInquiries });
    } else {
      res.status(200).json({ error: "Invalid Inquiries" });
    }
  } catch (err) {
    res.status(404).json("Inquiries not found");
    console.log({ error: err });
  }
};
