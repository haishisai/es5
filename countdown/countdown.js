"use strict"
var myCountdown = {

    el: '',
    init: function (e) {
        this.initDate(e)
        this.filter()

        this.render()
        this.handle(e)
    },
    initDate: function (e) {
        this.el = e.el;
        this.descNode = this.el.getElementsByClassName('desc-text')[0];
        this.className = this.el.className
        this.date = new Date();
        this.startTime = e.startTime;
        this.endTime = e.endTime;
        this.initGetTime()

    },
    initGetTime (time) {
        // 开始时间的时间戳
        this.startTimeSjc = new Date(this.startTime).getTime()
        // 距离开始时间的时间戳
        this.startTimeBefore = Math.floor((this.startTimeSjc - this.date.getTime()) / 1000)

        // 结束时间的时间戳
        this.endTimeSjc = new Date(this.endTime).getTime()
        // 距离结束时间的时间戳
        this.endTimeBefore = Math.floor((this.endTimeSjc - this.date.getTime()) / 1000)

        if (this.startTimeBefore >= 0) {
            this.getHours = Math.floor(this.startTimeBefore / 3600)
            this.getMinutes = Math.floor(this.startTimeBefore % 3600 / 60)
            this.getSeconds = this.startTimeBefore % 3600 % 60
            this.desc = '距离活动开始'
        } else if (this.endTimeBefore >= 0 && this.startTimeBefore < 0) {
            this.getHours = Math.floor(this.endTimeBefore / 3600)
            this.getMinutes = Math.floor(this.endTimeBefore % 3600 / 60)
            this.getSeconds = this.endTimeBefore % 3600 % 60
            this.desc = '距离活动结束'
        } else {
            clearInterval(this[this.className])
            this.desc = '活动已经结束'
        }
    },
    filter: function () {
        if (this.getHours < 10) {
            this.getHours = '0' + this.getHours
        }
        if (this.getMinutes < 10) {
            this.getMinutes = '0' + this.getMinutes
        }
        if (this.getSeconds < 10) {
            this.getSeconds = '0' + this.getSeconds
        }
    },
    render: function () {
        this.hoursNode = this.el.getElementsByClassName('hours')[0]
        this.minutesNode = this.el.getElementsByClassName('minutes')[0]
        this.secondsNode = this.el.getElementsByClassName('seconds')[0]
        this.hoursNode.innerHTML = this.getHours
        this.minutesNode.innerHTML = this.getMinutes
        this.secondsNode.innerHTML = this.getSeconds
        this.descNode.innerHTML = this.desc
    },
    handle: function (e) {
        this[this.className] = setInterval(() => {
            this.initDate(e);
            this.filter()
            this.render()
        }, 1000)
    }

}

myCountdown.init({
    el: document.getElementsByClassName('my-countdown')[0],
    startTime: '2020-02-18 20:58:00',
    endTime: '2020-02-18 20:58:20'
})

myCountdown.init({
    el: document.getElementsByClassName('my-countdown2')[0],
    startTime: '2020-02-18 19:50:00',
    endTime: '2020-02-18 19:55:20'
})


