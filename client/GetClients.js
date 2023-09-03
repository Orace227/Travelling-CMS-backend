import Client from "../schemas/Client.js";

export const GetClients = async (req, res) => {
  try {
    const allClients = await Client.find({});
    res.status(200).json({ allClients });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
