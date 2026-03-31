const request = require('../../utils/request.js');

Page({
  data: {
    record: null,
    loading: true
  },
  onLoad(options) {
    const id = options.id;
    if (id) {
      this.fetchRecordDetail(id);
    }
  },
  async fetchRecordDetail(id) {
    this.setData({ loading: true });
    try {
      // 兼容示例代码
      if (id === '1' || id === '2') {
        this.useFallbackDetail(id);
        return;
      }

      // 替换为 Cloudflare API 调用
      const res = await request({
        url: `/api/records/${id}`
      });

      this.setData({
        record: res.data,
        loading: false
      });
      
      // 设置页面标题
      if (res.data.title) {
        wx.setNavigationBarTitle({
          title: res.data.title
        });
      }
    } catch (err) {
      console.error('获取详情失败：', err);
      wx.showToast({
        title: '溯源失败',
        icon: 'none'
      });
      this.setData({ loading: false });
    }
  },
  useFallbackDetail(id) {
    const fallback = {
      '1': {
        title: '第二届长三角校友论坛 · 苏州峰会纪要',
        publishDate: '2025-06-15',
        content: `
          <h2>峰会亮点</h2>
          <p>本次苏沪同城化研讨会在苏州独墅湖畔顺利举行。李明远校友深入剖析了轨道交通自动化的未来趋势。</p>
          <blockquote>“我们不仅在建设铁路，更是在编织区域发展的血脉。”</blockquote>
          <p>现场展示了多项校友科创项目，涵盖了智能诊断与绿色建材等领域。与会者一致认为，长三角的一体化离不开地下的联动与地上的协同。</p>
          <p>会议最终达成了多项战略合作意向，为下一阶段的校友企业合作奠定了坚实基础。</p>
        `
      },
      '2': {
        title: '第一届长三角论坛 · 上海启动仪式回顾',
        publishDate: '2024-10-20',
        content: `
          <h2>缘起思源</h2>
          <p>在上海交通大学徐汇校区老图书馆，首届长三角校友论坛在一片丹红中拉开帷幕。</p>
          <blockquote>“饮水思源，爱国荣校。这八个字是我们毕生的灯塔。”</blockquote>
          <p>启动仪式上，来自江浙沪皖的校友分会负责人齐聚一堂，共同探讨了论坛的长效机制。这不仅是一个学术交流的平台，更是校友情谊的中继站。</p>
          <p>回顾往昔，每一份努力都为今日的辉煌埋下了伏笔。</p>
        `
      }
    };
    this.setData({
      record: fallback[id],
      loading: false
    });
  }
})
