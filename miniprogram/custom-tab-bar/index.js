const getSvg = (path, color) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="${path}"/></svg>`)}`

const PATH_HOME = 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'
const PATH_SCHEDULE = 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z'
const PATH_REGISTER = 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
const PATH_MY = 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'

Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#004e9e",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        iconPath: getSvg(PATH_HOME, '#999999'),
        selectedIconPath: getSvg(PATH_HOME, '#004e9e')
      },
      {
        pagePath: "/pages/schedule/schedule",
        text: "日程",
        iconPath: getSvg(PATH_SCHEDULE, '#999999'),
        selectedIconPath: getSvg(PATH_SCHEDULE, '#004e9e')
      },
      {
        pagePath: "/pages/registration/registration",
        text: "报名",
        iconPath: getSvg(PATH_REGISTER, '#999999'),
        selectedIconPath: getSvg(PATH_REGISTER, '#004e9e')
      },
      {
        pagePath: "/pages/my/my",
        text: "我的",
        iconPath: getSvg(PATH_MY, '#999999'),
        selectedIconPath: getSvg(PATH_MY, '#004e9e')
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
      this.setData({
        selected: data.index
      })
    }
  }
})
