video = {
    init: function (msg) {
        this.initData(msg);
        this.inittest();
        this.initclick();
    },
    inittest: function () {
        console.log(111);
        console.log(this.test1);
        console.log(this.el);
        console.log(this.el2);
    },
    initData: function (msg) {
        this.test1 = msg.el1,
            this.el = msg.el
        this.el2 = ''
    },
    initclick: function () {
        this.el.onclick = function (e) {
            console.log(1112)
        }
    }
}

console.log(111);