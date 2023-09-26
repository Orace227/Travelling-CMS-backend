import TravelInquiry from "../schemas/Inquiry.js";

export const CreateInquiry = async (req, res) => {
  try {
    const values = req.body; // Remove the 'await' here
    console.log(values);
    const CreateInquiry = await TravelInquiry.create(values); // Use 'CreateInquiry' instead of 'CreateInqiry'
    if (CreateInquiry) {
      res.status(200).json({ message: "inquiry created!!", CreateInquiry });
    } else {
      res.status(200).json({ error: "Invalid inquiry" });
    }
  } catch (err) {
    res.status(500).json("inquiry was not created");
    console.log({ error: err });
  }
};
