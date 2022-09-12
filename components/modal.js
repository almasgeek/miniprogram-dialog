Component({
  options: {
    multipleSlots: true
  },
  properties: {
    title: {
      type: String,
      value: '',
    },
    show: {
      type: Boolean,
      value: false,
      observer: function (newVal, oldVal) {
        if (newVal) {
          this.dialog(newVal)
        }
      }
    },
    maskClose: {
      type: Boolean,
      value: true
    },
  },

  data: {
  },
  methods: {
    dialog(status) {
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "ease",
        delay: 0
      });
      this.animation = animation;
      animation.scale(1.1, 1.1).opacity(0).step()
      this.setData({
        animationData: animation.export()
      })

      setTimeout(function () {
        animation.scale(1, 1).opacity(1).step()
        this.setData({
          animationData: animation
        })
        if (!status) {
          this.setData({ show: false });
          this.triggerEvent('closeDialog', { show: false })
        }
      }.bind(this), 100)

      if (status) {
        this.setData({show: true})
      }
    },
    maskClick(e) {
      if (this.data.maskClose) {
        this.dialog(false)
      }
    }
  }
})
