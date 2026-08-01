// High Quality News Card Exporter Module
const CardExporter = {
    /**
     * ফটো কার্ডকে HD PNG ফরম্যাটে ডাউনলোড করার ফাংশন
     * @param {string|Element} cardSelector - কার্ড এলিমেন্টের CSS সিলেক্টর (যেমন: '#news-card-preview .news-card') অথবা DOM এলিমেন্ট
     * @param {string} buttonId - ডাউনলোড বাটনের ID (যেমন: 'download-btn')
     */
    exportToPNG: function(cardSelector, buttonId) {
        if (typeof document === 'undefined') {
            console.warn('CardExporter: document is not available in this environment.');
            return;
        }

        const cardElement = typeof cardSelector === 'string'
            ? document.querySelector(cardSelector)
            : cardSelector;
        const downloadBtn = buttonId ? document.getElementById(buttonId) : null;

        if (!cardElement) {
            if (typeof window !== 'undefined' && typeof window.alert === 'function') {
                window.alert('ডাউনলোড করার জন্য কোনো ফটো কার্ড পাওয়া যায়নি!');
            }
            return;
        }

        if (typeof html2canvas === 'undefined') {
            console.error('CardExporter: html2canvas is not loaded.');
            if (typeof window !== 'undefined' && typeof window.alert === 'function') {
                window.alert('PNG এক্সপোর্টের জন্য html2canvas লোড হয়নি।');
            }
            return;
        }

        let originalText = '';
        if (downloadBtn) {
            originalText = downloadBtn.innerHTML;
            downloadBtn.innerText = 'প্রসেস হচ্ছে...';
            downloadBtn.disabled = true;
        }

        const restoreButtonState = () => {
            if (downloadBtn) {
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            }
        };

        html2canvas(cardElement, {
            scale: 3,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            logging: false
        })
            .then((canvas) => {
                const link = document.createElement('a');
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const fileName = `NewsCard_${timestamp}.png`;

                link.download = fileName;
                link.href = canvas.toDataURL('image/png', 1.0);
                document.body.appendChild(link);
                link.click();
                link.remove();

                restoreButtonState();
            })
            .catch((err) => {
                console.error('Export Failed:', err);
                if (typeof window !== 'undefined' && typeof window.alert === 'function') {
                    window.alert('কার্ড এক্সপোর্ট করতে সমস্যা হয়েছে!');
                }
                restoreButtonState();
            });
    }
};

if (typeof window !== 'undefined') {
    window.CardExporter = CardExporter;
}

if (typeof globalThis !== 'undefined') {
    globalThis.CardExporter = CardExporter;
}