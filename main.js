var audio = document.querySelector('audio');
var speeds = [0.8, 1, 1.1, 1.2, 1.3, 1.5, 1.7, 2, 2.5, 3]

function changeSpeed(speedIndex) {
    var speed = speeds[speedIndex]
    audio.playbackRate = speed;
    var display = document.querySelector('.myipn-speed-display');
    display.innerText = speed.toFixed(1) + '×'
}

function speedUp() {
    var currentIndex = speeds.indexOf(audio.playbackRate);
    var newIndex = currentIndex + 1;
    if (newIndex == speeds.length) {
        newIndex = 0;
    }
    changeSpeed(newIndex);
}

function speedDown() {
    var currentIndex = speeds.indexOf(audio.playbackRate);
    var newIndex = currentIndex - 1;
    if (newIndex == -1) {
        newIndex = speeds.length - 1;
    }
    changeSpeed(newIndex);
}

function jump(timeDelta) {
    audio.currentTime += timeDelta;
}

function back15() {
    jump(-15);
}

function foward30() {
    jump(30);
}

if (audio) {
    var controller = document.createElement('div');
    controller.className = 'myipn-controller'
    controller.innerHTML = '<div class=myipn-jump>\
                                <a href="javascript:void(0)" class="myipn-button myipn-button-jump">↼ 15s</a>\
                                <a href="javascript:void(0)" class="myipn-button myipn-button-jump">30s ⇀</a>\
                            </div>\
                            <div class="myipn-speed">\
                                <a href="javascript:void(0)" class="myipn-speed-control">-</a>\
                                <a href="javascript:void(0)" class="myipn-button myipn-speed-display">1.0×</a>\
                                <a href="javascript:void(0)" class="myipn-speed-control" >+</a>\
                            </div>';
    var buttonGroup = audio.nextElementSibling;
    buttonGroup.appendChild(controller);

    controller.children[0].children[0].onclick = back15;
    controller.children[0].children[1].onclick = foward30;

    controller.children[1].children[0].onclick = speedDown;
    controller.children[1].children[1].onclick = speedUp;
    controller.children[1].children[2].onclick = speedUp;
}
