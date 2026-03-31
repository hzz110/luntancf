const request = require('../../utils/request.js');

Page({
  data: {
    records: [],
    loading: true,
    hasMore: true,
    page: 0
  },
  onLoad() {
    this.fetchRecords();
  },
  async fetchRecords() {
    if (!this.data.hasMore) return;
    this.setData({ loading: true });
    
    try {
      // 替换为 Cloudflare API 调用
      const res = await request({
        url: `/api/records?page=${this.data.page}&limit=10`
      });
      
      const newRecords = res.data;
      
      // 如果云端没有数据且是第一页，则提供兜底示例
      if (this.data.page === 0 && newRecords.length === 0) {
        this.useFallbackData();
        return;
      }

      this.setData({
        records: this.data.records.concat(newRecords),
        loading: false,
        hasMore: newRecords.length === 10,
        page: this.data.page + 1
      });
    } catch (err) {
      console.error('获取往期回顾失败：', err);
      if (this.data.page === 0) this.useFallbackData();
      else this.setData({ loading: false });
    }
  },
  useFallbackData() {
    const fallback = [
      {
        _id: '1',
        title: '第二届长三角校友论坛 · 苏州峰会纪要',
        summary: '在独墅湖畔，校友们共同探讨了新基建浪潮下的行业新变局，李明远校友发表主旨演讲。',
        publishDate: '2025-06-15'
      },
      {
        _id: '2',
        title: '第一届长三角论坛 · 上海启动仪式回顾',
        summary: '初登申城，缘起思源。记录论坛立项之初的那些动人瞬间与校友愿景。',
        publishDate: '2024-10-20'
      }
    ];
    this.setData({
      records: fallback,
      loading: false,
      hasMore: false
    });
  },
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/records/detail?id=${id}`
    });
  }
})
