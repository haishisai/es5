//  展示当前月份  →  获取当天日期 → 获取当月月份 → 获取当月月份第一天是星期几 → 获得展示第一天的日期 

var calender = {
    date: new Date(),
    el: document.getElementsByClassName('calendar')[0],
    days: ['日', '一', '二', '三', '四', '五', '六'],
    today: {}, // 当天日期
    monthFirstDay: {}, // 当月第一天
    startDay: {}, // 展示第一天
    ifToday: 0,
    init: function () {
        this.initData()
        this.render() // 需要 starday 所以需要在 initDate后面执行       
        this.handle()
    },
    initData: function () {
        this.getToday()
        this.getStartDay(this.today.year, this.today.month)
    },
    getToday: function () {
        this.today.date = this.date.getDate()
        this.today.month = this.date.getMonth()
        this.today.year = this.date.getFullYear()
    },
    getStartDay: function (year, month) {
        this.monthFirstDay = new Date(year, month, 1)  // 获取这个月的第一天 → 这个月的第一天是星期几
        this.monthFirstDay.wd = this.monthFirstDay.getDay() == 0 ? 7 : this.monthFirstDay.getDay()  //  这个月的第一天是星期几  如果是星期天 怎么需要多加一轮
        this.monthFirstDay.sjc1 = this.monthFirstDay.getTime()
        this.startDaySjc = this.monthFirstDay.sjc1 - 1000 * 60 * 60 * 24 * this.monthFirstDay.wd
        this.startDay = new Date(this.startDaySjc);
    },
    render: function () {
        this.renderDey();
        this.renderHeader();
    },
    renderDey: function () {
        var nodeWeeks = this.el.getElementsByClassName('picker-weeks')[0];
        var nodeDays = this.el.getElementsByClassName('picker-days')[0];
        // 星期
        var str = '';
        for (var i = 0; i < this.days.length; i++) {
            str += `<span>${this.days[i]}</span>`
        }
        nodeWeeks.innerHTML = str;
        // 日
        var str2 = '';
        var strDay = this.renderDayData();
        // for (var j = 0; j < 42; j++) {
        //     // 判断今天  今天在数组的序列是 date + 当月第一天的星期数 -1
        //     if (j == (this.today.date+this.monthFirstDay.wd-1)) {
        //         str2 += `<span class="day-active" >${strDay[j].getDate()}</span>`
        //     } else {
        //         str2 += `<span>${strDay[j].getDate()}</span>`
        //     }
        // }

        // 方法2 
        for (var j = 0; j < 42; j++) {
            // 判断当前月份
            if (strDay[j].getMonth() == this.today.month) {
                //判断当天
                if (j == (this.today.date + this.monthFirstDay.wd - 1) && this.ifToday == 0) {
                    // today
                    str2 += `<span class="active-day span-days" >${strDay[j].getDate()}</span>`
                } else {
                    // this month 
                    str2 += `<span class="active-month span-days" >${strDay[j].getDate()}</span>`
                }
            } else {
                // other month
                str2 += `<span class="span-days" >${strDay[j].getDate()}</span>`
            }
        }
        nodeDays.innerHTML = str2;
    },
    renderHeader: function () {
        var dete = this.el.getElementsByClassName('picker-date')[0];
        dete.innerHTML = `${this.today.year}年${this.today.month + 1}月`
    },
    renderDayData: function () {
        var arr = [];
        for (var j = 0; j < 42; j++) {
            var nextDaySjc = this.startDaySjc + 1000 * 60 * 60 * 24 * j
            // 转换成日期
            var day = new Date(nextDaySjc);
            arr.push(day)
        }
        return arr
    },
    handle: function () {
        // this.handleNextMonth()
        // this.handlePrevMonth()
        // this.handleNextYear()
        // this.handlePrevYear()
        self = this
        var nodeNextMonth = this.el.getElementsByClassName('picker-next-month')[0];
        var nodePrevMonth = this.el.getElementsByClassName('picker-prev-month')[0];
        var nodeNextYear = this.el.getElementsByClassName('picker-next-year')[0];
        var nodePrevYear = this.el.getElementsByClassName('picker-prev-year')[0];
        nodeNextMonth.addEventListener('click', function () {
            self.nextMonth()
        })
        nodePrevMonth.addEventListener('click', function () {
            self.prevMonth()
        })
        nodeNextYear.addEventListener('click', function () {
            self.nextYear()
        })
        nodePrevYear.addEventListener('click', function () {
            self.prevYear()
        })
    },
    nextMonth: function () {
        this.today.month += 1
        // 跨年  
        if (this.today.month > 11) {
            this.today.month = 0
            this.ifToday -= 11
            this.nextYear()
        } else {
            this.ifToday += 1
            this.getStartDay(this.today.year, this.today.month)
            this.render()
        }
        console.log(this.ifToday)
    },
    prevMonth: function () {
        this.today.month -= 1
        if (this.today.month < 0) {
            this.today.month = 11
            this.ifToday += 11
            this.prevYear()
        } else {
            this.ifToday -= 1
            this.getStartDay(this.today.year, this.today.month)
            this.render()
        }
        console.log(this.ifToday)
    },
    nextYear: function () {
        this.today.year += 1
        this.ifToday += 12
        this.getStartDay(this.today.year, this.today.month)
        this.render()
    },
    prevYear: function () {
        this.today.year -= 1
        this.ifToday -= 12
        this.getStartDay(this.today.year, this.today.month)
        this.render()
    }
}

calender.init()



// 结论  时间不要写在 onclik这类事件上  而是该吧这类事件全部 放在 handle里

