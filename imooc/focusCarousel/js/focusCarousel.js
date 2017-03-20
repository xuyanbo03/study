window.onload = function() {
    var container = document.getElementById('container');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1; //索引
    var len = 5;
    var animated = false; //优化
    var interval = 3000; //时间间隔
    var timer;

    function showButton() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    } //按钮切换

    next.onclick = function() {
        if (animated) {
            return;
        }
        if (index == 5) {
            index = 1;
        } else {
            index += 1;
        }
        animate(-600);
        showButton();
    }//右切换
    prev.onclick = function() {
        if (animated) {
            return;
        }
        if (index == 1) {
            index = 5;
        } else {
            index -= 1;
        }
        animate(600);
        showButton();
    }//左切换

    function play() {
        timer = setTimeout(function() {
            next.onclick();
            play();
        }, interval);
    }

    function stop() {
        clearTimeout(timer);
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            if (animated) {
                return;
            }
            if (this.className == 'on') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -600 * (myIndex - index);
            animate(offset);
            index = myIndex;
            showButton();
        }
    }

    function animate(offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var time = 300; //时间
        var inteval = 10; //时间间隔
        var speed = offset / (time / inteval); //速度
        var left = parseInt(list.style.left) + offset; //改变值来实现滚动

        var go = function() {
                if ((speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                    list.style.left = parseInt(list.style.left) + speed + 'px';
                    setTimeout(go, inteval);
                } else {
                    list.style.left = left + 'px';
                    if (left > -200) {
                        list.style.left = -600 * len + 'px';
                    }
                    if (left < (-600 * len)) {
                        list.style.left = '-600px';
                    }
                    animated = false;
                }
            } //自动滚动
        go();
    }

    container.onmouseover = stop;
    container.onmouseout = play;

    play();
}
