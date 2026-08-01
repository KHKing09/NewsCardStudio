document.addEventListener('DOMContentLoaded', () => {
    const fetchBtn = document.getElementById('fetch-btn');
    const newsUrlInput = document.getElementById('news-url-input');
    const statusMsg = document.getElementById('status-message');

    const editTitle = document.getElementById('edit-title');
    const editSite = document.getElementById('edit-site');
    const editDate = document.getElementById('edit-date');
    const editImageFile = document.getElementById('edit-image-file');
    const templateSelect = document.getElementById('template-select');
    const downloadBtn = document.getElementById('download-btn');

    const cardTitle = document.getElementById('card-title');
    const cardSite = document.getElementById('card-site');
    const cardDate = document.getElementById('card-date');
    const cardImg = document.getElementById('card-img');
    const newsCardPreview = document.getElementById('news-card-preview');

    const validTemplates = [
    'tpl-1', 'tpl-2', 'tpl-3', 'tpl-4', 'tpl-5', 'tpl-6', 'tpl-7', 'tpl-8', 'tpl-9', 'tpl-10',
    'tpl-11', 'tpl-12', 'tpl-13', 'tpl-14', 'tpl-15', 'tpl-16', 'tpl-17', 'tpl-18', 'tpl-19', 'tpl-20',
    'tpl-21', 'tpl-22', 'tpl-23', 'tpl-24', 'tpl-25', 'tpl-26', 'tpl-27', 'tpl-28', 'tpl-29', 'tpl-30'
];

    if (
        !fetchBtn ||
        !newsUrlInput ||
        !statusMsg ||
        !editTitle ||
        !editSite ||
        !editDate ||
        !editImageFile ||
        !templateSelect ||
        !downloadBtn ||
        !cardTitle ||
        !cardSite ||
        !cardDate ||
        !cardImg ||
        !newsCardPreview
    ) {
        return;
    }

    const setStatus = (message, color = '#38bdf8') => {
        statusMsg.style.color = color;
        statusMsg.textContent = message;
    };

    const applyTemplate = (templateName) => {
        const safeTemplate = validTemplates.includes(templateName) ? templateName : 'tpl-1';
        newsCardPreview.className = `news-card ${safeTemplate}`;
    };

    fetchBtn.addEventListener('click', async () => {
        const url = newsUrlInput.value.trim();

        if (!url) {
            setStatus('⚠️ অনুগ্রহ করে একটি সঠিক নিউজ লিংক দিন!', '#f43f5e');
            return;
        }

        setStatus('⏳ খবরের তথ্য আনা হচ্ছে... অপেক্ষা করুন!', '#38bdf8');

        try {
            const response = await fetch('/api/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            const result = await response.json();

            if (result && result.success) {
                const data = result.data || {};

                cardTitle.textContent = data.title || 'শিরোনাম এখানে থাকবে';
                cardSite.textContent = data.siteName || 'News Studio';
                cardDate.textContent = data.date || 'তারিখ';

                if (data.image) {
                    cardImg.src = data.image;
                }

                editTitle.value = data.title || '';
                editSite.value = data.siteName || '';
                editDate.value = data.date || '';

                setStatus('✅ সফলভাবে তথ্য লোড করা হয়েছে!', '#10b981');
            } else {
                setStatus('❌ ' + (result && result.error ? result.error : 'এটি এখন আপডেট করা সম্ভব হয়নি।'), '#f43f5e');
            }
        } catch (error) {
            console.error('Fetch news error:', error);
            setStatus('❌ সার্ভারের সাথে সংযোগ বিচ্ছিন্ন হয়েছে।', '#f43f5e');
        }
    });

    editTitle.addEventListener('input', (event) => {
        cardTitle.textContent = event.target.value || 'শিরোনাম এখানে থাকবে';
    });

    editSite.addEventListener('input', (event) => {
        cardSite.textContent = event.target.value || 'News Studio';
    });

    editDate.addEventListener('input', (event) => {
        cardDate.textContent = event.target.value || 'তারিখ';
    });

    editImageFile.addEventListener('change', (event) => {
        const file = event.target.files && event.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (loadEvent) => {
            if (loadEvent.target && loadEvent.target.result) {
                cardImg.src = loadEvent.target.result;
            }
        };
        reader.readAsDataURL(file);
    });

    templateSelect.addEventListener('change', (event) => {
        const selectedTemplate = event.target.value || 'tpl-1';
        applyTemplate(selectedTemplate);
    });

    downloadBtn.addEventListener('click', () => {
    if (typeof html2canvas === 'undefined') {
        setStatus('❌ PNG ডাউনলোড করতে html2canvas লোড হয়নি!', '#f43f5e');
        return;
    }

    setStatus('⏳ কার্ড তৈরি হচ্ছে, ডাউনলোড শুরু হবে...', '#38bdf8');

    html2canvas(newsCardPreview, {
        scale: 3,                  // ৩ দিয়ে সুপার HD কোয়ালিটি আসবে
        useCORS: true,             // এক্সটার্নাল ইমেজ সাপোর্ট
        backgroundColor: '#ffffff', // যাতে গ্যালারিতে ব্যাকগ্রাউন্ড কালো না হয়
        logging: false
    }).then((canvas) => {
        const link = document.createElement('a');
        const fileName = 'news-card-' + Date.now() + '.png';

        link.download = fileName;
        link.href = canvas.toDataURL('image/png', 1.0);
        document.body.appendChild(link);
        link.click();
        link.remove();

        setStatus('✅ কার্ড ডাউনলোড সম্পন্ন হয়েছে!', '#10b981');
    }).catch((error) => {
        console.error('Download error:', error);
        setStatus('❌ কার্ড ডাউনলোড করতে সমস্যা হয়েছে!', '#f43f5e');
    });
});

    applyTemplate(templateSelect.value || 'tpl-1');
});
downloadBtn?.addEventListener('click', () => {
    CardExporter.exportToPNG('#news-card-preview .news-card', 'download-btn');
});
// Auto Fetch Button Click Event
const fetchBtn = document.getElementById('fetch-btn');
const newsUrlInput = document.getElementById('news-url-input');

if (fetchBtn && newsUrlInput) {
    fetchBtn.addEventListener('click', async () => {
        const url = newsUrlInput.value.trim();
        if (!url) {
            alert('অনুগ্রহ করে একটি সংবাদের URL দিন!');
            return;
        }

        const originalText = fetchBtn.innerText;
        fetchBtn.innerText = 'ডাটা আনা হচ্ছে...';
        fetchBtn.disabled = true;

        try {
            // ১. ডাটা স্ক্র্যাপ করা
            const newsData = await NewsScraper.fetchNewsData(url);
            
            // ২. পার্সার দিয়ে কার্ডে ডাটা সেট করা
            NewsParser.applyToCard(newsData);
            
            alert('সংবাদের তথ্য সফলভাবে ফটো কার্ডে সেট হয়েছে!');
        } catch (err) {
            alert(err.message || 'ডাটা লোড করতে সমস্যা হয়েছে!');
        } finally {
            fetchBtn.innerText = originalText;
            fetchBtn.disabled = false;
        }
    });
}