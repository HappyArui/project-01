function animate(obj, target, callback) {
    //当我们不断点击按钮 这个元素就会越来越快 因为开启了太多定时器
    //解决方案 只有一个定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长值在定时器得到里面
        // 把步长值改为整数
        // var step = Math.ceil((target - obj.offsetLeft) / 200);
        var step = (target - obj.offsetLeft) / 100;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 停止定时器
            //回调函数写在定时器里面
            if (callback) {
                callback();
            }
        }
        // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 1)
}