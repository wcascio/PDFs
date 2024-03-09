window.function = function (html) {
    html = html.value ?? "";
  
    return `
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
  <style>
    #downloadPDFButton {
      cursor: pointer;
      position: fixed;
      right: 4px;
      top: 4px;
      font-weight: 600;
      background-color: #FFFFFF;
      box-shadow: 0px 0px 1px rgba(62, 65, 86, 0.24), 0px 4px 8px rgba(62, 65, 86, 0.16);
      color: rgba(44, 44, 44, 0.92);
      border: 0.5px solid #00000024;
      border-radius: 8px;
      height: 32px;
      padding: 0 12px;
      font-size: 0.75rem;
      z-index: 999;
    }
  
    #downloadPDFButton:hover {
      background-color: rgba(0, 0, 0, 0.05);
      box-shadow: 0px 0px 1px rgba(62, 65, 86, 0.32), 0px 4px 8px rgba(62, 65, 86, 0.16);
    }
  </style>
  
  <button id="downloadPDFButton">🖨️ Download PDF</button>
  
  <div id="contentToDownload">
    ${html}
  </div>
  
  <script>
    document.getElementById('downloadPDFButton').addEventListener('click', function() {
      const pdfButton = this;
      const contentElement = document.getElementById('contentToDownload');
      pdfButton.textContent = '⏳ Downloading...';
      pdfButton.style.color = 'orange';
      html2pdf().set({
        pagebreak: { mode: ['css', 'legacy'], avoid: 'table, tr, tbody, thead, tfoot' },
        margin: 0,
        filename: 'custom-name-😎.pdf',
        image: {
          type: 'jpeg',
          quality: 1
        },
        html2canvas: {
          scale: 3,
          useCORS: true
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
        }
      }).from(contentElement).toPdf().get('pdf').then(function() {
        pdfButton.textContent = '🎉 Done';
        pdfButton.style.color = 'green';
        setTimeout(function() {
          pdfButton.textContent = '🖨️ Download PDF';
          pdfButton.style.color = 'rgba(44, 44, 44, 0.92)';
        }, 2000);
      }).save();
    });
  </script>
  `;
  }
  