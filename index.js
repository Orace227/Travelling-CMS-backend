import express from "express";
import { config as dotenvConfig } from "dotenv";
import connectToMongo from "./db.js";

const app = express();
import cors from "cors";
import { CreatePackage } from "./package/CreatePackage.js";
import { GetPackage } from "./package/GetPackage.js";
import { DeletePackage } from "./package/DeletePackage.js";
import { UpdatePackage } from "./package/UpdatePackage.js";

dotenvConfig();

// here all varables are defined

const port = 5000;

// conncted to db
const db = connectToMongo();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json("api working");
});

// create package//
app.post("/createPackage", CreatePackage);

// get packages//
app.get("/getPackages", GetPackage);

// delete packages//
app.get("/deletePackage", DeletePackage);

// update packages//
app.get("/updatePackage", UpdatePackage);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
