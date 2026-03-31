Page({
  data: {
    type: 'alumni', // alumni | enterprise
    formData: {
      name: '',
      year: '',
      major: '',
      company: '',
      phone: '',
      hotel: false,
      companions: [],
      entName: '',
      entIndustry: '',
      entCount: 1,
      entBooth: false,
      entInvoice: ''
    },
    showPayment: false,
    isPaying: false
  },
  onLoad() {
    // 预加载水滴声
    this.audioCtx = wx.createInnerAudioContext();
    this.audioCtx.src = 'https://web-assets.dcloud.net.cn/unidoc/zh/water-drop.mp3';
  },
  onUnload() {
    if (this.audioCtx) {
      this.audioCtx.destroy();
    }
  },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 });
    }
  },
  switchType(e) {
    this.setData({ type: e.currentTarget.dataset.type });
  },
  inputChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
  },
  switchChange(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
  },
  submitForm() {
    if (this.data.type === 'alumni') {
      if (!this.data.formData.name || !this.data.formData.year || !this.data.formData.major || !this.data.formData.phone) {
        wx.showToast({ title: '请填写必填项', icon: 'none' });
        return;
      }
    } else {
      if (!this.data.formData.entName || !this.data.formData.entIndustry) {
        wx.showToast({ title: '请填写有效信息', icon: 'none' });
        return;
      }
    }
    this.setData({ showPayment: true });
  },
  async confirmPayment() {
    this.setData({ isPaying: true });
    
    // 播放水滴声
    if (this.audioCtx) {
      this.audioCtx.play();
    }

    try {
      // 调用云函数：提交报名信息
      const res = await wx.cloud.callFunction({
        name: 'submitForm',
        data: {
          formData: this.data.formData,
          type: this.data.type
        }
      });

      if (res.result && res.result.success) {
        this.setData({ isPaying: false, showPayment: false });
        wx.showToast({
          title: '缘起交大',
          icon: 'success',
          duration: 2000
        });
        setTimeout(() => {
          wx.switchTab({ url: '/pages/my/my' });
        }, 2000);
      } else {
        throw new Error(res.result.error || '提交失败');
      }
    } catch (err) {
      this.setData({ isPaying: false });
      wx.showModal({
        title: '温馨提示',
        content: '报名提交失败，请检查网络或联系管理员：' + err.message,
        showCancel: false
      });
    }
  },
  cancelPayment() {
    this.setData({ showPayment: false });
  }
})