let oAudio = byId("audio");
// audio标签

let oLrcBox = byId("lrc-box")
oLrcBox.calibrate = function () {
    console.log('bbb');
    let oPlayer = byId('player');
    let h = document.documentElement.clientHeight - 120;
    this.style.height = h + 'px';
    // console.log(document.documentElement.clientHeight , this.offsetTop);
}
oLrcBox.calibrate();


const H = 30;
// 单行歌词的高度

oAudio.count = 0;
oAudio.ontimeupdate = function () {
    let x = 4;
    oAudio.count++;
    if (oAudio.count % x == 0) {
        let minute = parseTime(parseInt(oAudio.currentTime / 60));
        let second = parseTime(parseInt(oAudio.currentTime % 60));
        byId("change-time").innerHTML = `${minute}:${second}`
        let progress = oAudio.currentTime / oAudio.duration * 100;
        byId('playbar-playhead').style.width = progress + '%';
    }
    // 一首歌播完之后切换歌曲
}
//音乐播放每隔一秒触发

oAudio.addEventListener("seeked", function () {
    if (oAudio.currentTime == 0) { oLrc.index = 0; return; };
    for (let i = 0; i < lrcList.length; i++) {
        if (oAudio.currentTime > lrcList[i].second && oAudio.currentTime < lrcList[i + 1]?.second) {
            oLrc.index = i;
            return;
        }
    }
})
// 当进度条变化时

oAudio.onended = function () {
    nextSong();
}
// 切歌的时候

oAudio.timer = null;


oAudio.onplay = function () {
    console.log('play');
    byId('play').src = './images/icon/stop.png';

    oAudio.timer = null;
    oAudio.timer = setInterval(() => {
        if (oAudio.currentTime > (lrcList[oLrc.index]?.second)) {
            oLrc.style.top = - (H * (oLrc.index - oLrc.offset)) + "px";
            // console.log(oLrc.style.top, oLrc.index);
            Array.from(lrc.children).forEach(el => {
                el.className = '';
            })
            let cur = oLrc.index;
            
            // next = next == lrcList.length ? oLrc.index : oLrc.index + 1;
            // oLrc.children[next].className = 'next';
            // console.log(oLrc.index);
            oLrc.children[cur].className = 'cur';
            oLrc.index++;
        }
    }, 50)
}
//当音乐播放

oAudio.onpause = function () {
    byId('play').src = './images/icon/play.png';
    clearInterval(this.timer);
}
//当音乐暂停

oAudio.ondurationchange = function () {
    let minute = parseTime(parseInt(oAudio.duration / 60));
    let second = parseTime(parseInt(oAudio.duration % 60));
    byId("all-time").innerHTML = `${minute}:${second}`;
}
//当切歌，音乐总时长发生变化


