/**
 * Global configuration for the Mini Program
 */
module.exports = {
  // Replace with your actual Cloudflare Worker URL
  API_BASE_URL: 'https://luntan-worker.YOUR_SUBDOMAIN.workers.dev', 
  
  // Storage prefix for R2
  R2_STORAGE_URL: 'https://pub-YOUR_R2_ID.r2.dev/',
  
  // Optional: Cloudflare Worker access secret (if implemented)
  API_SECRET: 'YOUR_SECRET_KEY'
};
