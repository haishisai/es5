//  展示当前月份  →  获取当天日期 → 获取当月月份 → 获取当月月份第一天是星期几 → 获得展示第一天的日期 

var calender = {
    date: new Date(),
    el: document.getElementsByClassName('calendar')[0],
    days: ['日', '一', '二', '三', '四', '五', '六'],
    today: {}, // 当天日期
    monthFirstDay: {}, // 当月第一天
    startDay: {}, // 展示第一天
    ifToday: 0,
    init: function (callback) {
        this.initData(callback)
        this.render() // 需要 starday 所以需要在 initDate后面执行       
        this.handle()
    },
    initData: function (callback) {
        this.getToday()
        this.getStartDay(this.today.year, this.today.month)
        this.cb = callback  // 接收外部的 函数
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
            var nextDaySjc = this.startDaySjc + 1000 * 60 * 60 * 24 * j + 7200000 //现在是中国标准时间 1988-9-12  中国夏令时间 少了1个小时
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
        // 获取点击的日期
        var nodes = this.el.getElementsByClassName('picker-days')[0];
        nodes.addEventListener('click', function (e) {
            // 事件委托 防止父级被选中
            if(e.target.className == 'picker-days'||''){
                return
            }
            self.selectRemoveClass()
            e.target.classList.add('active-select')
            
            var selectMsg = `${self.today.year}-${self.today.month + 1}-${e.target.innerHTML}`
            // 接收到的外部函数 放在这里？？   function (e) {console.log(e)}
            self.cb(selectMsg)  // 有种出口的感觉？   就是启用函数 传参
            // 直白的意思就是  换了个位置写代码  
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
    },
    selectRemoveClass: function () {
        var nodes = this.el.getElementsByClassName('span-days')
        for (var i = 0; i < nodes.length; i++) {
            var str = nodes[i].className    //classList 返回的是个类数组？？
            var arrClassName = str.split(" ");  // str → arr
            var index = arrClassName.indexOf('active-select')
            if (index >= 0) {
                arrClassName.splice(index, 1)
                var newName = arrClassName.join(' ')  //   
                nodes[i].className = newName;
            }
            
        }
    }//  jq 一行就能搞定......  这段写的太垃圾了   或者用这个 classList.contains  
}

calender.init(function (msg) {
    console.log(msg) // 可以在外部使用 选择日期
})



// 结论  事件不要写在函数里    事件在外面 函数在里面  

