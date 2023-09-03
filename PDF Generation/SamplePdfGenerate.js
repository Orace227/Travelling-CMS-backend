import Package from "../schemas/Package.js";
import PDFDocument from "pdfkit";

export const SamplePdfGenerator = async (req, res) => {
  try {
    const packageId = req.params.id;
    // console.log(packageId);
    // Fetch data from the database using Mongoose
    const packageData = await Package.findOne({ PackageId: packageId });

    // Create a new PDF document using pdfkit
    const doc = new PDFDocument();
    // Set response headers for PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${packageData.packageName}.pdf"`
    );

    // Pipe the PDF content to the response
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(30).text(`${packageData.packageName}`);
    doc.fontSize(20).text(`  `);
    doc.fontSize(20).text(`    Tour Details:`);
    for (let i = 0; i < packageData.packageBody.tourDetails.length; i++) {
      doc.fontSize(10).text(`  `);
      doc.fontSize(14)
        .text(`            ${packageData.packageBody.tourDetails[i].title}:
    `);
      doc
        .fontSize(14)
        .text(`            ${packageData.packageBody.tourDetails[i].description}`);
    }
    doc.fontSize(20).text(`  `);
    //fechting out the inclusion and exclusion//
    doc.fontSize(20).text(`    Inclusions And Exclusions:`);
    doc.fontSize(18).text(`  `);
    doc.fontSize(18).text(`          Inclusions:`);
    doc.fontSize(10).text(`  `);
    for (let i = 0; i < packageData.packageBody.inclusionsAndExclusions.exclusions.length; i++){

    doc.fontSize(14)
        .text(`                   * ${packageData.packageBody.inclusionsAndExclusions.inclusions[i]}
    `);
    }
    doc.fontSize(18).text(`          Exclusions:`);

    for (let i = 0; i < packageData.packageBody.inclusionsAndExclusions.exclusions.length; i++){
    doc.fontSize(10).text(`  `);
    doc
      .fontSize(14)
      .text(`                     * ${packageData.packageBody.inclusionsAndExclusions.exclusions[i]}`);

    }
    
    //fechting out the terms and conditions//
    doc.fontSize(20).text(`  `);
    doc.fontSize(20).text(`    Terms And Conditions:`);
    doc.fontSize(18).text(`  `);
    doc.fontSize(18).text(`          Terms:`);
    doc.fontSize(10).text(`  `);
    for (let i = 0; i < packageData.packageBody.termsAndConditions.terms.length; i++){

    doc.fontSize(14)
        .text(`                   * ${packageData.packageBody.termsAndConditions.terms[i]}
    `);
    }
    doc.fontSize(18).text(`          Conditions:`);

    for (let i = 0; i < packageData.packageBody.termsAndConditions.conditions.length; i++){
    doc.fontSize(10).text(`  `);
    doc
      .fontSize(14)
      .text(`                     * ${packageData.packageBody.termsAndConditions.conditions[i]}`);

    }
    // Add more content as needed

    // End the PDF document
    doc.end();
    console.log(packageData.packageBody.termsAndConditions.terms[0]);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Error generating PDF" });
  }
};
