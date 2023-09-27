import TravelInquiry from "../schemas/Inquiry.js";

export const ReadInquiry = async (req, res) => {
  try {
    let { inquiryId } = await req.query;
    // const query = {};

    // if (inquiryId) {
    //   query._id = inquiryId;
    // }

    const Inquiry = await TravelInquiry.find({ _id: inquiryId });
    res.status(200).json({ Inquiry });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
