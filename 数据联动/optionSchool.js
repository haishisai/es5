var selectSchool = (function (e) {   
    var provinceDom = document.getElementsByClassName('province')[0];
    var cityDom = document.getElementsByClassName('city')[0];
    var schoolDom = document.getElementsByClassName('school')[0];
    var provinceStr = '';
    var cityStr = '';
    var schoolStr = '';   
    // 省
    for (var i = 0; i < province.length; i++) {        
        provinceStr += `<option value="${province[i][0]}">${province[i][1]}</option>`
    }
    provinceDom.innerHTML = provinceStr;
    // 城
    cityData = city[provinceDom.value]   // 关键 联动在这里 provinceDom.value 获取省份select的value值
    for (var i = 0; i < cityData.length; i++) {        
        cityStr += `<option value="${cityData[i][0]}">${cityData[i][1]}</option>`
    }
    cityStr += `<option value="other">其他</option>`
    cityDom.innerHTML = cityStr
    // 学校
    schoolData = allschool[cityDom.value]
    for (var i = 0; i < schoolData.length; i++) {        
        schoolStr += `<option value="">${schoolData[i][2]}</option>`
    }
    schoolDom.innerHTML = schoolStr
    // 省份的联动
    provinceDom.onchange = function () {     
        cityStr = '';
        schoolStr = '';
        // 城
        cityData = city[provinceDom.value]   // 关键 联动在这里 provinceDom.value 获取省份select的value值
        for (var i = 0; i < cityData.length; i++) {        
            cityStr += `<option value="${cityData[i][0]}">${cityData[i][1]}</option>`
        }
        cityStr += `<option value="other">其 他</option>`
        cityDom.innerHTML = cityStr
        // 学校
        schoolData = allschool[cityDom.value]
        for (var i = 0; i < schoolData.length; i++) {        
            schoolStr += `<option value="">${schoolData[i][2]}</option>`
        }
        schoolStr += `<option value="other">其 他</option>`
        schoolDom.innerHTML = schoolStr        
    }
    // 城市的联动
    cityDom.onchange = function () {   
        schoolStr = ''
        // 学校
        schoolData = allschool[cityDom.value]
        
        if (cityDom.value == 'other') {
            schoolStr = `<option value="">其 他</option>`
        }
        if(schoolData){
            for (var i = 0; i < schoolData.length; i++) {        
                schoolStr += `<option value="">${schoolData[i][2]}</option>`
            }
            schoolStr += `<option value="other">其 他</option>`
        }        
        schoolDom.innerHTML = schoolStr        
    }   
}());



// 总结 传参入口位置被固定了 函数间的传值不方便   不如对象的写法

    // optionDom = document.createElement('div');
    // optionDom.classList.add('test1')
    // optionDom.innerHTML = 'ccc'
    // provinceDom.appendChild(optionDom)
    // appendChild 有点不灵活 需要按部就班


// var selectSchool = {
//     init: function (e) {
//         this.initData(e)
//     },
//     initData (e) {
//         console.log(e)
//     }
// }