# 🎨 QR Code Studio

<div align="center">

**Modern & Stylish QR Code Generator and Scanner**

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

[English](#english) | [Türkçe](#türkçe)

</div>

---

## English

### ✨ Features

#### 🎨 Modern Design (2026)
- **Glassmorphism UI** - Frosted glass effect with backdrop blur
- **Dark/Light Theme** - Automatic theme persistence with smooth transitions
- **Gradient Backgrounds** - Animated, eye-catching gradients
- **Smooth Animations** - Micro-interactions and transitions
- **Responsive Design** - Perfect on mobile, tablet, and desktop

#### 🚀 QR Code Generation
- Generate QR codes from any text or URL
- **Customizable size** (200px - 600px)
- **Color picker** for QR code customization
- **Download as PNG** with timestamp
- **Copy to clipboard** - Direct image copy
- Real-time preview with smooth animations

#### 📷 QR Code Scanning
- **Upload image** files (PNG, JPG, WebP)
- **Drag & drop** support for easy file upload
- **Camera scanning** with visual overlay
- Automatic URL detection and "Open Link" button
- **Copy result** to clipboard
- File validation (type and size checks)

#### 🌍 Multi-language Support
- 🇬🇧 English
- 🇹🇷 Türkçe
- Language preference saved locally

#### 🔔 User Experience
- **Toast notifications** instead of alerts
- Loading states and visual feedback
- Error handling with helpful messages
- Keyboard shortcuts (Enter to generate)
- Accessibility features (ARIA labels, focus states)

### 🛠️ Technologies

- **HTML5** - Semantic markup with accessibility
- **CSS3** - Modern features (Custom Properties, Animations, Glassmorphism)
- **Vanilla JavaScript (ES6+)** - Modular architecture
- **QRCode.js** - QR code generation
- **jsQR** - QR code scanning
- **LocalStorage API** - Theme and language persistence
- **Clipboard API** - Copy functionality
- **MediaDevices API** - Camera access

### 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/erdmncdr/QR-Code-Tools.git
cd QR-Code-Tools
```

2. Open `QR_code_reader_generater.html` in your browser:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Or just open the HTML file directly
open QR_code_reader_generater.html
```

3. That's it! No build process required.

### 🎯 Usage

#### Generate QR Code
1. Click on "QR Generator" tab
2. Enter your text or URL
3. Choose size and color (optional)
4. Click "Generate QR Code"
5. Download or copy the QR code

#### Scan QR Code
1. Click on "QR Scanner" tab
2. Choose one of these options:
   - Upload an image file
   - Drag and drop an image
   - Use your camera to scan
3. View the result and copy or open the link

### 🎨 Theme Customization

The app uses CSS Custom Properties for easy theming. To customize colors, edit the CSS variables in `style.css`:

```css
:root {
    --accent-primary: #6366f1;
    --accent-secondary: #8b5cf6;
    --text-primary: #111827;
    /* ... more variables */
}
```

### 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### 📱 PWA Ready

The app includes PWA meta tags and is ready to be converted to a Progressive Web App.

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### 📄 License

This project is licensed under the MIT License.

### 👨‍💻 Author

**Erdoğan Emre Çedar**
- GitHub: [@erdmncdr](https://github.com/erdmncdr)

---

## Türkçe

### ✨ Özellikler

#### 🎨 Modern Tasarım (2026)
- **Glassmorphism Arayüz** - Buzlu cam efekti ve arka plan bulanıklığı
- **Koyu/Açık Tema** - Otomatik tema kalıcılığı ve yumuşak geçişler
- **Gradient Arka Planlar** - Animasyonlu, göz alıcı gradyanlar
- **Yumuşak Animasyonlar** - Mikro etkileşimler ve geçişler
- **Responsive Tasarım** - Mobil, tablet ve masaüstünde mükemmel görünüm

#### 🚀 QR Kod Oluşturma
- Herhangi bir metin veya URL'den QR kod oluşturma
- **Özelleştirilebilir boyut** (200px - 600px)
- **Renk seçici** ile QR kod özelleştirme
- **PNG olarak indirme** (zaman damgalı)
- **Panoya kopyalama** - Doğrudan resim kopyalama
- Gerçek zamanlı önizleme ve yumuşak animasyonlar

#### 📷 QR Kod Okuma
- Resim dosyası **yükleme** (PNG, JPG, WebP)
- **Sürükle-bırak** desteği ile kolay yükleme
- Görsel yardımcı ile **kamera tarama**
- Otomatik URL algılama ve "Linki Aç" butonu
- Sonucu **panoya kopyalama**
- Dosya doğrulama (tip ve boyut kontrolü)

#### 🌍 Çoklu Dil Desteği
- 🇬🇧 İngilizce
- 🇹🇷 Türkçe
- Dil tercihi yerel olarak kaydedilir

#### 🔔 Kullanıcı Deneyimi
- Alert yerine **toast bildirimleri**
- Yükleme durumları ve görsel geri bildirim
- Yardımcı mesajlarla hata yönetimi
- Klavye kısayolları (Enter ile oluşturma)
- Erişilebilirlik özellikleri (ARIA etiketleri, fokus durumları)

### 🛠️ Teknolojiler

- **HTML5** - Erişilebilirlik ile semantik işaretleme
- **CSS3** - Modern özellikler (Özel Özellikler, Animasyonlar, Glassmorphism)
- **Vanilla JavaScript (ES6+)** - Modüler mimari
- **QRCode.js** - QR kod oluşturma
- **jsQR** - QR kod tarama
- **LocalStorage API** - Tema ve dil kalıcılığı
- **Clipboard API** - Kopyalama işlevselliği
- **MediaDevices API** - Kamera erişimi

### 📦 Kurulum

1. Depoyu klonlayın:
```bash
git clone https://github.com/erdmncdr/QR-Code-Tools.git
cd QR-Code-Tools
```

2. `QR_code_reader_generater.html` dosyasını tarayıcınızda açın:
```bash
# Python kullanarak
python -m http.server 8000

# Node.js kullanarak
npx serve

# Veya HTML dosyasını doğrudan açın
open QR_code_reader_generater.html
```

3. Hepsi bu kadar! Yapı işlemi gerektirmez.

### 🎯 Kullanım

#### QR Kod Oluşturma
1. "QR Oluşturucu" sekmesine tıklayın
2. Metninizi veya URL'nizi girin
3. Boyut ve renk seçin (isteğe bağlı)
4. "QR Kod Oluştur"a tıklayın
5. QR kodunu indirin veya kopyalayın

#### QR Kod Tarama
1. "QR Tarayıcı" sekmesine tıklayın
2. Şu seçeneklerden birini kullanın:
   - Resim dosyası yükleyin
   - Resmi sürükleyip bırakın
   - QR kodu taramak için kameranızı kullanın
3. Sonucu görüntüleyin ve kopyalayın veya linki açın

### 🎨 Tema Özelleştirme

Uygulama, kolay temalama için CSS Özel Özellikleri kullanır. Renkleri özelleştirmek için `style.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
    --accent-primary: #6366f1;
    --accent-secondary: #8b5cf6;
    --text-primary: #111827;
    /* ... daha fazla değişken */
}
```

### 🌐 Tarayıcı Desteği

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### 📱 PWA Hazır

Uygulama PWA meta etiketlerini içerir ve Progressive Web App'e dönüştürülmeye hazırdır.

### 🤝 Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Lütfen Pull Request göndermekten çekinmeyin.

### 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır.

### 👨‍💻 Yazar

**Erdoğan Emre Çedar**
- GitHub: [@erdmncdr](https://github.com/erdmncdr)

---

<div align="center">

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

Made with ❤️ and modern web technologies

</div>
