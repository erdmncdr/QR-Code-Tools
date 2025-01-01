const tabGenerator = document.getElementById('tab-generator');
const tabReader = document.getElementById('tab-reader');
const generatorContent = document.getElementById('generator-content');
const readerContent = document.getElementById('reader-content');
const qrInput = document.getElementById('qr-input');
const generateBtn = document.getElementById('generate-btn');
const qrCanvas = document.getElementById('qr-canvas');
const fileInput = document.getElementById('file-input');
const qrResult = document.getElementById('qr-result');
const qrLink = document.getElementById('qr-link');
const cameraBtn = document.getElementById('camera-btn');
const cameraPreview = document.getElementById('camera-preview');
const languageSwitch = document.getElementById('language-switch');
const downloadBtn = document.getElementById('download-btn');
let activeStream = null;
let scanning = false;
let lastResult = null;

function setLanguage(language) {
    stopCamera();
    const savedResult = qrResult.textContent;
    const savedLink = qrLink.href;
    const wasLinkVisible = qrLink.style.display === 'inline-block';

    if (language === 'en') {
        document.getElementById('title').textContent = 'QR Code Tool';
        document.getElementById('tab-generator').textContent = 'QR Code Generator';
        document.getElementById('tab-reader').textContent = 'QR Code Reader';
        document.getElementById('generate-label').textContent = 'Text or URL to Generate';
        document.getElementById('generate-btn').textContent = 'Generate QR Code';
        document.getElementById('reader-label').textContent = 'Upload QR Code Image';
        document.getElementById('camera-btn').textContent = 'Scan QR Code with Camera';
        document.getElementById('result-label').textContent = 'Result: ';
        qrLink.textContent = 'Go to Link';
        downloadBtn.textContent = 'Download QR Code';
    } else if (language === 'tr') {
        document.getElementById('title').textContent = 'QR Kod Aracı';
        document.getElementById('tab-generator').textContent = 'QR Kod Oluşturucu';
        document.getElementById('tab-reader').textContent = 'QR Kod Okuyucu';
        document.getElementById('generate-label').textContent = 'Oluşturulacak Metin veya URL';
        document.getElementById('generate-btn').textContent = 'QR Kod Oluştur';
        document.getElementById('reader-label').textContent = 'QR Kod Resmi Yükleyin';
        document.getElementById('camera-btn').textContent = 'Kamera ile QR Oku';
        document.getElementById('result-label').textContent = 'Sonuç: ';
        qrLink.textContent = 'Linke Git';
        downloadBtn.textContent = 'QR Kodu İndir';
    }

    if (savedResult !== 'No result yet' && savedResult !== 'Henüz sonuç yok') {
        qrResult.textContent = savedResult;
        if (wasLinkVisible) {
            qrLink.href = savedLink;
            qrLink.style.display = 'inline-block';
        }
    } else {
        qrResult.textContent = language === 'tr' ? 'Henüz sonuç yok' : 'No result yet';
        qrLink.style.display = 'none';
    }
}

languageSwitch.addEventListener('change', (event) => setLanguage(event.target.value));

tabGenerator.addEventListener('click', () => {
    tabGenerator.classList.add('active');
    tabReader.classList.remove('active');
    generatorContent.classList.remove('hidden');
    readerContent.classList.add('hidden');
    stopCamera();
});

tabReader.addEventListener('click', () => {
    tabReader.classList.add('active');
    tabGenerator.classList.remove('active');
    readerContent.classList.remove('hidden');
    generatorContent.classList.add('hidden');
});

generateBtn.addEventListener('click', () => {
    const text = qrInput.value;
    if (!text) {
        alert(languageSwitch.value === 'tr' ? 'Lütfen metin veya URL girin!' : 'Please enter text or URL!');
        return;
    }
    QRCode.toCanvas(qrCanvas, text, { width: 300 }, (error) => {
        if (error) console.error(error);
        else {
            downloadBtn.classList.remove('hidden');
            downloadBtn.textContent = languageSwitch.value === 'tr' ? 'QR Kodu İndir' : 'Download QR Code';
        }
    });
});

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = qrCanvas.toDataURL('image/png');
    link.click();
});

fileInput.addEventListener('change', (event) => {
    stopCamera();
    const file = event.target.files[0];
    if (!file) {
        qrResult.textContent = languageSwitch.value === 'tr' ? 'Lütfen bir dosya seçin.' : 'Please select a file.';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                qrResult.textContent = code.data;
                lastResult = code.data;
                if (code.data.startsWith('http')) {
                    qrLink.href = code.data;
                    qrLink.style.display = 'inline-block';
                } else {
                    qrLink.style.display = 'none';
                }
            } else {
                qrResult.textContent = languageSwitch.value === 'tr' ? 'QR kod bulunamadı.' : 'No QR code detected.';
                qrLink.style.display = 'none';
            }
        };
    };
    reader.readAsDataURL(file);
});

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        activeStream = stream;
        cameraPreview.srcObject = stream;
        cameraPreview.style.display = 'block';
        await cameraPreview.play();
        scanning = true;
        scan();
    } catch (error) {
        alert(languageSwitch.value === 'tr' ? 
            'Kameraya erişilemiyor. Lütfen izinleri kontrol edin.' : 
            'Unable to access camera. Please check your permissions.');
    }
}

function stopCamera() {
    if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
        activeStream = null;
    }
    cameraPreview.style.display = 'none';
    scanning = false;
}

function scan() {
    if (!scanning) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (cameraPreview.videoWidth && cameraPreview.videoHeight) {
        canvas.width = cameraPreview.videoWidth;
        canvas.height = cameraPreview.videoHeight;
        context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
            qrResult.textContent = code.data;
            lastResult = code.data;
            if (code.data.startsWith('http')) {
                qrLink.href = code.data;
                qrLink.style.display = 'inline-block';
            } else {
                qrLink.style.display = 'none';
            }
            stopCamera();
            return;
        }
    }
    
    requestAnimationFrame(scan);
}

cameraBtn.addEventListener('click', () => {
    if (cameraPreview.style.display === 'none') {
        startCamera();
    } else {
        stopCamera();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setLanguage('en');
});
