var hby = {
    init: function (e) {
        this.initData(e)
        var dom = this.createDom(50);
        this.el.appendChild(dom)
        this.hbStart()

    },
    initData: function (e) {
        this.el = e.el;
    },
    hbStart: function () {
        var hbBtn = document.getElementsByClassName("hb-btn")[0];
        var hbs = document.getElementsByClassName("hb");
        hbBtn.onclick = function () {
            hbs[0].classList.add("hb-animation")
            console.log(1)
        }    
    },
    createDom: function (num) {
        var frag = document.createDocumentFragment();
        for (var i = 0; i < num; i++) {
            var img = new Image();
            img.src = './hb.png';
            img.classList.add('hb');
            img.classList.add('hb-animation');
            img.style.left = this.randomNum(1, window.innerWidth) + 'px';
            img.style.width = this.randomNum(50, 130) + 'px';
            img.style.transform = 'rotateZ('+this.randomNum(0, 360) + 'deg)' 
            img.style.animationDelay = this.randomNum(0, 50) / 10 + 's';
            frag.appendChild(img)
        }
        return frag;
    },
    //随机整数 包含min max  随机数
    randomNum: function (min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    }
}