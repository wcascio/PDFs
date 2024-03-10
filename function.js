window.function = function (html, fileName, quality, zoom, format, orientation, margin, breakBeforeClass, breakAfterClass, avoidClass) {
	// DYNAMIC VALUES
	html = html.value ?? "No HTML content set."; // HTML content to be downloaded
	fileName = fileName.value ?? "file"; // Name of the file to be downloaded
	quality = quality.value ?? 2; // Quality of the PDF (1-5)
	format = format.value ?? "a4"; // Format of the PDF (a0-a10, b0-b10, letter, legal, tabloid, ledger, a4, a3, a2, a1, a0)
	orientation = orientation.value ?? "portrait"; // Orientation of the PDF (portrait, landscape)
	margin = margin.value ?? 10; // Margin of the PDF (in mm)
	breakBeforeClass = breakBeforeClass.value ?? ""; // Class to break before
	breakAfterClass = breakAfterClass.value ?? ""; // Class to break after
	avoidClass = avoidClass.value ?? ""; // Class to avoid
	zoom = zoom.value ?? 1;

	// CALCULATE SCALE AND COMPENSATION FOR WIDTH AND HEIGHT
	const scale = zoom; // Zoom factor (e.g., 0.8 for 80%)
	const compensation = 100 / zoom; // Compensate based on zoom (e.g., 125 for a zoom of 0.8)

	// CONSTANT VARIABLES
	const downloadText = "Download PDF"; // Text for the download button
	const downloadColor = "#27272a"; // Color for the download button
	const downloadingText = "Downloading..."; // Text for the download button while downloading
	const downloadingColor = "#ea580c"; // Color for the download button while downloading
	const doneText = "Done"; // Text for the download button when done
	const doneColor = "#16a34a"; // Color for the download button when done

	// DOWNLOAD BUTTON AND FUNCTIONALITY
	const originalHTML = `
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
<style>
  #downloadPDFButton {
    cursor: pointer;
    position: fixed;
    right: 4px;
    top: 4px;
    font-weight: 600;
    background-color: #fafafa;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.16), 0px 4px 8px rgba(0, 0, 0, 0.12);
    color: #27272a;
    border: 0.5px solid #00000024;
    border-radius: 8px;
    height: 32px;
    padding: 0 12px;
    font-size: 0.75rem;
    z-index: 999;
  }
  #downloadPDFButton:hover {
    background-color: #e4e4e7;
    box-shadow: 0px 0px 1px rgba(62, 65, 86, 0.32), 0px 4px 8px rgba(62, 65, 86, 0.16);
  }
  #zoomModifier {
    transform: scale(${scale});
    transform-origin: top left;
    width: ${compensation}%;
    height: ${compensation}%;
  }
</style>
<button id="downloadPDFButton">${downloadText}</button>
<div id="contentToDownload">
<div id="zoomModifier">
${html}
</div>
</div>
<script>
  document.getElementById('downloadPDFButton').addEventListener('click', function() {
    const pdfButton = this;
    const contentElement = document.getElementById('contentToDownload');
    pdfButton.textContent = '${downloadingText}';
    pdfButton.style.color = '${downloadingColor}';
    html2pdf().set({
      pagebreak: { mode: ['css', 'legacy'], before: '${breakBeforeClass}', after: '${breakAfterClass}', avoid: '${avoidClass}' },
      margin: ${margin},
      filename: '${fileName}',
      image: {
        type: 'jpeg',
        quality: 1
      },
      html2canvas: {
        scale: ${quality},
        useCORS: true
      },
      jsPDF: {
        unit: 'mm',
        format: '${format}',
        orientation: '${orientation}'
      }
    }).from(contentElement).toPdf().get('pdf').then(function() {
      pdfButton.textContent = '${doneText}';
      pdfButton.style.color = '${doneColor}';
      setTimeout(function() {
        pdfButton.textContent = '${downloadText}';
        pdfButton.style.color = '${downloadColor}';
      }, 2000);
    }).save();
  });
</script>
`;
	var encodedHtml = encodeURIComponent(originalHTML);
	return "data:text/html;charset=utf-8," + encodedHtml;
};
