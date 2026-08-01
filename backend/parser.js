// DOM Parser & Card Auto-Fill Module
const NewsParser = {
    /**
     * স্ক্র্যাপ করা ডাটা দিয়ে ইনপুট ফিল্ড ও কার্ড প্রিভিউ আপডেট করা
     * @param {Object} newsData - { title, image, date, siteName }
     */
    applyToCard: function(newsData) {
        if (!newsData) return;

        // ১. ইনপুট বক্সগুলোতে ডাটা ফিল করা
        const titleInput = document.getElementById('edit-title') || document.getElementById('title-input');
        const dateInput = document.getElementById('edit-date') || document.getElementById('date-input');
        const siteInput = document.getElementById('edit-site') || document.getElementById('site-input');

        if (titleInput && newsData.title) titleInput.value = newsData.title;
        if (dateInput && newsData.date) dateInput.value = newsData.date;
        if (siteInput && newsData.siteName) siteInput.value = newsData.siteName;

        // ২. ফটো কার্ডের প্রিভিউ এলিমেন্টে বসানো
        const cardTitle = document.getElementById('card-title');
        const cardDate = document.getElementById('card-date');
        const cardSite = document.getElementById('card-site');
        const cardImg = document.getElementById('card-img');

        if (cardTitle && newsData.title) cardTitle.innerText = newsData.title;
        if (cardDate && newsData.date) cardDate.innerText = newsData.date;
        if (cardSite && newsData.siteName) cardSite.innerText = newsData.siteName;
        
        if (cardImg && newsData.image) {
            cardImg.src = newsData.image;
        }
    }
};

if (typeof window !== 'undefined') {
    window.NewsParser = NewsParser;
}