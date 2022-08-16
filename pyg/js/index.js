window.addEventListener('load', function () {
    //1.鼠标移入 移出焦点图时箭头点变化
    var focus = document.querySelector('.focus');
    var prev = document.querySelector('.prev');
    var next = document.querySelector('.next');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        timer = setInterval(function () {
            //手动调用事件
            next.click();
        }, 2000);
    });
    //2.动态生成小圆圈 有几张图就有几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for (var i = 0; i < ul.children.length; i++) {
        //创建li
        var li = this.document.createElement('li');
        //插入li
        li.setAttribute('index', i);
        ol.appendChild(li);
        //3.绑定点击事件
        li.addEventListener('click', function () {
            //干掉所有
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下自己
            this.className = 'current';
            //点击小圆圈移动图片
            // ul 的移动距离就是小圆圈的索引号 * 移动距离 注意是 - 值

            var index = this.getAttribute('index');
            //当点击了某个li 就要把li的index给num
            num = index;
            circle = index;
            animate(ul, -index * focusWidth)
        })
    }
    ol.children[0].className = 'current';
    // 6.克隆第一张图片放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //7.点击右按钮图片移动
    // 控制小圆圈的播放
    var circle = 0;
    var num = 0;
    // 节流阀
    var flag = true;
    next.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 无缝滚动 把第一张图克隆一张到最后
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 8.小圆圈
            circle++;
            // 如果circle==4 则走到了克隆的图片
            if (circle == 4) {
                circle = 0;
            }
            circleChang();
        }

    });
    //9.点击左按钮图片移动
    prev.addEventListener('click', function () {
        if (flag) {
            // 无缝滚动 把第一张图克隆一张到最后
            flag = false
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 小圆圈
            circle--;
            // 如果circle<0 则走到了克隆的图片
            if (circle < 0) {
                circle = 3;
            }
            circleChang();
        }
    });
    function circleChang() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //10 自动播放
    var timer = setInterval(function () {
        //手动调用事件
        next.click();
    }, 2000)
})