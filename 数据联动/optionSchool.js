var selectSchool = (function (e) {
    var provinceNode = document.getElementsByClassName('province')[0];
    var cityNode = document.getElementsByClassName('city')[0];
    var schoolNode = document.getElementsByClassName('school')[0];
    var provinceStr = '';
    var cityStr = '';
    var schoolStr = '';
    // 省
    for (var i = 0; i < province.length; i++) {
        provinceStr += `<option value="${province[i][0]}">${province[i][1]}</option>`
    }
    provinceNode.innerHTML = provinceStr;
    // 城
    cityData = city[provinceNode.value]   // 关键 联动在这里 provinceNode.value 获取省份select的value值
    for (var i = 0; i < cityData.length; i++) {
        cityStr += `<option value="${cityData[i][0]}">${cityData[i][1]}</option>`
    }
    cityStr += `<option value="other">其他</option>`
    cityNode.innerHTML = cityStr
    // 学校
    schoolData = allschool[cityNode.value]
    for (var i = 0; i < schoolData.length; i++) {
        schoolStr += `<option value="">${schoolData[i][2]}</option>`
    }
    schoolNode.innerHTML = schoolStr
    // 省份的联动
    provinceNode.onchange = function () {
        cityStr = '';
        schoolStr = '';
        // 城
        cityData = city[provinceNode.value]   // 关键 联动在这里 provinceNode.value 获取省份select的value值
        for (var i = 0; i < cityData.length; i++) {
            cityStr += `<option value="${cityData[i][0]}">${cityData[i][1]}</option>`
        }
        cityStr += `<option value="other">其 他</option>`
        cityNode.innerHTML = cityStr
        // 学校
        schoolData = allschool[cityNode.value]
        for (var i = 0; i < schoolData.length; i++) {
            schoolStr += `<option value="">${schoolData[i][2]}</option>`
        }
        schoolStr += `<option value="other">其 他</option>`
        schoolNode.innerHTML = schoolStr
    }
    // 城市的联动
    cityNode.onchange = function () {
        schoolStr = ''
        // 学校
        schoolData = allschool[cityNode.value]

        if (cityNode.value == 'other') {
            schoolStr = `<option value="">其 他</option>`
        }
        if (schoolData) {
            for (var i = 0; i < schoolData.length; i++) {
                schoolStr += `<option value="">${schoolData[i][2]}</option>`
            }
            schoolStr += `<option value="other">其 他</option>`
        }
        schoolNode.innerHTML = schoolStr
    }
}());



// 总结 传参入口位置被固定了 函数间的传值不方便   不如对象的写法

    // optionNode = document.createElement('div');
    // optionNode.classList.add('test1')
    // optionNode.innerHTML = 'ccc'
    // provinceNode.appendChild(optionNode)
    // appendChild 有点不灵活 需要按部就班


// var selectSchool = {
//     init: function (e) {
//         this.initData(e)
//     },
//     initData (e) {
//         console.log(e)
//     }
// }