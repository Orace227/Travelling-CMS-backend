import Package from "../schemas/Package.js";
import Client from "../schemas/Client.js";
import Booking from "../schemas/Booking.js";
import PDFdocument from "pdfkit";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const BookedPdfGenerator = async (req, res) => {
  try {
    console.log(__dirname);
    const { clientId, packageId, bookingId } = req.query;
    console.log({ clientId, packageId, bookingId });

    // const imagePath = path.join(
    //   "C:\\Users\\gklib\\OneDrive\\Documents\\Projects\\Travelling CMS\\backend\\Assests",
    //   "banner.jpg"
    // );

    // * Fetch data from the database for package details
    const packageData = await Package.findOne({ PackageId: packageId });

    // * Fetch data from the database for client details
    const client = await Client.findOne({ clientId });

    // const familyData = await FamilyMember.find({
    //   clientId,
    // });
    // * Fetch data from the database for booking details
    const booking = await Booking.findOne({ bookingId });

    console.log({
      client,
      packageData,
      booking: booking.bookingDetails,
      // hotelDetails: booking.hotelDetails,
      // flightDetails: booking.flightDetails,
    });

    const basePath = path.join(__dirname, ".."); // Go up one directory from the current __dirname
    // console.log(basePath);

    const imagePath = path.join(basePath, packageData.packageImgPath);
    const imageBuffer = fs.readFileSync(imagePath);
    // Create a new PDF document using pdfkit
    const doc = new PDFdocument();

    // Set response headers for PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${packageData.packageName}"`
    );

    // Pipe the PDF content to the response
    doc.pipe(res);

    //////////////////// * added package details in the pdf document //////////////////////////////////////////

    // Add content to the PDF
    doc.fontSize(30).text(`${packageData.packageName}`);
    doc.fontSize(20).text(`  `);

    doc.image(imageBuffer, {
      fit: [470, 300], // Set the width and height of the image
    });

    doc.fontSize(16).text(`  `);
    doc.fontSize(20).text(`    Tour Details:`);
    for (let i = 0; i < packageData.packageBody.tourDetails.length; i++) {
      doc.fontSize(10).text(`  `);
      doc
        .fontSize(18)
        .text(`          ${packageData.packageBody.tourDetails[i].title}:`);
      doc.fontSize(10).text(`  `);
      doc
        .fontSize(14)
        .text(
          `                   * ${packageData.packageBody.tourDetails[i].description}`
        );
    }
    doc.fontSize(20).text(`  `);
    //fechting out the inclusion and exclusion//
    doc.fontSize(20).text(`    Inclusions And Exclusions:`);
    doc.fontSize(10).text(`  `);
    doc.fontSize(18).text(`          Inclusions:`);
    doc.fontSize(10).text(`  `);
    for (
      let i = 0;
      i < packageData.packageBody.inclusionsAndExclusions.inclusions.length;
      i++
    ) {
      doc.fontSize(14)
        .text(`                   * ${packageData.packageBody.inclusionsAndExclusions.inclusions[i]}
    `);
    }
    doc.fontSize(18).text(`          Exclusions:`);

    for (
      let i = 0;
      i < packageData.packageBody.inclusionsAndExclusions.exclusions.length;
      i++
    ) {
      doc.fontSize(10).text(`  `);
      doc
        .fontSize(14)
        .text(
          `                     * ${packageData.packageBody.inclusionsAndExclusions.exclusions[i]}`
        );
    }

    //fechting out the terms and conditions//
    doc.fontSize(20).text(`  `);
    doc.fontSize(20).text(`    Terms And Conditions:`);
    doc.fontSize(10).text(`  `);
    const titleX = 120; // Customize the X-coordinate as needed
    doc.fontSize(18).text("Terms:", titleX, doc.y);
    doc.fontSize(10).text(`  `);
    for (
      let i = 0;
      i < packageData.packageBody.termsAndConditions.terms.length;
      i++
    ) {
      doc
        .fontSize(14)
        .text(
          `         ${i + 1}. ${
            packageData.packageBody.termsAndConditions.terms[i]
          }`,
          {
            align: "justify",
          }
        );
      doc.fontSize(10).text(`  `);
    }
    doc.fontSize(18).text(`          Conditions:`);

    for (
      let i = 0;
      i < packageData.packageBody.termsAndConditions.conditions.length;
      i++
    ) {
      doc.fontSize(10).text(`  `);
      doc
        .fontSize(14)
        .text(
          `                     * ${packageData.packageBody.termsAndConditions.conditions[i]}`
        );
    }

    // * fechting out the price//
    doc.fontSize(20).text(`  `);
    doc.fontSize(20).text(`    Package Price: ${booking.modifiedPackagePrice}`);

    //////////////////// * ADDED client details in the pdf document //////////////////////////////////////////
    doc.fontSize(20).text(`  `);
    doc.fontSize(20).text(`    Client Details:`);
    doc.fontSize(10).text(`  `);
    doc
      .fontSize(16)
      .text(`          Name: ${client.firstName} ${client.lastName}`);

    // //////////////////// * ADDED Booking details in the pdf document //////////////////////////////////////////

    doc.fontSize(20).text(`  `);
    doc.fontSize(20).text(`     Booking Details:`);
    doc.fontSize(10).text(`  `);

    for (let i = 0; i < booking.bookingDetails.length; i++) {
      doc
        .fontSize(18)
        .text(`          ${booking.bookingDetails[i].bookingType} Details:`);
      doc.fontSize(10).text(`  `);
      doc
        .fontSize(16)
        .text(
          `            ${i + 1}.  ${
            booking.bookingDetails[i].bookingType
          } Name: ${booking.bookingDetails[0].bookingName}`
        );
      doc.fontSize(12).text(`  `);
      let link = `http://localhost:7000/${booking.bookingDetails[i].docImgPath}`;
      console.log(`document link(${i}):`, link);
      const buttonText = `Open Link`;
      const text = `                     * Document for ${booking.bookingDetails[i].bookingName}: ${buttonText}`;
      doc.fontSize(14).text(text, { link: link, continued: false });
      doc.fontSize(12).text(`  `);
    }

    //   doc
    //     .fontSize(14)
    //     .text(
    //       `                      * Check Out Date: ${booking.hotelDetails[i].checkOutDate}`
    //     );
    //   doc.fontSize(12).text(`  `);
    //   doc
    //     .fontSize(14)
    //     .text(`                      * Document: <LINK OF THE FILE>`);
    //   doc.fontSize(12).text(`  `);
    // }

    // doc.fontSize(20).text(`  `);
    // doc.fontSize(18).text(`          Flight Details:`);
    // doc.fontSize(18).text(`  `);

    // for (let i = 0; i < booking.flightDetails.length; i++) {
    //   doc
    //     .fontSize(16)
    //     .text(
    //       `            ${i + 1}.  Airline Name: ${
    //         booking.flightDetails[i].airline
    //       }`
    //     );
    //   doc.fontSize(12).text(`  `);

    //   doc
    //     .fontSize(14)
    //     .text(
    //       `                      * Departure Date: ${booking.flightDetails[i].departureDate}`
    //     );
    //   doc.fontSize(12).text(`  `);
    //   doc
    //     .fontSize(14)
    //     .text(
    //       `                      * Return Date: ${booking.flightDetails[i].returnDate}`
    //     );
    //   doc.fontSize(12).text(`  `);
    //   doc
    //     .fontSize(14)
    //     .text(`                      * Document: <LINK OF THE FILE>`);
    //   doc.fontSize(12).text(`  `);
    // }
    // doc.fontSize(10).text(`  `);
    // doc.fontSize(18).text(`          Receipt Details:`);
    // doc.fontSize(10).text(`  `);

    // doc
    //   .fontSize(16)
    //   .text(
    //     `              Payment Method: ${booking.receiptDetails.paymentMethod}`
    //   );
    // doc.fontSize(12).text(`  `);

    // Add more content as needed

    // End the PDF document
    doc.end();

    // console.log(packageData);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Error generating PDF" });
  }
};
