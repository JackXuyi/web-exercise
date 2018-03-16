(
    function() {

        const datePicker = {};

        let targetElement = null;
        let curYear = null;
        let curMonth = null;

        // 初始化组件
        function init(elementId){
            targetElement = document.getElementById(elementId);
            if (targetElement && targetElement.tagName.toLowerCase() === 'input') {
                isShow = false;
                const datePickerEle = document.createElement('div');
                const body = document.getElementsByTagName('body');
                datePickerEle.className = 'ui-date-swagger';
                datePickerEle.id = 'ui-date-swagger';
                body[0].appendChild(datePickerEle);
                render();
                targetElement.addEventListener('click', targetClickHandle);
            } else {
                targetElement = null;
            }
        }

        // 节点点击事件
        function targetClickHandle(event) {
            toggle(true);
        }

        // 日期组件点击事件
        function datePickerClickHandle(event) {
            if (event.target.tagName.toLowerCase() === 'td') {
                if (targetElement) {
                    const date = new Date(curYear, curMonth - 1, event.target.dataset.value);
                    targetElement.value = date.getFullYear() + '-' + format(date.getMonth() + 1) + '-' + format(date.getDate());
                    toggle(false);
                }
            } else if (event.target.tagName.toLowerCase() === 'label' && event.target.classList.contains('ui-date-swagger-prev-btn')) {
                curMonth = curMonth - 1;
                getRightDate(curYear, curMonth);
                render(curYear, curMonth);
            } else if (event.target.tagName.toLowerCase() === 'label' && event.target.classList.contains('ui-date-swagger-next-btn')) {
                curMonth = curMonth + 1;
                getRightDate(curYear, curMonth);
                render(curYear, curMonth);
            }
        }

        // 获取正确的年和月
        function getRightDate(year, month) {
            const date = new Date(year, month - 1, 1);
            curMonth = date.getMonth() + 1;
            curYear = date.getFullYear();
        }

        // 显示隐藏日历组件
        function toggle(isShow) {
            const ele = document.getElementById('ui-date-swagger');
            //const height = targetElement.
            const left = targetElement.offsetLeft;
            const top = targetElement.offsetTop;
            const height = targetElement.offsetHeight;
            if (isShow) {
                ele.classList.add('ui-date-swagger-active');
                ele.style.top = top + height + 10 + 'px';
                ele.style.left = left + 'px';
                ele.addEventListener('click', datePickerClickHandle);
            } else {
                ele.classList.remove('ui-date-swagger-active');
                ele.removeEventListener('click', datePickerClickHandle);
            }
        }

        // 渲染日期数据
        function render(year, month) {
            const ele = document.getElementById('ui-date-swagger');
            const data = getDays(year, month);
            curYear = data.year;
            curMonth = data.month;
            const len = data.days.length;
            let htmlStr =
                    '<div class="ui-date-swagger-header">' +
                        '<label class="ui-date-swagger-btn ui-date-swagger-prev-btn">&lt;</label>' +
                       '<span>'+ data.year + '-' + format(data.month) + '</span>' +
                        '<label class="ui-date-swagger-btn ui-date-swagger-next-btn">&gt;</label>' +
                    '</div>' +
                    '<div class="ui-date-swagger-body">' +
                        '<table>' +
                            '<thead>' +
                                '<tr>' +
                                    '<th>一</th>' +
                                    '<th>二</th>' +
                                    '<th>三</th>' +
                                    '<th>四</th>' +
                                    '<th>五</th>' +
                                    '<th>六</th>' +
                                    '<th>七</th>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody>';
                for(let i=0; i < len; i++) {
                    if ( i % 7 === 0) {
                        htmlStr = htmlStr + '<tr>';
                    }
                    htmlStr = htmlStr + '<td data-value=' + data.days[i].date + '>' + data.days[i].showDate + '</td>';
                    if ( i % 7 === 6) {
                        htmlStr = htmlStr + '</tr>';
                    }
                }
                htmlStr = htmlStr +
                                '</tbody>' +
                            '</table>' +
                        '</div>';
            ele.innerHTML = htmlStr;
                            
        }

        // 获取显示的日期
        function getDays(year, month) {
            if (!year || !month) {
                const curTime = new Date();
                year = curTime.getFullYear();
                month = curTime.getMonth() + 1;
            }
            const firstDayOfCurMonth = new Date(year, month - 1, 1);
            const firstWeekdayOfCurMonth = firstDayOfCurMonth.getDay();
            const start = 2 - translateWeekday(firstWeekdayOfCurMonth);

            const curYear = firstDayOfCurMonth.getFullYear();
            const curMonth = firstDayOfCurMonth.getMonth() + 1;

            const lastDayOfCurMonth = new Date(year, month, 0);
            const lastWeekdayOfCurMonth = lastDayOfCurMonth.getDay();
            const end = 7 - translateWeekday(lastWeekdayOfCurMonth) + lastDayOfCurMonth.getDate();

            const curLastDate = lastDayOfCurMonth.getDate();

            let days = [];
            for (let i = start; i <= end; i++) {
                const time = new Date(year, month - 1, i);
                days.push({
                    date: i,
                    showDate: time.getDate(),
                });
            }
            return {
                month: curMonth,
                year: curYear,
                lastDate: curLastDate,
                days: days,
            }
        }

        // 把周日转化为7
        function translateWeekday(weekday) {
            if (weekday === 0) {
                return 7;
            }
            return weekday;
        }

        // 把数字转化为两位数
        function format(num) {
            if (num <= 9) {
                return '0' + num;
            }
            return num;
        }

        datePicker.init = init;
        window.datePicker = datePicker;
    }
)();