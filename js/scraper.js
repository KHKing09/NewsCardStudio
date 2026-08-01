// News Scraper Module (Client Fetcher)
const NewsScraper = {
    /**
     * ওয়েবসাইট লিংক থেকে মেটা ডাটা (Title, Image, Date) এক্সট্র্যাক্ট করার ফাংশন
     * @param {string} targetUrl - সংবাদের URL
     * @returns {Promise<{title: string, image: string, date: string, siteName: string}>}
     */
    fetchNewsData: async function(targetUrl) {
        if (!targetUrl || typeof targetUrl !== 'string' || !targetUrl.trim()) {
            throw new Error('একটি বৈধ নিউজ লিংক প্রদান করুন।');
        }

        const url = targetUrl.trim();

        try {
            const response = await fetch('/api/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (!response.ok || !data || !data.success) {
                const message = data && data.error ? data.error : 'সংবাদ থেকে ডাটা রিড করা যায়নি।';
                throw new Error(message);
            }

            const payload = data.data || {};

            return {
                title: payload.title || '',
                image: payload.image || '',
                date: payload.date || '',
                siteName: payload.siteName || ''
            };
        } catch (error) {
            console.error('Scraper Error:', error);
            throw error;
        }
    }
};

if (typeof window !== 'undefined') {
    window.NewsScraper = NewsScraper;
}

if (typeof globalThis !== 'undefined') {
    globalThis.NewsScraper = NewsScraper;
}