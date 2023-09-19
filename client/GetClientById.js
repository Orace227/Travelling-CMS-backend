import Client from "../schemas/Client.js";

export const GetClienById = async (req, res) => {
  try {
    const { clientId } = await req.query;
    const query = {};

    if (clientId) {
      query.clientId = clientId;
    }

    const OneClient = await Client.find(query);
    res.status(200).json({ OneClient });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
