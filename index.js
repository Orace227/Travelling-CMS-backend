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
import { GetBookingsById } from "./booking/GetBookingsById.js";
import UploadDocuments from "./MiddleWares/UploadDocuments.js";
import { GetUploadedDocuments } from "./GetUploadedDocuments.js";
import { CreateCountry } from "./Country/CreateCountry.js";
import { GetCountries } from "./Country/GetCountries.js";
import { UpdateCountry } from "./Country/UpdateCountry.js";
import { DeleteCountry } from "./Country/DeleteCountry.js";
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

app.get("/getBookingsById", GetBookingsById);
app.get("/getBookings", GetBookings);

app.post("/deleteBooking", DeleteBooking);

// update banner images //
app.post("/upload", UploadBanner.single("bannerImage"), async (req, res) => {
  const packageImgPath = req.file.path;

  res.json({ message: "Image uploaded successfully", path: packageImgPath });
});

// get banner images //
app.get("/BannerImg/:imageName", GetPackageImg);

// update documents of booking //
app.post("/upload-images", UploadDocuments.array("docImg"), (req, res) => {
  try {
    // Handle the uploaded files here
    const uploadedFilesPath = req.files;
    console.log("Images uploaded successfully.");

    // Respond with a success message
    res.status(200).json({
      message: "Images uploaded successfully.",
      uploadedFilesPath: uploadedFilesPath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/BookingDocuments/:clientId/:bookingType/:img", GetUploadedDocuments);

// add countries //
app.post("/CreateCountry", CreateCountry);
app.get("/GetCountries", GetCountries);
app.post("/UpdateCountry", UpdateCountry);
app.post("/DeleteCountry", DeleteCountry);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
