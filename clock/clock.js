window.onload = function () {
    clockInit();
    function clockInit() {
        setMiddleScale();       // 设置整时的刻度，1、2、4、5、7、8、10、11
        setSmallScale();        // 设置整时之间的刻度
        setDate();              // 设置日期
        time();                 // 设置时间
        setInterval(time, 1000);    // 设置定时器1秒刷新一次时间
    }
    // 设置时间
    function time() {
        var hourEle = document.getElementById('hour');
        var minuteEle = document.getElementById('minute');
        var secondEle = document.getElementById('second');
        var curTime = document.getElementById('curTime');
        var time = new Date();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        var hourAngle = hour * 30 + minute * 6 / 60 - 90;
        var minuteAngle = minute * 6 + second * 6 / 60 - 90;
        var secondAngle = second * 6 - 90;
        hourEle.style.transform = 'rotate(' + hourAngle + 'deg)';
        minuteEle.style.transform = 'rotate(' + minuteAngle + 'deg)';
        secondEle.style.transform = 'rotate(' + secondAngle + 'deg)';
        curTime.innerHTML = (hour>9? hour: '0' + hour) + ':' + (minute>9? minute: '0' + minute) + ':' + (second>9? second: '0' + second);
    }
    // 设置整时的刻度，1、2、4、5、7、8、10、11
    function setMiddleScale() {
        const middleScale = document.getElementById('middleScale');
        let middleScaleStr = '';
        for(let i = 0; i < 12; i++){
            middleScaleStr = middleScaleStr + '<div class="middle-scale" style="transform:rotate(' + (i * 30 - 90) + 'deg)"></div>';
        }
        middleScale.innerHTML= middleScaleStr;
    }
    // 设置整时之间的刻度
    function setSmallScale() {
        const smallScale = document.getElementById('smallScale');
        let smallScaleStr = '';
        for(let i = 0; i < 60; i++){
            smallScaleStr = smallScaleStr + '<div class="small-scale" style="transform:rotate(' + (i * 6 - 90) + 'deg)"></div>';
        }
        smallScale.innerHTML= smallScaleStr;
    }
    // 设置日期显示
    function setDate() {
        const dateEle = document.getElementById('date');
        const time = new Date();
        const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const date = time.getDate() + 1;
        const day = time.getDay();
        dateEle.innerHTML= year + '-' + (month>9? month: '0' + month) + '-' + (date>9? date: '0' + date) + ' ' + week[day];
    }
}