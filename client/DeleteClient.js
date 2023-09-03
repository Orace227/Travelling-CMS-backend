import Client from "../schemas/Client.js";

export const DeleteClient = async (req, res) => {
  try {
    const { clientId } = await req.body;
    if (clientId) {
      const deleteClient = await Client.findOne({ clientId });
      if (deleteClient) {
        const deletedClient = await Client.deleteOne({ clientId });
        if (deletedClient) {
          // console.log(deletedClient);
          res.json({
            message: `Client was deleted which has id : ${clientId} !!`,
            deletedClient,
          });
        }
      } else {
        res.status(404).json(`Client with id ${clientId} is not found`);
      }
    } else {
      res.status(500).json(`we cannot get a Client for this id:${clientId} `);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
