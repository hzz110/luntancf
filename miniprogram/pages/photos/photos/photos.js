Page({
  data: {
    photos: [
      { id: 1, url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=400&fit=crop', desc: '主会场盛况', time: '10:00' },
      { id: 2, url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=600&fit=crop', desc: '嘉宾圆桌交流', time: '11:15' },
      { id: 3, url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&h=500&fit=crop', desc: '校友自由探讨', time: '14:30' },
      { id: 4, url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=500&fit=crop', desc: '科技分论坛', time: '15:20' }
    ]
  },
  preview(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: this.data.photos.map(p => p.url),
      current: url
    });
  },
  findMe() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        wx.showLoading({ title: 'AI 人脸搜寻中...' });
        setTimeout(() => {
          wx.hideLoading();
          wx.showToast({ title: '已为您筛选 2 张照片', icon: 'none' });
        }, 1500);
      }
    });
  }
})