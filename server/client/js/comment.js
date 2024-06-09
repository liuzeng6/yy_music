let parseTime = time => time >= 10 ? time : "0" + time;
let byId = document.getElementById.bind(document);
const baseurl = "";

// let lrcList = [];


let oLrc = byId("lrc");
// 歌词对象
oLrc.index = 0;
// 歌词所在位置

oLrc.offset = 8;
// 歌词偏移量

let addMusicList = async (id, flag) => {
    let { data } = await axios(`${baseurl}/play_url/${id}`);
    let { pic, title, url, lkid } = data
    let [singer, song] = title.replace(/\s/g, '').split('-');
    pushMusicList({ url, pic, song, singer, lkid, id }, flag)
    return false;
};
// 将选中的歌曲添加到列表 flag为true表示直接播放



let musicList = sessionStorage.musicList || '[]' || [

    // {
    //     "id": "aGRuY3Zrd2s",
    //     "url": "https://lw-sycdn.kuwo.cn/a0028f2c19eebc38c67044d1bb16f35a/658c3c76/resource/30106/trackmedia/M500004HtbeG1hrKLv.mp3",
    //     "pic": "https://img1.kuwo.cn/star/albumcover/300/14/48/3950982335.jpg",
    //     "song": "句号",
    //     "singer": "G.E.M.邓紫棋",
    //     "lkid": 83765010
    // }, {
    //     "id": "eHZ2aGhr",
    //     "url": "https://ci-sycdn.kuwo.cn/603bad627a241729eaa9d0ea2866849c/658c3cc3/resource/n1/80/97/3901966446.mp3",
    //     "pic": "https://img1.kuwo.cn/star/albumcover/300/29/58/2626999921.jpg",
    //     "song": "有何不可",
    //     "singer": "许嵩",
    //     "lkid": 455880
    // }, {
    //     "id": "aHZua3Zt",
    //     "url": "https://li-sycdn.kuwo.cn/ada3057ba3aedec5b85d59089b4fc216/658c3cd0/resource/n3/32/83/2885640101.mp3",
    //     "pic": "https://img1.kuwo.cn/star/albumcover/300/32/55/3703949975.jpg",
    //     "song": "素颜",
    //     "singer": "许嵩&何曼婷",
    //     "lkid": 857052
    // }

];

let getId = () => location.hash.substring(1)

musicList = JSON.parse(musicList);
if (musicList.length == 0) {
    // console.log("歌单里面没有歌");
    if (location.hash) {
        let id = getId()
        addMusicList(id, true);
    }
} else {
    if (location.hash) {
        let id = getId();
        if (musicList.map(el => el.id).includes(id)) {
            window.onload = function () {
                musicPlay(currentIndex);
            }
            // console.log("歌单里面已经存在了，一般是主动刷新了");
        } else {
            addMusicList(id, true);
            // console.log("歌单里面还没有，一般是打开了一个新的链接");
        }
    }

}

let currentIndex = 0;


function Toast(msg, duration) {
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = `
        max-width: 60%;
        min-width: 150px;
        padding: 0px 14px;
        height: 40px;
        color: #fff;
        line-height: 40px;
        text-align: center;
        border-radius: 4px;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -20px;
        background: rgba(0, 0, 0, 0.6);
    `;
    document.body.appendChild(m);
    m.style.marginLeft = -(m.offsetWidth / 2) + "px"
    setTimeout(function () {
        document.body.removeChild(m)
    }, duration);
}




let setAlbumImg = path => {
    byId("albumImg").src = path
}
// 设置播放器的封面
let setSongName = songName => {
    byId("songName").innerHTML = songName
}
//设置播放器歌曲名
let play = () => {
    if (musicList.length == 0) {
        byId("search").value = '';
        Toast("播放队列里没有歌曲,已经自动为你推荐热门歌曲", 2000);
        byId("search_btn").onclick()
        return false;
    }
    let isPlay = !oAudio.paused;
    if (isPlay) {
        oAudio.pause();
    } else {
        oAudio.play();
    }
}
// 点击播放按钮

let openPlayer = () => {
    byId("player").style.bottom = '0px';
}
// 打开播放器

let closePlayer = () => {
    let oPlayer = byId("player")
    oPlayer.style.bottom = -(oPlayer.offsetHeight) + "px"
    hideMusicList();
}
// 隐藏播放器

let musicPlay = async (index) => {
    console.log("播放歌曲");
    let { url, pic, song, singer, lkid, id } = musicList[index];
    let { data: lrc } = await axios(`${baseurl}/lrc/${lkid}`);
    lrcList = lrc;
    renderLyrics(lrcList);
    byId('lrc').index = 0;
    // next = 1;

    if(!url){
        let { data } = await axios(`${baseurl}/play_url/${id}`);
        url = data.url;
    }

    location.hash = `${id}`
    // 便于分享

    oAudio.src = url;
    setSongName(`${singer} - ${song}`);
    setAlbumImg(pic);
    currentIndex = index;
    updateMusicListCurrent();
    oAudio.oncanplay = function () { }
    oAudio.play();
    oAudio.currentTime = 0.1;


}


let renderLyrics = (lrcList) => {
    oLrc.innerHTML = '';
    lrcList.forEach(el => {
        oLrc.innerHTML += `<li>${el.ly}</li>`
    });
}



//播放音乐
let nextSong = () => {
    if (byId("mode").mode) {
        musicPlay(currentIndex);
        return false;
    }
    let cur = ++currentIndex;
    cur == musicList.length && (cur = 0);
    musicPlay(cur);
}
// 下一首

let lastSong = () => {
    if (byId("mode").mode) {
        musicPlay(currentIndex)
        return false;
    }
    let cur = --currentIndex;
    cur == -1 && (cur = musicList.length - 1);
    musicPlay(cur);

}
//上一首

let updateMusicListData = () => {
    console.log('添加列表');
    let oMusicList = byId('music-list');
    oMusicList.onclick = function (ev) {
        if (ev.target.className == 'song') {
            musicPlay(parseInt(ev.target.dataset.index))
        }
    }
    document.querySelector('.queue').innerHTML = `播放队列/${musicList.length}`
    oMusicList.innerHTML = '';
    let html = ''
    musicList.forEach((info, index) => {
        // console.log(info);
        html += `<li class="item" >
        <ul style="display: flex;">
            <li style="width: 36px; text-align: center;">${index + 1}</li>
            <li style="width: 244px;" class="song" data-index="${index}">${info.song}</li>
            <li style="width: 119px;" class="singer">${info.singer}</li>
            <li class="del" onclick="del(${index})">
                <img src="./images/icon/del.png" alt="" width="50%" height="50%">
            </li>
        </ul>
    </li>`;
    });
    oMusicList.innerHTML = html;
    updateMusicListCurrent();
}
// 更新播放列表的数据

let updateMusicListCurrent = () => {
    console.log('切歌');
    let list = Array.from(document.querySelectorAll('#music-list>li'));
    list.forEach((el, index) => {
        el.classList.remove('active')
        if (index == currentIndex) {
            el.classList.add("active");
        }
    })
}
// 切换歌曲




let showMusicList = () => {
    let oListBtn = byId("list-btn");
    let bg = byId("musicList-bg");
    bg.calibrate = function () {
        bg.style.left = oListBtn.offsetLeft - 480 + oListBtn.offsetWidth + 'px';
    }
    bg.calibrate()
    onresize = bg.calibrate;
    bg.style.display = 'block';


    let src = oListBtn.src;
    let index = src.lastIndexOf("/") + 1
    let start = src.substring(0, index);
    let end = src.substring(index);
    oListBtn.src = `${start}${flag}${end}`
    oListBtn.open = true;
}
//显示播放列表

let hideMusicList = () => {
    let oListBtn = byId("list-btn");
    let bg = byId("musicList-bg");
    bg.style.display = 'none';
    oListBtn.src = oListBtn.src.replace(flag, '');
    oListBtn.open = false;
}
//隐藏播放列表

let download = url => {
    open(oAudio.src)
}
// 下载歌曲

let pushMusicList = (info, flag) => {
    if (flag) {
        musicList.splice(currentIndex, 0, info);
        musicPlay(currentIndex)
    } else {
        musicList.push(info);
        Toast("添加成功", 1000);
    }
    updateMusicListData()
    sessionStorage.setItem('musicList', JSON.stringify(musicList));
}
// 添加音乐到播放列表


function del(index) {

    musicList.splice(index, 1);
    sessionStorage.setItem('musicList', JSON.stringify(musicList));

    console.log(index, currentIndex);
    if (index < currentIndex) {
        --currentIndex
    } else if (index == currentIndex) {
        currentIndex--;
        nextSong();
    }
    updateMusicListData();
    event.stopPropagation();
}
// 删除列表中的歌曲


let showlrcBox = () => {
    byId("lrc-box").style.display = 'block';
    oAlbumImg.open = true;
}

let hidelrcBox = () => {
    byId("lrc-box").style.display = 'none';
    oAlbumImg.open = false;
}

let oSearchConent = byId('search_content');
oSearchConent.open = false;
let showSearchContent = () => {
    oSearchConent.style.display = 'block';
    hidelrcBox();
    // console.log('aaaa');
}
let hideSearchContent = () => {
    oSearchConent.style.display = 'none';
}

let oAlbumImg = document.querySelector('.albumImg');
oAlbumImg.open = false;
// 表示歌词是否处于打开状态

oAlbumImg.onclick = function () {
    if (this.open == false) {
        showlrcBox();
        oSearchConent.open && hideSearchContent();
    } else {
        hidelrcBox();
        oSearchConent.open && showSearchContent();
    }
}

