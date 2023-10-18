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
    console.log({
      packageData,
      inclusion: packageData.packageBody.inclusionsAndExclusions.inclusions,
      Exclusions: packageData.packageBody.inclusionsAndExclusions.exclusions,
    });
    const basePath = path.join(__dirname, "..");
    const imagePath = path.join(basePath, packageData.packageImgPath);
    const imageBuffer = fs.readFileSync(imagePath);

    // Calculate the width of the PDF page
    const doc = new PDFDocument();
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
    doc.on("pageAdded", () => {
      // Set precise margins for the entire page
      doc.page.margins = {
        top: margin,
        bottom: margin,
        left: margin,
        right: margin,
      };
    });

    doc.pipe(res);

    // Add package name with formatting and justification
    const logoPath = path.join(basePath, "PDF Generation/logo.png");
    const logoBuffer = fs.readFileSync(logoPath);

    const customFontPath = path.join(__dirname, "BreeSerif-Regular.ttf"); // Update the font path
    const customFont = "Bree Serif";

    doc.registerFont(customFont, customFontPath);
    doc.font("Bree Serif");
    doc.image(logoBuffer, 30, 29, { width: 80, height: 60 });

    const topRightX = doc.page.width - margin;
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

    // Define the maximum page height
    const MAX_PAGE_HEIGHT =
      doc.page.height - doc.page.margins.top - doc.page.margins.bottom;

    // Function to add content while managing page breaks
    function addContent(content, fontSize = 14, align = "justify") {
      const contentHeight = doc.heightOfString(content, {
        width: doc.page.width - doc.page.margins.left - doc.page.margins.right,
        fontSize: fontSize,
      });

      if (doc.y + contentHeight > MAX_PAGE_HEIGHT) {
        doc.addPage();
        doc.y = doc.page.margins.top;
      }

      doc
        .fontSize(fontSize)
        .text(content, doc.page.margins.left, doc.y, { align: align });
      doc.y += contentHeight;
    }
    let dividerY = 125;
    doc
      .strokeColor("#183b83")
      .lineWidth(2)
      .moveTo(doc.page.margins.left, dividerY) // Start from the left margin
      .lineTo(doc.page.width - doc.page.margins.right, dividerY) // End at the right margin
      .stroke();
    // Add package name and tour details
    addContent(packageData.packageName, 22, "center");
    dividerY = 160;
    doc
      .strokeColor("#183b83")
      .lineWidth(2)
      .moveTo(doc.page.margins.left, dividerY) // Start from the left margin
      .lineTo(doc.page.width - doc.page.margins.right, dividerY) // End at the right margin
      .stroke();
    addContent("Tour Details", 16, "center");

    // Loop through tour details
    for (let i = 0; i < packageData.packageBody.tourDetails.length; i++) {
      doc.rect(30, doc.y - 4, doc.page.width - 60, 35).fill("#183b83");
      doc.fillColor("white");

      addContent(
        `Day ${packageData.packageBody.tourDetails[i].day}: ${packageData.packageBody.tourDetails[i].title}`,
        18,
        "center"
      );
      doc.fillColor("black");

      addContent("", 10); // Add spacing
      addHtmlSection(doc, packageData.packageBody.tourDetails[i].description);
      addContent("", 10); // Add spacing
    }

    doc.rect(30, doc.y - 4, doc.page.width - 60, 35).fill("#183b83");
    doc.fillColor("white");
    addContent(`Inclusions`, 18, "center");
    doc.fillColor("black");

    addContent("", 10); // Add spacing
    addSection(doc, packageData.packageBody.inclusionsAndExclusions.inclusions);
    addContent("", 10); // Add spacing

    // Add content of the exclusion section
    doc.rect(30, doc.y - 4, doc.page.width - 60, 35).fill("#183b83");
    doc.fillColor("white");
    addContent(`Exclusions`, 18, "center");
    doc.fillColor("black");

    addContent("", 10); // Add spacing
    addSection(doc, packageData.packageBody.inclusionsAndExclusions.exclusions);
    addContent("", 10); // Add spacing

    doc.rect(30, doc.y - 4, doc.page.width - 60, 35).fill("#183b83");
    doc.fillColor("white");
    addContent(`Terms`, 18, "center");
    doc.fillColor("black");

    addContent("", 10); // Add spacing
    addSection(doc, packageData.packageBody.termsAndConditions.terms);
    addContent("", 10); // Add spacing

    doc.rect(30, doc.y - 4, doc.page.width - 60, 35).fill("#183b83");
    doc.fillColor("white");
    addContent(`Conditions`, 18, "center");
    doc.fillColor("black");

    addContent("", 10); // Add spacing
    addSection(doc, packageData.packageBody.termsAndConditions.conditions);
    addContent("", 10); // Add spacing

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
    // doc.fontSize(7).text(`  `);
    items.forEach((item) => {
      doc.fontSize(14).list([` ${item}`], {
        bulletRadius: 3,
        bulletIndent: 10, // Increase the bulletIndent value to add extra space in front of the bullet points
        width: 520,
        align: "justify",
      });
      doc.fontSize(10).text(`  `);
    });
  }
}

// Function to add a section with title and HTML content
async function addHtmlSection(doc, htmlContent) {
  if (htmlContent) {
    const dom = new JSDOM(htmlContent);
    const body = dom.window.document.body;

    const processNode = (node) => {
      switch (node.nodeName) {
        case "H2":
          doc.fontSize(20).text(node.textContent, {
            bold: true,
            margin: { top: 6 },
            align: "justify",
          });
          break;
        case "P":
          doc.fontSize(14).text(node.textContent, {
            margin: { top: 5 },
            align: "justify",
          });
          break;
        case "BR":
          doc.fontSize(10).text(`  `);
          break;
        case "UL":
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
        default:
          break;
      }

      node.childNodes.forEach(processNode);
    };

    processNode(body);
  }
}
