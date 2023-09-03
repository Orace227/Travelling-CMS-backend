import Client from "../schemas/Client.js";

export const CreateClient = async (req, res) => {
  try {
    const ClientObj = await req.body;
    const existingClient = await Client.findOne({
      ClientId: ClientObj.clientId,
    });
    if (!existingClient) {
      const createdClient = await Client.create(ClientObj);
      if (createdClient) {
        // console.log(createdClient);
        res.json({ message: "Client was created!", Client: createdClient });
      }
    } else {
      res.json({
        message: "Client was already exist!!",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
