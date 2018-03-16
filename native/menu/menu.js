window.onload = function() {
    const menuListContent = document.getElementById('menuListContent');
    const menuList = document.getElementById('menuList');
    menuListContent.addEventListener('mouseover', menuListMouseOverHandle);
    menuListContent.addEventListener('mouseout', menuListMouseOutHandle);
    menuList.addEventListener('mouseout', subMenuListMouseOutHandle);

    let lastElement = null;
    let timer = null;
    let points = [];
    let isSubMenuChange = true;
    let isSubMenuToParent = true;

    // 鼠标移入事件
    function menuListMouseOverHandle(event) {
        if (event.target.tagName.toLowerCase() === 'li') {
            if (isSubMenuToParent) {
                if (lastElement && lastElement.classList.contains('active')) {
                    lastElement.classList.remove('active');
                }
                isSubMenuChange = true;
                isSubMenuToParent = false;
                points = [];
            }
            if (isSubMenuChange) {
                lastElement = document.getElementById(event.target.dataset.value);
                if (!lastElement.classList.contains('active')) {
                    lastElement.classList.add('active');
                }
            }
        }
        addPointToPoints({ x: event.pageX, y: event.pageY });
    }

    // 鼠标移出事件
    function menuListMouseOutHandle(event) {
        if (event.target.tagName.toLowerCase() === 'li') {
            addPointToPoints({ x: event.pageX, y: event.pageY });
            const left = getEelementLeft(lastElement);
            const top = getEelementTop(lastElement);
            const height = lastElement.offsetHeight;
            const lastElementLeftTop = { x: left, y: top };
            const lastElementLeftBottom = { x: left, y: top + height };
            isSubMenuChange = isInTriangle(points[1], points[0], lastElementLeftTop, lastElementLeftBottom);
            if (isSubMenuChange) {
                if (lastElement && lastElement.classList.contains('active')) {
                    lastElement.classList.remove('active');
                }
            }
        }
    }

    // 子菜单鼠标移出事件
    function subMenuListMouseOutHandle(event) {
        if (event.target.classList.contains('active')) {
            isSubMenuToParent = true;
        }
    }

    // 鼠标位置放入数组
    function addPointToPoints(point) {
        points.push(point);
        if (points.length > 2) {
            points.shift();
        }
    }

    // 获取元素的纵坐标
    function getEelementTop(ele) {
        let top = 0;
        let tempEle = ele;
        while(tempEle && tempEle.offsetTop !== null) {
            top += tempEle.offsetTop;
            tempEle = tempEle.offsetParent;
        }
        return top;
    }

    // 获取元素的横坐标
    function getEelementLeft(ele) {
        let left = 0;
        let tempEle = ele;
        while(tempEle && tempEle.offsetLeft !== null) {
            left += tempEle.offsetLeft;
            tempEle = tempEle.offsetParent;
        }
        return left;
    }

    // 判断点是否在三角形内
    function isInTriangle(p, a, b, c) {
        const pa = toVector(p, a);
        const pb = toVector(p, b);
        const pc = toVector(p, c);
        if (isSimilar(vectorMuti(pa, pb), vectorMuti(pa, pc))) {
            return true;
        }
        return false;
    }

    // 坐标转化为向量
    function toVector(a, b) {
        return { x: (b.x - a.x), y: (b.y - a.y) };
    }

    // 向量相乘
    function vectorMuti(a, b){
        return (a.x * b.y - a.y * b.x);
    }
    
    // 判断数字是否同号
    function isSimilar(num1, num2) {
        return (num1 * num2 > 0? true: false);
    }
}