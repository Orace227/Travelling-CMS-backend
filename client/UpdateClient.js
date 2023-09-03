import Client from "../schemas/Client.js";

export const UpdateClient = async (req, res) => {
  try {
    const ClientObj = await req.body;
    if (ClientObj) {
      const updateClient = await Client.findOne({
        clientId: ClientObj.clientId,
      });
      if (updateClient) {
        const updatedClient = await Client.updateOne(
          { clientId: ClientObj.clientId },
          ClientObj
        );
        if (updatedClient) {
          // console.log(updatedClient);
          res.json({
            message: `Client was updated Client !!`,
            updatedClient,
          });
        }
      } else {
        res.status(404).json(`Client is not found`);
      }
    } else {
      res.status(500).json(`please add the Client in body`);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};
