window.function = function (html, fileName, quality, zoom, format, orientation, margin, breakBeforeClass, breakAfterClass, avoidClass, customDimensions) {
	// DYNAMIC VALUES
	html = html.value ?? "No HTML content set.";
	fileName = fileName.value ?? "file";
	quality = quality.value ?? 2;
	format = format.value ?? "a4";
	orientation = orientation.value ?? "portrait";
	margin = margin.value ?? 10;
	breakBeforeClass = breakBeforeClass.value ?? "";
	breakAfterClass = breakAfterClass.value ?? "";
	avoidClass = avoidClass.value ?? "";
	zoom = zoom.value ?? 1;
	customDimensions = customDimensions.value ?? null;

	// DOCUMENT FORMAT DIMENSIONS IN MM
	const formatDimensions = {
		a0: [841, 1189],
		a1: [594, 841],
		a2: [420, 594],
		a3: [297, 420],
		a4: [210, 297],
		a5: [148, 210],
		a6: [105, 148],
		a7: [74, 105],
		a8: [52, 74],
		a9: [37, 52],
		a10: [26, 37],
		b0: [1000, 1414],
		b1: [707, 1000],
		b2: [500, 707],
		b3: [353, 500],
		b4: [250, 353],
		b5: [176, 250],
		b6: [125, 176],
		b7: [88, 125],
		b8: [62, 88],
		b9: [44, 62],
		b10: [31, 44],
		c0: [917, 1297],
		c1: [648, 917],
		c2: [458, 648],
		c3: [324, 458],
		c4: [229, 324],
		c5: [162, 229],
		c6: [114, 162],
		c7: [81, 114],
		c8: [57, 81],
		c9: [40, 57],
		c10: [28, 40],
		dl: [110, 220],
		letter: [216, 279],
		government_letter: [203, 267],
		legal: [216, 356],
		junior_legal: [203, 127],
		ledger: [432, 279],
		tabloid: [279, 432],
		credit_card: [54, 86],
	};

	// CALCULATE FINAL DIMENSIONS
	let finalDimensions = [0, 0];
	if (customDimensions) {
		const customDims = customDimensions.split("x").map(Number);
		finalDimensions = customDims.map((dim) => dim * zoom);
	} else {
		const standardDims = formatDimensions[format];
		finalDimensions = standardDims.map((dim) => dim * zoom);
	}

	// UPDATE THE JSPDF OPTIONS WITH CALCULATED DIMENSIONS OR CUSTOM DIMENSIONS
	const jsPDFOptions = customDimensions ? { unit: "mm", format: finalDimensions, orientation } : { unit: "mm", format, orientation };

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
</style>
<button id="downloadPDFButton">${downloadText}</button>
<div id="contentToDownload">${html}</div>
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
      jsPDF: ${jsPDFOptions}
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
