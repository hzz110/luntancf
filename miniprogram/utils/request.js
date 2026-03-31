/**
 * Centralized request wrapper for Cloudflare Worker API
 */
const config = require('../config.js');

const request = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.API_BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'X-Secret': config.API_SECRET,
        ...options.header
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          reject(res.data || { error: 'Request failed' });
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

module.exports = request;
