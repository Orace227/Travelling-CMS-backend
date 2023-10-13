import Package from "../schemas/Package.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import jsdom from "jsdom";
const { JSDOM } = jsdom;

const __dirname = dirname(fileURLToPath(import.meta.url));

export const SamplePdfGenerator = async (req, res) => {
  try {
    const packageId = req.params.id;
    const packageData = await Package.findOne({ PackageId: packageId });
    console.log({ packageData });
    const basePath = path.join(__dirname, "..");
    const imagePath = path.join(basePath, packageData.packageImgPath);
    const imageBuffer = fs.readFileSync(imagePath);

    // Calculate the width of the PDF page
    const doc = new PDFDocument();
    // doc.document.length = 100;
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
    const logoPath = path.join(basePath, "PDF Generation/logo.png");
    const logoBuffer = fs.readFileSync(logoPath);

    const customFontPath = path.join(__dirname, "BreeSerif-Regular.ttf"); // Update the font path
    const customFont = "Bree Serif";

    doc.registerFont(customFont, customFontPath);
    doc.font("Bree Serif");
    doc.image(logoBuffer, 30, 29, { width: 80, height: 60 });

    const topRightX = doc.page.width - margin; // Adjust margin if needed
    const topRightY = margin;

    doc
      .fontSize(10)
      .text("KARTIK MORE", topRightX - 120, topRightY, { align: "right" })
      .text("BLUE ESCAPE TRAVEL SOLUTIONS", topRightX - 250, topRightY + 15, {
        align: "right",
      })
      .text("+919909106564", topRightX - 120, topRightY + 30, {
        align: "right",
      })
      .text("kartik@blueescape.in", topRightX - 120, topRightY + 45, {
        align: "right",
      });
    let dividerY = topRightY + 91; // Adjust the Y-coordinate to move the line lower

    doc
      .strokeColor("#183b83")
      .lineWidth(2)
      .moveTo(doc.page.margins.left, dividerY) // Start from the left margin
      .lineTo(doc.page.width - doc.page.margins.right, dividerY) // End at the right margin
      .stroke();

    doc.fontSize(22).text(packageData.packageName, 60, 90, {
      align: "center",
      margin: { top: 5, bottom: 20 },
    });
    doc.fontSize(16).text("Tour Details", 60, 128, {
      align: "center",
      margin: { top: 5, bottom: 20 },
    });
    dividerY = topRightY + 125; // Adjust the Y-coordinate to move the line lower

    doc
      .strokeColor("#183b83")
      .lineWidth(2)
      .moveTo(doc.page.margins.left, dividerY) // Start from the left margin
      .lineTo(doc.page.width - doc.page.margins.right, dividerY) // End at the right margin
      .stroke();
    // Set the image width to cover the full width of the PDF page
    // doc.image(imageBuffer, {
    //   fit: [490, 300], // Use pdfPageWidth as the width here
    //   align: "left",
    // });
    doc.fontSize(10).text(`  `);

    // dividerY = topRightY + 150; // Adjust the Y-coordinate to move the line lower

    dividerY = 186; // Initialize the dividerY position

    for (let i = 0; i < packageData.packageBody.tourDetails.length; i++) {
      // Draw the horizontal line
      doc
        .strokeColor("#183b83")
        .lineWidth(30)
        .moveTo(doc.page.margins.left, dividerY) // Start from the left margin
        .lineTo(doc.page.width - doc.page.margins.right, dividerY) // End at the right margin
        .stroke();

      dividerY = dividerY - 13; // Initialize the dividerY position

      // Print Day and Title
      doc
        .fontSize(18)
        .fillColor("white")
        .text(
          `Day ${packageData.packageBody.tourDetails[i].day}: ${packageData.packageBody.tourDetails[i].title}`,
          70,
          dividerY,
          {
            align: "center",
          }
        );

      // Print Description (HTML content)
      doc.fillColor("black");
      await addHtmlSection(
        doc,
        packageData.packageBody.tourDetails[i].description
      );
      doc.fontSize(10).text(`  `); // Add space between entries

      // Update dividerY for the next entry
      dividerY = doc.y + 20; // You can adjust the value (e.g., 30) as needed for spacing
    }

    doc.fontSize(20).text(`  `);
    doc
      .strokeColor("#183b83")
      .lineWidth(30)
      .moveTo(doc.page.margins.left, doc.y) // Start from the current vertical position
      .lineTo(doc.page.width - doc.page.margins.right, doc.y) // End at the right margin
      .stroke();

    // Add the "Inclusions" section title
    doc
      .fontSize(20)
      .fillColor("white")
      .text("Inclusions", 40, doc.y - 13, {
        align: "center",
      });
    // Add inclusions and exclusions
    doc.fillColor("black");

    addSection(doc, packageData.packageBody.inclusionsAndExclusions.inclusions);

    doc.fontSize(20).text(`  `);

    const lineLength = 500; // Adjust the desired length
    doc
      .strokeColor("#183b83")
      .lineWidth(30)
      .moveTo(doc.page.margins.left, doc.y) // Start from the left margin
      .lineTo(doc.page.margins.left + lineLength, doc.y) // Extend the line to the right
      .stroke();

    // Add the "Inclusions" section title
    doc
      .fontSize(20)
      .fillColor("white")
      .text("Exclusions", 30, doc.y - 13, {
        align: "center",
      });
    // Add inclusions and exclusions
    doc.fillColor("black");

    addSection(doc, packageData.packageBody.inclusionsAndExclusions.exclusions);

    doc.fontSize(10).text(`  `);

    doc
      .strokeColor("#183b83")
      .lineWidth(30)
      .moveTo(doc.page.margins.left, doc.y) // Start from the current vertical position
      .lineTo(doc.page.width - doc.page.margins.right, doc.y) // End at the right margin
      .stroke();

    // Add the "Inclusions" section title
    doc
      .fontSize(20)
      .fillColor("white")
      .text("Terms", 40, doc.y - 13, {
        align: "center",
      });
    // Add inclusions and exclusions
    doc.fillColor("black");

    // Add terms and conditions
    addSection(doc, packageData.packageBody.termsAndConditions.terms);

    doc.fontSize(20).text(`  `);

    doc
      .strokeColor("#183b83")
      .lineWidth(30)
      .moveTo(doc.page.margins.left, doc.y) // Start from the current vertical position
      .lineTo(doc.page.width - doc.page.margins.right, doc.y) // End at the right margin
      .stroke();

    // Add the "Inclusions" section title
    doc
      .fontSize(20)
      .fillColor("white")
      .text("Conditions", 40, doc.y - 13, {
        align: "center",
      });
    // Add inclusions and exclusions
    doc.fillColor("black");

    addSection(doc, packageData.packageBody.termsAndConditions.conditions);

    doc.fontSize(20).text(`  `);

    // Add package price if it's not live
    if (!packageData.isLive) {
      doc.fontSize(20).text(`Package Price: ${packageData.packagePrice}`, {
        align: "center",
        margin: { top: 20, bottom: 20 },
        align: "justify",
      });
    }

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Error generating PDF" });
  }
};

// Function to add a section with title and items
function addSection(doc, items) {
  if (items && items.length > 0) {
    // Add section title with formatting and justification
    doc.fontSize(7).text(`  `);
    items.forEach((item) => {
      // Add each item with bullet points, spacing, and justification
      doc.fontSize(14).list([` ${item}`], {
        bulletRadius: 3,
        bulletIndent: 10,
        width: 520,
        align: "justify",
      });
      doc.fontSize(10).text(`  `);
    });
  }
}

//// Function to add a section with title and HTML content
async function addHtmlSection(doc, htmlContent) {
  if (htmlContent) {
    // Add section title with formatting and justification

    // Parse HTML content using jsdom
    const dom = new JSDOM(htmlContent);
    const body = dom.window.document.body;
    // doc.fontSize(10).text(`  `);

    // Function to handle different HTML elements
    const processNode = (node) => {
      console.log(node.nodeName);
      switch (node.nodeName) {
        case "H2":
          // Handle <h1> as a header
          doc.fontSize(20).text(node.textContent, {
            bold: true,
            margin: { top: 6 },
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
  }
}
