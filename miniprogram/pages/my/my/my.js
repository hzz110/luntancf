const db = wx.cloud.database();

Page({
  data: {
    userInfo: null,
    registration: null,
    seatInfo: null,
    loading: true,
    tableSeats: []
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 });
    }
    this.fetchUserData();
  },
  async fetchUserData() {
    this.setData({ loading: true });
    try {
      // 1. 获取报名信息
      const regRes = await db.collection('registrations').limit(1).get();
      if (regRes.data.length > 0) {
        const reg = regRes.data[0];
        this.setData({
          registration: reg,
          userInfo: {
            name: reg.name,
            major: reg.major || reg.year + '届'
          }
        });

        // 2. 获取座位信息
        const seatRes = await wx.cloud.callFunction({
          name: 'fetchSeat'
        });

        if (seatRes.result && seatRes.result.success) {
          const seat = seatRes.result.seat;
          this.setData({
            seatInfo: seat,
            tableSeats: seat.mates || []
          });
        }
      } else {
        // 未报名状态处理
        this.setData({ registration: null });
      }
    } catch (err) {
      console.error('获取用户信息失败：', err);
      // 这里的错误由于是演示，可以保持静默或显示空状态
    } finally {
      this.setData({ loading: false });
    }
  },
  goToRegistration() {
    wx.switchTab({
      url: '/pages/registration/registration'
    });
  }
})
