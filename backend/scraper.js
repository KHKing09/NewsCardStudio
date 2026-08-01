const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeNews(url) {
  try {
    // সংবাদের ওয়েবসাইট থেকে HTML ডাটা রিড করা
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(data);

    // OpenGraph ট্যাগ এবং সাধারণ Meta ট্যাগ থেকে তথ্য সংগ্রহ
    const title = $('meta[property="og:title"]').attr('content') || 
                  $('meta[name="twitter:title"]').attr('content') || 
                  $('title').text() || 'No Title Found';

    const image = $('meta[property="og:image"]').attr('content') || 
                  $('meta[name="twitter:image"]').attr('content') || '';

    const siteName = $('meta[property="og:site_name"]').attr('content') || 
                     new URL(url).hostname.replace('www.', '');

    const date = $('meta[property="article:published_time"]').attr('content') || 
                 $('meta[name="pubdate"]').attr('content') || 
                 new Date().toLocaleDateString('bn-BD');

    return {
      success: true,
      data: {
        title: title.trim(),
        image: image,
        siteName: siteName,
        date: date
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'সংবাদের লিংক থেকে তথ্য আনা সম্ভব হয়নি। লিংকটি আবার চেক করুন।'
    };
  }
}

module.exports = { scrapeNews };