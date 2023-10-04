import Package from "../schemas/Package.js";
import Client from "../schemas/Client.js";
import Booking from "../schemas/Booking.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import jsdom from "jsdom";
const { JSDOM } = jsdom;

export const BookedPdfGenerator = async (req, res) => {
  try {
    const { clientId, packageId, bookingId } = req.query;

    const packageData = await Package.findOne({ PackageId: packageId });
    const client = await Client.findOne({ clientId });
    const booking = await Booking.findOne({ bookingId });
    console.log({
      packageData,
      client,
      booking124: booking,
      booking: booking.bookingDetails,
    });
    if (packageData && packageData.packageImgPath) {
      const basePath = path.join(__dirname, "..");
      const imagePath = path.join(basePath, packageData?.packageImgPath);
      const imageBuffer = fs.readFileSync(imagePath);
      console.log({ basePath, imagePath, imageBuffer });
      const doc = new PDFDocument({
        size: "letter",
        margin: 50,
      });

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="${packageData.packageName}.pdf"`
      );

      // Set precise margins for the entire page
      const margin = 30;
      doc.page.margins = {
        top: margin,
        bottom: margin,
        left: margin,
        right: margin,
      };

      doc.pipe(res);
      // Add package name with formatting and justification
      doc.fontSize(30).text(packageData.packageName, {
        align: "center",
        margin: { top: 5, bottom: 20 },
        align: "justify",
      });
      // Set the image width to cover the full width of the PDF page
      doc.image(imageBuffer, {
        fit: [500, 300], // Use pdfPageWidth as the width here
        align: "left",
      });
      doc.fontSize(20).text(`  `);

      // Add tour details
      await addHtmlSection(
        doc,
        "Tour Details",
        packageData.packageBody.tourDetails
      );

      doc.fontSize(20).text(`  `);

      // Add inclusions and exclusions
      addSection(
        doc,
        "Inclusions",
        packageData.packageBody.inclusionsAndExclusions.inclusions
      );

      doc.fontSize(20).text(`  `);

      addSection(
        doc,
        "Exclusions",
        packageData.packageBody.inclusionsAndExclusions.exclusions
      );

      doc.fontSize(20).text(`  `);

      // Add terms and conditions
      addSection(
        doc,
        "Terms",
        packageData.packageBody.termsAndConditions.terms
      );

      doc.fontSize(20).text(`  `);

      addSection(
        doc,
        "Conditions",
        packageData.packageBody.termsAndConditions.conditions
      );

      doc.fontSize(20).text(`  `);

      // Add package price if it's not live
      if (!packageData.isLive) {
        doc
          .fontSize(18)
          .text(`Package Price: ${booking.modifiedPackagePrice}`, {
            align: "center",
            margin: { top: 20, bottom: 20 },
            align: "justify",
          });
      }

      doc.fontSize(20).text(`   `);
      doc.fontSize(20).text(`Client Details:`);
      doc.fontSize(10).text(`   `);
      doc
        .fontSize(16)
        .text(`    Client Name: ${client.firstName} ${client.lastName}`, {
          margin: { top: 5, bottom: 20 },
          align: "justify",
        });

      doc.fontSize(20).text(`   `);
      doc.fontSize(20).text(`Booking Details:`);
      doc.fontSize(10).text(`   `);

      for (let i = 0; i < booking.bookingDetails.length; i++) {
        doc
          .fontSize(16)
          .text(
            `    ${i + 1}. booking Name: ${
              booking.bookingDetails[i].bookingName
            }`,
            {
              align: "left",
              margin: { top: 5, bottom: 20 },
              align: "justify",
            }
          );
        doc.fontSize(10).text(`   `);

        let link = `${process.env.link}${booking.bookingDetails[i].docImgPath}`;
        // console.log(`document link(${i}):`, link);

        const buttonText = `Open Link`;
        const text = `               * Document for ${booking.bookingDetails[i].bookingName}: ${buttonText}`;
        doc.fontSize(14).text(text, { link: link, continued: false });
        doc.fontSize(12).text(`  `);
      }
      doc.end();
    } else {
      console.log("some error happened");
    }
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Error generating PDF" });
  }
};

// Function to add a section with title and items
function addSection(doc, title, items) {
  if (items && items.length > 0) {
    // Add section title with formatting and justification
    doc.fontSize(26).text(title, {
      margin: { top: 30, bottom: 20 },
      align: "justify",
    });
    doc.fontSize(10).text(`  `);

    items.forEach((item) => {
      // Add each item with bullet points, spacing, and justification
      doc.fontSize(14).list([`- ${item}`], {
        bulletRadius: 3,
        bulletIndent: 10,
        width: 500,
        align: "justify",
      });
      doc.fontSize(10).text(`  `);
    });
  }
}

//// Function to add a section with title and HTML content
async function addHtmlSection(doc, title, htmlContent) {
  if (htmlContent) {
    // Add section title with formatting and justification
    doc.fontSize(26).text(title, {
      margin: { top: 30, bottom: 20 },
      align: "justify",
    });
    doc.fontSize(10).text(`  `);

    // Parse HTML content using jsdom
    const dom = new JSDOM(htmlContent);
    const body = dom.window.document.body;

    // Function to handle different HTML elements
    const processNode = (node) => {
      // console.log(node.nodeName);
      switch (node.nodeName) {
        case "H2":
          // Handle <h1> as a header
          doc.fontSize(20).text(node.textContent, {
            bold: true,
            margin: { top: 10 },
            align: "justify",
          });
          break;
        case "P":
          // Handle <p> as a paragraph
          doc.fontSize(14).text(node.textContent, {
            margin: { top: 5 },
            align: "justify",
          });
          break;

        case "BR":
          doc.fontSize(10).text(`  `);
          break;
        case "UL":
          // Handle <ul> as a bullet list
          const items = node.querySelectorAll("li");
          items.forEach((item) => {
            doc.fontSize(14).list([item.textContent], {
              bulletRadius: 3,
              bulletIndent: 10,
              width: 480,
              align: "justify",
            });
          });
          break;
        // Add more cases for other HTML elements as needed
        default:
          // Handle other elements as plain text
          // doc.fontSize(14).text(node.textContent, {
          //   margin: { top: 5 },
          //   align: "justify",
          // });
          break;
      }

      // Recursively process child nodes
      node.childNodes.forEach(processNode);
    };

    // Start processing from the root of the document body
    processNode(body);

    doc.fontSize(10).text(`  `);
  }
}
