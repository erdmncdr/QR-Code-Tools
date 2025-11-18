// ===========================
// Modern JavaScript for QR Code Studio
// ===========================

'use strict';

// ===========================
// State Management
// ===========================
const state = {
    currentLanguage: 'en',
    currentTheme: 'light',
    activeStream: null,
    scanning: false,
    lastResult: null,
    currentTemplate: 'text',
    qrHistory: []
};

// ===========================
// DOM Elements
// ===========================
const elements = {
    // Theme
    themeToggle: document.getElementById('theme-toggle'),

    // Language
    languageSwitch: document.getElementById('language-switch'),

    // Tabs
    tabGenerator: document.getElementById('tab-generator'),
    tabReader: document.getElementById('tab-reader'),
    generatorContent: document.getElementById('generator-content'),
    readerContent: document.getElementById('reader-content'),

    // Generator
    qrTemplate: document.getElementById('qr-template'),
    qrInput: document.getElementById('qr-input'),
    qrSize: document.getElementById('qr-size'),
    qrColor: document.getElementById('qr-color'),
    generateBtn: document.getElementById('generate-btn'),
    qrCanvas: document.getElementById('qr-canvas'),
    qrPreview: document.getElementById('qr-preview'),
    downloadBtn: document.getElementById('download-btn'),
    copyBtn: document.getElementById('copy-btn'),

    // Reader
    fileInput: document.getElementById('file-input'),
    uploadArea: document.getElementById('upload-area'),
    cameraBtn: document.getElementById('camera-btn'),
    cameraContainer: document.getElementById('camera-container'),
    cameraPreview: document.getElementById('camera-preview'),
    closeCameraBtn: document.getElementById('close-camera'),
    resultCard: document.getElementById('result-card'),
    qrResult: document.getElementById('qr-result'),
    qrLink: document.getElementById('qr-link'),
    copyResultBtn: document.getElementById('copy-result-btn'),

    // Toast
    toastContainer: document.getElementById('toast-container')
};

// ===========================
// Translations
// ===========================
const translations = {
    en: {
        title: 'QR Code Studio',
        subtitle: 'Create & Scan with Style',
        tabGenerator: 'QR Generator',
        tabReader: 'QR Scanner',
        generateLabel: 'Text or URL to Generate',
        generateBtn: 'Generate QR Code',
        uploadLabel: 'Click to upload or drag & drop',
        cameraBtnText: 'Scan with Camera',
        cameraBtnStop: 'Stop Camera',
        orText: 'or',
        resultLabel: 'Scan Result',
        downloadBtn: 'Download',
        copyBtn: 'Copy Image',
        copyText: 'Copy Text',
        openLink: 'Open Link',
        footerText: 'Made with modern web technologies',
        // Notifications
        enterText: 'Please enter text or URL!',
        qrGenerated: 'QR Code generated successfully!',
        qrDownloaded: 'QR Code downloaded!',
        imageCopied: 'Image copied to clipboard!',
        textCopied: 'Text copied to clipboard!',
        selectFile: 'Please select a file.',
        noQRFound: 'No QR code detected.',
        qrDetected: 'QR Code detected!',
        cameraError: 'Unable to access camera. Please check your permissions.',
        copyError: 'Failed to copy to clipboard.',
        fileTooLarge: 'File is too large. Please select a file under 10MB.',
        invalidFileType: 'Invalid file type. Please select an image file.',
        themeSwitched: 'Theme switched to',
        light: 'light',
        dark: 'dark'
    },
    tr: {
        title: 'QR Kod Studio',
        subtitle: 'Stil ile Oluştur & Tara',
        tabGenerator: 'QR Oluşturucu',
        tabReader: 'QR Tarayıcı',
        generateLabel: 'Oluşturulacak Metin veya URL',
        generateBtn: 'QR Kod Oluştur',
        uploadLabel: 'Yüklemek için tıklayın veya sürükleyin',
        cameraBtnText: 'Kamera ile Tara',
        cameraBtnStop: 'Kamerayı Durdur',
        orText: 'veya',
        resultLabel: 'Tarama Sonucu',
        downloadBtn: 'İndir',
        copyBtn: 'Resmi Kopyala',
        copyText: 'Metni Kopyala',
        openLink: 'Linki Aç',
        footerText: 'Modern web teknolojileri ile yapılmıştır',
        // Bildirimler
        enterText: 'Lütfen metin veya URL girin!',
        qrGenerated: 'QR Kod başarıyla oluşturuldu!',
        qrDownloaded: 'QR Kod indirildi!',
        imageCopied: 'Resim panoya kopyalandı!',
        textCopied: 'Metin panoya kopyalandı!',
        selectFile: 'Lütfen bir dosya seçin.',
        noQRFound: 'QR kod bulunamadı.',
        qrDetected: 'QR Kod algılandı!',
        cameraError: 'Kameraya erişilemiyor. Lütfen izinleri kontrol edin.',
        copyError: 'Panoya kopyalanamadı.',
        fileTooLarge: 'Dosya çok büyük. Lütfen 10MB\'dan küçük bir dosya seçin.',
        invalidFileType: 'Geçersiz dosya türü. Lütfen bir resim dosyası seçin.',
        themeSwitched: 'Tema değiştirildi:',
        light: 'açık',
        dark: 'koyu'
    }
};

// ===========================
// Toast Notification System
// ===========================
const toast = {
    show(message, type = 'info', duration = 3000) {
        const toastEl = document.createElement('div');
        toastEl.className = `toast toast-${type}`;

        const icons = {
            success: `<svg class="toast-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>`,
            error: `<svg class="toast-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="15" y1="9" x2="9" y2="15"/>
                      <line x1="9" y1="9" x2="15" y2="15"/>
                    </svg>`,
            info: `<svg class="toast-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                     <circle cx="12" cy="12" r="10"/>
                     <line x1="12" y1="16" x2="12" y2="12"/>
                     <line x1="12" y1="8" x2="12.01" y2="8"/>
                   </svg>`
        };

        toastEl.innerHTML = `
            ${icons[type]}
            <span class="toast-message">${message}</span>
        `;

        elements.toastContainer.appendChild(toastEl);

        setTimeout(() => {
            toastEl.classList.add('removing');
            setTimeout(() => toastEl.remove(), 300);
        }, duration);
    }
};

// ===========================
// Theme Management
// ===========================
const theme = {
    init() {
        // Check for saved theme preference or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.set(savedTheme, false);
    },

    set(newTheme, showNotification = true) {
        state.currentTheme = newTheme;
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        if (showNotification) {
            const lang = translations[state.currentLanguage];
            toast.show(`${lang.themeSwitched} ${lang[newTheme]}`, 'info');
        }
    },

    toggle() {
        const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
        this.set(newTheme);
    }
};

// ===========================
// Language Management
// ===========================
const language = {
    set(lang) {
        state.currentLanguage = lang;
        this.updateUI();
        localStorage.setItem('language', lang);
    },

    updateUI() {
        const t = translations[state.currentLanguage];

        // Update text content
        document.getElementById('title').textContent = t.title;
        document.getElementById('subtitle').textContent = t.subtitle;
        document.querySelector('#tab-generator span').textContent = t.tabGenerator;
        document.querySelector('#tab-reader span').textContent = t.tabReader;
        document.getElementById('generate-label').innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 7h16M4 12h16M4 17h10"/>
            </svg>
            ${t.generateLabel}
        `;
        document.querySelector('#generate-btn span') ?
            document.querySelector('#generate-btn span').textContent = t.generateBtn : null;
        document.getElementById('upload-label-text').textContent = t.uploadLabel;
        document.querySelector('#camera-btn span').textContent = t.cameraBtnText;
        document.getElementById('or-text').textContent = t.orText;
        document.getElementById('result-label').textContent = t.resultLabel;
        document.getElementById('footer-text').textContent = t.footerText;

        // Update button texts if they exist
        if (elements.downloadBtn) elements.downloadBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            ${t.downloadBtn}
        `;

        if (elements.copyBtn) elements.copyBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            ${t.copyBtn}
        `;

        if (elements.copyResultBtn) elements.copyResultBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            ${t.copyText}
        `;

        if (elements.qrLink) elements.qrLink.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            ${t.openLink}
        `;
    }
};

// ===========================
// Tab Management
// ===========================
const tabs = {
    switchTo(tab) {
        if (tab === 'generator') {
            elements.tabGenerator.classList.add('active');
            elements.tabReader.classList.remove('active');
            elements.tabGenerator.setAttribute('aria-selected', 'true');
            elements.tabReader.setAttribute('aria-selected', 'false');
            elements.generatorContent.classList.remove('hidden');
            elements.readerContent.classList.add('hidden');
            camera.stop();
        } else if (tab === 'reader') {
            elements.tabReader.classList.add('active');
            elements.tabGenerator.classList.remove('active');
            elements.tabReader.setAttribute('aria-selected', 'true');
            elements.tabGenerator.setAttribute('aria-selected', 'false');
            elements.readerContent.classList.remove('hidden');
            elements.generatorContent.classList.add('hidden');
        }
    }
};

// ===========================
// Template Handler
// ===========================
const templates = {
    switch(templateType) {
        // Hide all templates
        document.querySelectorAll('.template-form').forEach(form => {
            form.classList.add('hidden');
        });

        // Show selected template
        const selectedTemplate = document.getElementById(`${templateType}-template`);
        if (selectedTemplate) {
            selectedTemplate.classList.remove('hidden');
        }

        state.currentTemplate = templateType;
    },

    buildContent(templateType) {
        switch (templateType) {
            case 'text':
                return elements.qrInput.value.trim();

            case 'wifi': {
                const ssid = document.getElementById('wifi-ssid').value.trim();
                const password = document.getElementById('wifi-password').value;
                const encryption = document.getElementById('wifi-encryption').value;
                if (!ssid) return '';
                return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
            }

            case 'email': {
                const email = document.getElementById('email-address').value.trim();
                const subject = document.getElementById('email-subject').value;
                const body = document.getElementById('email-body').value;
                if (!email) return '';
                let mailto = `mailto:${email}`;
                const params = [];
                if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
                if (body) params.push(`body=${encodeURIComponent(body)}`);
                if (params.length > 0) mailto += '?' + params.join('&');
                return mailto;
            }

            case 'sms': {
                const number = document.getElementById('sms-number').value.trim();
                const message = document.getElementById('sms-message').value;
                if (!number) return '';
                return `smsto:${number}:${message}`;
            }

            case 'tel': {
                const number = document.getElementById('tel-number').value.trim();
                if (!number) return '';
                return `tel:${number}`;
            }

            case 'vcard': {
                const name = document.getElementById('vcard-name').value.trim();
                const phone = document.getElementById('vcard-phone').value;
                const email = document.getElementById('vcard-email').value;
                const org = document.getElementById('vcard-org').value;
                const url = document.getElementById('vcard-url').value;

                if (!name) return '';

                let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
                vcard += `FN:${name}\n`;
                if (phone) vcard += `TEL:${phone}\n`;
                if (email) vcard += `EMAIL:${email}\n`;
                if (org) vcard += `ORG:${org}\n`;
                if (url) vcard += `URL:${url}\n`;
                vcard += 'END:VCARD';
                return vcard;
            }

            default:
                return '';
        }
    }
};

// ===========================
// QR History
// ===========================
const history = {
    load() {
        const saved = localStorage.getItem('qr-history');
        if (saved) {
            try {
                state.qrHistory = JSON.parse(saved);
            } catch (e) {
                state.qrHistory = [];
            }
        }
    },

    save(data, template) {
        const entry = {
            data: data,
            template: template,
            timestamp: Date.now(),
            date: new Date().toLocaleString()
        };

        state.qrHistory.unshift(entry);
        if (state.qrHistory.length > 20) {
            state.qrHistory = state.qrHistory.slice(0, 20);
        }

        localStorage.setItem('qr-history', JSON.stringify(state.qrHistory));
    }
};

// ===========================
// QR Code Generator
// ===========================
const generator = {
    async generate() {
        const text = templates.buildContent(state.currentTemplate);
        const t = translations[state.currentLanguage];

        if (!text) {
            toast.show(t.enterText, 'error');
            return;
        }

        try {
            const size = parseInt(elements.qrSize.value);
            const color = elements.qrColor.value;

            await QRCode.toCanvas(elements.qrCanvas, text, {
                width: size,
                color: {
                    dark: color,
                    light: '#ffffff'
                },
                margin: 2,
                errorCorrectionLevel: 'H'
            });

            elements.qrPreview.classList.remove('hidden');
            toast.show(t.qrGenerated, 'success');

            // Save to history
            history.save(text, state.currentTemplate);
        } catch (error) {
            console.error('QR Generation Error:', error);
            toast.show('Error generating QR code', 'error');
        }
    },

    download() {
        const t = translations[state.currentLanguage];
        const link = document.createElement('a');
        link.download = `qr-code-${Date.now()}.png`;
        link.href = elements.qrCanvas.toDataURL('image/png');
        link.click();
        toast.show(t.qrDownloaded, 'success');
    },

    async copyImage() {
        const t = translations[state.currentLanguage];
        try {
            const blob = await new Promise(resolve =>
                elements.qrCanvas.toBlob(resolve, 'image/png')
            );

            if (navigator.clipboard && blob) {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                toast.show(t.imageCopied, 'success');
            } else {
                throw new Error('Clipboard API not supported');
            }
        } catch (error) {
            console.error('Copy Error:', error);
            toast.show(t.copyError, 'error');
        }
    }
};

// ===========================
// QR Code Reader
// ===========================
const reader = {
    async readFromFile(file) {
        const t = translations[state.currentLanguage];

        if (!file) {
            toast.show(t.selectFile, 'error');
            return;
        }

        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            toast.show(t.fileTooLarge, 'error');
            return;
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
            toast.show(t.invalidFileType, 'error');
            return;
        }

        try {
            const imageData = await this.getImageData(file);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                this.displayResult(code.data);
                toast.show(t.qrDetected, 'success');
            } else {
                toast.show(t.noQRFound, 'error');
            }
        } catch (error) {
            console.error('Read Error:', error);
            toast.show('Error reading QR code', 'error');
        }
    },

    getImageData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context.drawImage(img, 0, 0);
                    resolve(context.getImageData(0, 0, canvas.width, canvas.height));
                };
                img.onerror = reject;
                img.src = e.target.result;
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    displayResult(data) {
        state.lastResult = data;
        elements.qrResult.textContent = data;
        elements.resultCard.classList.remove('hidden');

        // Check if it's a URL
        if (data.startsWith('http://') || data.startsWith('https://')) {
            elements.qrLink.href = data;
            elements.qrLink.classList.remove('hidden');
        } else {
            elements.qrLink.classList.add('hidden');
        }
    },

    async copyResult() {
        const t = translations[state.currentLanguage];
        try {
            await navigator.clipboard.writeText(state.lastResult);
            toast.show(t.textCopied, 'success');
        } catch (error) {
            console.error('Copy Error:', error);
            toast.show(t.copyError, 'error');
        }
    }
};

// ===========================
// Camera Management
// ===========================
const camera = {
    async start() {
        const t = translations[state.currentLanguage];

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });

            state.activeStream = stream;
            elements.cameraPreview.srcObject = stream;
            elements.cameraContainer.classList.remove('hidden');

            await elements.cameraPreview.play();
            state.scanning = true;
            this.scan();

            // Update button text
            elements.cameraBtn.querySelector('span').textContent = t.cameraBtnStop;
        } catch (error) {
            console.error('Camera Error:', error);
            toast.show(t.cameraError, 'error');
        }
    },

    stop() {
        if (state.activeStream) {
            state.activeStream.getTracks().forEach(track => track.stop());
            state.activeStream = null;
        }

        elements.cameraContainer.classList.add('hidden');
        state.scanning = false;

        const t = translations[state.currentLanguage];
        elements.cameraBtn.querySelector('span').textContent = t.cameraBtnText;
    },

    scan() {
        if (!state.scanning) return;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (elements.cameraPreview.videoWidth && elements.cameraPreview.videoHeight) {
            canvas.width = elements.cameraPreview.videoWidth;
            canvas.height = elements.cameraPreview.videoHeight;
            context.drawImage(elements.cameraPreview, 0, 0, canvas.width, canvas.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                reader.displayResult(code.data);
                const t = translations[state.currentLanguage];
                toast.show(t.qrDetected, 'success');
                this.stop();
                return;
            }
        }

        requestAnimationFrame(() => this.scan());
    },

    toggle() {
        if (elements.cameraContainer.classList.contains('hidden')) {
            this.start();
        } else {
            this.stop();
        }
    }
};

// ===========================
// Drag & Drop Support
// ===========================
const dragDrop = {
    init() {
        const uploadArea = elements.uploadArea;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.style.borderColor = 'var(--accent-primary)';
                uploadArea.style.background = 'var(--bg-glass)';
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.style.borderColor = 'var(--border-color)';
                uploadArea.style.background = 'var(--bg-hover)';
            });
        });

        uploadArea.addEventListener('drop', (e) => {
            const file = e.dataTransfer.files[0];
            if (file) {
                reader.readFromFile(file);
            }
        });
    }
};

// ===========================
// Event Listeners
// ===========================
const events = {
    init() {
        // Theme toggle
        elements.themeToggle.addEventListener('click', () => theme.toggle());

        // Language switch
        elements.languageSwitch.addEventListener('change', (e) => {
            language.set(e.target.value);
        });

        // Tab switching
        elements.tabGenerator.addEventListener('click', () => tabs.switchTo('generator'));
        elements.tabReader.addEventListener('click', () => tabs.switchTo('reader'));

        // Template switching
        elements.qrTemplate.addEventListener('change', (e) => {
            templates.switch(e.target.value);
        });

        // Generator
        elements.generateBtn.addEventListener('click', () => generator.generate());
        elements.qrInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                generator.generate();
            }
        });
        elements.downloadBtn.addEventListener('click', () => generator.download());
        elements.copyBtn.addEventListener('click', () => generator.copyImage());

        // Reader
        elements.fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) reader.readFromFile(file);
        });
        elements.cameraBtn.addEventListener('click', () => camera.toggle());
        elements.closeCameraBtn.addEventListener('click', () => camera.stop());
        elements.copyResultBtn.addEventListener('click', () => reader.copyResult());

        // Drag & Drop
        dragDrop.init();
    }
};

// ===========================
// Initialization
// ===========================
const init = () => {
    // Initialize theme
    theme.init();

    // Initialize language
    const savedLanguage = localStorage.getItem('language') || 'en';
    elements.languageSwitch.value = savedLanguage;
    language.set(savedLanguage);

    // Load QR history
    history.load();

    // Initialize events
    events.init();

    console.log('🎨 QR Code Studio initialized successfully!');
};

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
