window.function = function (html, fileName, quality, format, orientation, margin, breakBeforeClass, breakAfterClass, avoidClass) {
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

	// CONSTANT VARIABLES
	const downloadText = "Download PDF";
	const downloadColor = "#27272a";
	const downloadingText = "Downloading...";
	const downloadingColor = "#ea580c";
	const doneText = "Done";
	const doneColor = "#16a34a";

	// Convert comma-separated class names into CSS selectors
	const convertToSelectors = (classNames) =>
		classNames
			.split(",")
			.map((name) => name.trim())
			.filter((name) => name)
			.map((name) => `.${name}`)
			.join(", ");

	// Prepare dynamic page break configuration
	const pageBreakConfig = {
		mode: ["css", "legacy"],
	};

	if (breakBeforeClass) {
		pageBreakConfig.before = convertToSelectors(breakBeforeClass);
	}

	if (breakAfterClass) {
		pageBreakConfig.after = convertToSelectors(breakAfterClass);
	}

	if (avoidClass) {
		pageBreakConfig.avoid = convertToSelectors(avoidClass);
	}

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
      pagebreak: ${JSON.stringify(pageBreakConfig)},
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
