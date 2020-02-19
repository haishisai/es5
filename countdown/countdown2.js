function MyCountdown () {
    this.el = '';
    this.init = function (e) {
        this.initDate(e);
        this.filter();
        this.render();
        this.handle(e);
    }
    this.initDate = function (e) {
        this.el = e.el;
        this.descNode = this.el.getElementsByClassName('desc-text')[0];
        this.date = new Date(),
            this.startTime = e.startTime;
        this.endTime = e.endTime;
        this.initGetTime();
    }
    this.initGetTime = function () {
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
            clearInterval(this.timer)
            this.desc = '活动已经结束'
        }
    }
    this.filter = function () {
        this.filterAdd0('getHours')
        this.filterAdd0('getMinutes')
        this.filterAdd0('getSeconds')
    },
    this.filterAdd0 = function(num) {
        if(this[num] == undefined || this[num] == 00 ){
            this[num] = '00'
            return
        }        
        if (this[num] < 10) {
            this[num] = '0' + this[num]            
        }        
    }
    this.render = function () {
        this.hoursNode = this.el.getElementsByClassName('hours')[0]
        this.minutesNode = this.el.getElementsByClassName('minutes')[0]
        this.secondsNode = this.el.getElementsByClassName('seconds')[0]
        this.hoursNode.innerHTML = this.getHours
        this.minutesNode.innerHTML = this.getMinutes
        this.secondsNode.innerHTML = this.getSeconds
        this.descNode.innerHTML = this.desc
    }
    this.handle = function (e) {
        this.timer = setInterval(() => {
            this.initDate(e);
            this.filter()
            this.render()
        }, 1000)
    }

}

var c1 = new MyCountdown()
var c2 = new MyCountdown()


c1.init({
    el: document.getElementsByClassName('my-countdown')[0],
    startTime: '2020-02-18 19:01:00',
    endTime: '2020-02-18 19:01:10'
})
c2.init({
    el: document.getElementsByClassName('my-countdown2')[0],
    startTime: '2020-02-18 20:58:00',
    endTime: '2020-02-18 20:58:20'
})


//  构造函数的写法  计时器 清楚没有问题

function say(i) {
    if(i==0){
        return
    }
    console.log(i)
}
say(0)