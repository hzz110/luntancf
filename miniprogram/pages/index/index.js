const app = getApp()

Page({
  data: {
    heroLoaded: true, // Asset is ready in /images/hero-bg.jpg
    guests: [
      {
        id: 1,
        name: '张国梁',
        summary: '土木87级校友 · 中国中车总工程师',
        story: '从上海地铁1号线到长三角的高铁网，我们三十载春秋见证了速度与温情。'
      },
      {
        id: 2,
        name: '李晓峰',
        summary: '计算机92级校友 · 某科技创投合伙人',
        story: '从犀浦机房的第一行代码，到张江园区的硬科技森林，初心未改。'
      },
      {
        id: 3,
        name: '陈清',
        summary: '经管01级校友 · 独立经济学者',
        story: '看遍资本潮汐，回首思源湖畔，依然觉得那份坚韧最懂交大人。'
      }
    ]
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  goToPage(e) {
    const url = e.currentTarget.dataset.url;
    // 检查是否为 TabBar 页面
    const tabUrls = [
      '/pages/index/index',
      '/pages/schedule/schedule',
      '/pages/registration/registration',
      '/pages/my/my'
    ];
    
    if (tabUrls.includes(url)) {
      wx.switchTab({ url })
    } else {
      wx.navigateTo({ url })
    }
  }
})
