import express from "express";
import { config as dotenvConfig } from "dotenv";
import connectToMongo from "./db.js";

import { CreatePackage } from "./package/CreatePackage.js";
import { GetLivePackage } from "./package/GetLivePackage.js";
import { DeletePackage } from "./package/DeletePackage.js";
import { UpdatePackage } from "./package/UpdatePackage.js";
import { SamplePdfGenerator } from "./PDF Generation/SamplePdfGenerate.js";

const app = express();
import cors from "cors";
import { GetDraftPackage } from "./package/GetDraftPackage.js";
import { CreateClient } from "./client/CreateClient.js";
import { GetClients } from "./client/GetClients.js";
import { DeleteClient } from "./client/DeleteClient.js";
import { UpdateClient } from "./client/UpdateClient.js";
import { CreateFamilyMembers } from "./familyMembers/CreateFamilyMember.js";
import { GetFamilyMembers } from "./familyMembers/getClientMembers.js";
import { DeleteFamilyMember } from "./familyMembers/DeleteFamilyMember.js";
import { UpdateFamilyMember } from "./familyMembers/UpdateFamilyMember.js";

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
  res.json({ massage: "Welcome to the Travelling CMS Api Server!!" });
});

// create package//
app.post("/createPackage", CreatePackage);

// get live packages//
app.get("/getLivePackages", GetLivePackage);

// get draft packages//
app.get("/getDraftPackages", GetDraftPackage);

// update packages//
app.post("/updatePackage", UpdatePackage);

// delete packages//
app.post("/deletePackage", DeletePackage);

// generate pdf for all packages//
app.get("/generate-pdf/:id", SamplePdfGenerator);

// create client //
app.post("/createClient", CreateClient);

// get client //
app.get("/getClients", GetClients);

// update client //
app.post("/updateClient", UpdateClient);

// delete client //
app.post("/deleteClient", DeleteClient);

//create a Create Family Members
app.post("/createFamilyMembers", CreateFamilyMembers);

//get all family members for the specified client //
app.get("/getFamilyMembers/:id", GetFamilyMembers);

//update family member //
app.post("/updateFamilyMember", UpdateFamilyMember);

//delete family member //
app.post("/DeleteFamilyMember", DeleteFamilyMember);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
