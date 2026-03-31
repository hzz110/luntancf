const db = wx.cloud.database();

Page({
  data: {
    activeTab: 'main', // main | sub
    agendaData: {
      main: [],
      sub: []
    },
    currentList: [],
    loading: true,
    showModal: false,
    selectedAgenda: null
  },
  onLoad() {
    this.fetchAgendas();
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 });
    }
  },
  async fetchAgendas() {
    this.setData({ loading: true });
    try {
      const res = await db.collection('agendas').orderBy('order', 'asc').get();
      const allAgendas = res.data;
      
      // 如果云端没有数据，则使用兜底数据（仅供演示，生产环境可移除）
      if (allAgendas.length === 0) {
        this.useFallbackData();
        return;
      }

      this.processAgendaData(allAgendas);
    } catch (err) {
      console.error('获取日程失败：', err);
      this.useFallbackData(); // 失败也进入兜底
    }
  },
  processAgendaData(list) {
    const main = list.filter(item => item.type_cat === 'main' || !item.type_cat);
    const sub = list.filter(item => item.type_cat === 'sub');
    
    this.setData({
      agendaData: { main, sub },
      currentList: this.data.activeTab === 'main' ? main : sub,
      loading: false
    });
  },
  useFallbackData() {
    const fallback = {
      main: [
        { time: '08:30', title: '嘉宾签到 · 晨间交流', location: '主会场前厅', speaker: '', desc: '请凭个人中心二维码签到', type: 'normal', order: 1 },
        { time: '09:00', title: '领导致辞', location: '主会场', speaker: '西南交通大学领导', desc: '新时代下交大的使命与担当。', type: 'highlight', order: 2 },
        { time: '09:30', title: '主旨演讲：长三角新蓝图', location: '主会场', speaker: '知名学者', desc: '深度解析一体化下的行业作用。', type: 'highlight', order: 3 },
        { time: '10:30', title: '茶歇交流', location: '外场区域', speaker: '', desc: '稍作休息。', type: 'break', order: 4 }
      ],
      sub: [
        { time: '14:00', title: '思源分坛：新机遇对谈', location: '第三会议室', speaker: '行业大咖', desc: '聚焦破局点探讨。', type: 'highlight', order: 10 },
        { time: '16:00', title: '校友项目展示', location: '路演厅', speaker: '创业校友', desc: '项目交流。', type: 'normal', order: 11 }
      ]
    };
    this.setData({
      agendaData: fallback,
      currentList: this.data.activeTab === 'main' ? fallback.main : fallback.sub,
      loading: false
    });
  },
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    const list = this.data.agendaData[tab];
    this.setData({
      activeTab: tab,
      currentList: list
    });
  },
  showDetail(e) {
    const item = e.currentTarget.dataset.item;
    if (item.type === 'break') return;
    this.setData({
      selectedAgenda: item,
      showModal: true
    });
  },
  closeModal() {
    this.setData({ showModal: false });
  },
  collectAgenda() {
    wx.showToast({
      title: '已收藏至计划',
      icon: 'success'
    });
    this.closeModal();
  }
})