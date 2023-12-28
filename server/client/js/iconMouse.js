let icons = Array.from(document.querySelectorAll('.icon'));
let flag = 'a_'
icons.forEach(el => {
    el.addEventListener("mouseover", function () {
        let src = this.src
        let index = src.lastIndexOf("/") + 1
        let start = src.substring(0, index);
        let end = src.substring(index);
        this.src = `${start}${flag}${end}`
    })
    el.addEventListener('mouseout', function () {
        let src = this.src
        this.src = src.replace(flag, '')
    })
})
//鼠标移入和移出icon

let oBar = byId("bar");
oBar.onclick = function (ev) {
    let maxWidth = oBar.offsetWidth;
    let left = oBar.offsetLeft;
    let coordinate = ev.clientX;
    let progress = (coordinate - left) / maxWidth * 100
    byId('playbar-playhead').style.width = progress + '%';
    oAudio.currentTime = oAudio.duration * (progress / 100)
}
//进度条事件






byId('play').onclick = play
//播放按钮

byId('nextSong').onclick = nextSong
byId('lastSong').onclick = lastSong
//上一首和下一首


byId("download").onclick = () => { download(oAudio.src) }
//下载按钮


oMode = byId("mode")
oMode.mode = Boolean(localStorage.mode);
oMode.calibrate = function (quiet) {
    if (this.mode) {
        this.src = './images/icon/sequence.png'
        if (!quiet) Toast('当前模式:顺序播放', 2000);
        localStorage.setItem('mode', 'true');
    } else {
        this.src = './images/icon/once.png';
        if (!quiet) Toast('当前模式:单曲循环', 2000);
        localStorage.setItem('mode', '');
    }
    this.mode = !this.mode
}
//切换模式

oMode.calibrate(true);
// mode = false表示随机播放 mode = true 表示单曲循环
byId("mode").onclick = ()=>{
    oMode.calibrate(false)
};
//切换模式按钮

byId('list-btn').open = false;

byId('list-btn').onclick = function () {
    this.open ? hideMusicList() : showMusicList()
}

byId("hideMusicList").onclick = hideMusicList
//播放列表


byId('showHide_playbar').onclick = function () {
    let closed = byId("player").style.bottom == '-80px';
    if (closed) {
        openPlayer();
        this.src = './images/icon/down.png';
    } else {
        closePlayer();
        this.src = './images/icon/up.png';
    }
}
//播放器的显示隐藏



let oListBtn = byId("list-btn");
let bg = byId("musicList-bg");
bg.style.left = oListBtn.offsetLeft - 480 + oListBtn.offsetWidth + 'px';
// 播放列表的定位

setSongName('酷狗音乐 - 就是歌多');
setAlbumImg("https://www.kugou.com/yy/static/images/play/default.jpg");

// byId('list-btn').onclick();
// showMusicList();
// closePlayer()
updateMusicListData();  

