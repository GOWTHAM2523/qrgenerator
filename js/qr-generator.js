// Reference to dynamic QR code container
    const dynamicQrContainer = document.querySelector('.dynamic-qr-container');

    // Function to create and display a dynamic QR code box
    function createQRBox(url) {
        const qrBox = document.createElement('div');
        qrBox.classList.add('qr-box');

        // Create canvas for QR code
        const qrCanvas = document.createElement('canvas');
        const qr = new QRious({
            element: qrCanvas,
            value: url,
            size: 300, // Ensure size is sufficient for scanning
            level: 'H' // High error correction
        });

        // Create a download button for the QR code
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download QR';
        downloadButton.classList.add('download-qr');
        downloadButton.addEventListener('click', () => downloadQR(qrCanvas, `custom-qr-code.png`));

        // Append canvas and button to the QR box
        qrBox.appendChild(qrCanvas);
        qrBox.appendChild(downloadButton);
        dynamicQrContainer.appendChild(qrBox);
    }

    // Function to download the QR code as an image
    function downloadQR(canvas, filename) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); // Use the original canvas data
        link.download = filename; // Set the file name
        link.click(); // Trigger the download
    }

    // Function to generate a custom QR code from user input
    function generateCustomQR() {
        const urlInput = document.getElementById('urlInput');
        const url = urlInput.value.trim();

        if (!url || !isValidURL(url)) {
            alert('Please enter a valid URL (e.g., https://example.com).');
            return;
        }

        createQRBox(url);
        urlInput.value = ''; // Clear the input field
    }

    // Function to validate URL
    function isValidURL(url) {
        const pattern = new RegExp(
            '^(https?:\\/\\/)?' + // Protocol
            '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // Domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP address
            '(\\:\\d+)?(\\/[\\w\\-\\.~%]*)*' + // Port and path
            '(\\?[;&\\w\\-\\.~+=]*)?' + // Query string
            '(\\#[\\w\\-]*)?$', // Fragment
            'i'
        );
        return pattern.test(url);
    }


