const express = require('express');
const path = require('path');
const cors = require('cors');
const { scrapeNews } = require('./backend/scraper');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // Serve static files from the project root
app.use('/.well-known', express.static(path.join(__dirname, '.well-known')));
// API Endpoint: fetch article details from a news link
app.post('/api/scrape', async (req, res) => {
  try {
    const { url } = req.body || {};

    if (!url || typeof url !== 'string' || !url.trim()) {
      return res.status(400).json({
        success: false,
        error: 'ইউআরএল (URL) দেয়া আবশ্যক!'
      });
    }

    const result = await scrapeNews(url.trim());
    return res.json(result);
  } catch (error) {
    console.error('Scrape endpoint error:', error);
    return res.status(500).json({
      success: false,
      error: 'সার্ভার ড্রাইভ থেকে তথ্য সংগ্রহ করতে ব্যর্থ হয়েছে।'
    });
  }
});

// Start server only when run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 News Card Studio Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;