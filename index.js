import express from "express";
import { config as dotenvConfig } from "dotenv";
import connectToMongo from "./db.js";
import { CreatePackage } from "./package/CreatePackage.js";
import { GetLivePackage } from "./package/GetLivePackage.js";
import { DeletePackage } from "./package/DeletePackage.js";
import { UpdatePackage } from "./package/UpdatePackage.js";
import { SamplePdfGenerator } from "./PDF Generation/SamplePdfGenerate.js";
import { GetDraftPackage } from "./package/GetDraftPackage.js";
import { CreateClient } from "./client/CreateClient.js";
import { GetClients } from "./client/GetClients.js";
import { DeleteClient } from "./client/DeleteClient.js";
import { UpdateClient } from "./client/UpdateClient.js";
import { CreateFamilyMembers } from "./familyMembers/CreateFamilyMember.js";
import { GetFamilyMembers } from "./familyMembers/getFamilyMembers.js";
import { DeleteFamilyMember } from "./familyMembers/DeleteFamilyMember.js";
import { UpdateFamilyMember } from "./familyMembers/UpdateFamilyMember.js";
import { GetPackages } from "./package/GetPackages.js";
import { UploadDocuments } from "./Documents/UploadDocuments.js";
import { GetDocuments } from "./Documents/GetDocuments.js";
import { deleteDocument } from "./Documents/DeleteDocument.js";
import UploadBanner from "./MiddleWares/UploadBanner.js";
const app = express();
import cors from "cors";
import { CreateBooking } from "./booking/CreateBooking.js";
import { GetBookings } from "./booking/GetBookings.js";
import { DeleteBooking } from "./booking/DeleteBooking.js";
import { BookedPdfGenerator } from "./PDF Generation/BookedPdfGenerate.js";
import { GetPackageImg } from "./GetPackageImg.js";
dotenvConfig();

// here all varables are defined

const port = 7000;

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

// get packages by country, continent, hostel, destinetion and cruise //
app.get("/getPackages", GetPackages);

// update packages//
app.post("/updatePackage", UpdatePackage);

// delete packages//
app.post("/deletePackage", DeletePackage);

// generate pdf for all packages//
app.get("/generate-pdf/:id", SamplePdfGenerator);
app.get("/BookedPdfGenerate", BookedPdfGenerator);

// upload documents to server //
app.post("/upload-documents", UploadDocuments);

// get documents by family member id //
app.get("/getDocuments/x", GetDocuments);

//delete documents by family member id //
app.post("/deleteDocument", deleteDocument);
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
app.get("/getFamilyMembers", GetFamilyMembers);

//update family member //
app.post("/updateFamilyMember", UpdateFamilyMember);

//delete family member //
app.post("/DeleteFamilyMember", DeleteFamilyMember);

app.post("/createBooking", CreateBooking);

app.get("/getBookings", GetBookings);

app.post("/deleteBooking", DeleteBooking);

app.post("/upload", UploadBanner.single("bannerImage"), async (req, res) => {
  const packageImgPath = req.file.path;

  res.json({ message: "Image uploaded successfully", path: packageImgPath });
});

app.get("/BannerImg/:imageName", GetPackageImg);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
