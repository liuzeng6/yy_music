let keyword = '';
// 搜索的关键字
let oSearchBtn = byId("search_btn");
// 搜索按钮

oSearchBtn.keyword = Date.now();
oSearchBtn.onclick = async function () {
    // hideSearchRecommend();
    // console.log('拱拱');
    showSearchContent()
    byId('search_content').open = true
    let keyword = byId("search").value;
    if (oSearchBtn.keyword == keyword) {
        console.log('过滤了重复搜索');
        return false;
    }

    setTimeout(() => {
        console.log('重置了');
        oSearchBtn.keyword = Date.now();
    }, 1000 * 5);
    // 搜索之后重置

    oSearchBtn.keyword = byId("search").value;
    // 防止重复的关键字重复搜索


    pushRecords(keyword);
    // 关键字加入历史记录

    byId("keyword").innerHTML = `"${keyword}"`;
    if (!keyword) {
        byId("keyword").innerHTML = `"热门"`;
    };
    // 搜索标题切换

    let url = `${baseurl}/search/${keyword}`;
    let { data } = await axios(url);

    oListContent = byId("list_content");
    oListContent.innerHTML = '';

    let html = '';
    data.forEach(({ song, id, singer, lkid }, index) => {
        let str = `<li data-id="${id}">
                    <ul>
                        <li style="width: 84px;" class="center">${index + 1}</li>
                        <li class="song" title="${song}">${song.replace(keyword, str => `<span class='keyword'>${str}</span>`)}</li>
                        <li class="singer">${singer.replace(keyword, str => `<span class='keyword'>${str}</span>`)}</li>
                        <li style="width: 160px;" class="operate center">
                            <ul>
                                <li><img src="./images/icon/play_b.png" alt="" class="play" title="播放"></li>
                                <li><img src="./images/icon/add_b.png" alt="" class="add" title="添加到列表"></li>
                                <li><img src="./images/icon/download.png" class="download" alt="" title="下载"></li>
                            </ul>
                        </li>
                    </ul>
                </li>`
        // 渲染数据 关键字高亮
        html += str;

    });
    oListContent.innerHTML = html;
    oListContent.download = async (id) => {
        let { data: { url } } = await axios(`${baseurl}/play_url/${id}`);
        download(url);
    };
    // 下载按钮对应的操作


    oListContent.addMusicList = addMusicList;

    for (let i = 0; i < byId('list_content').children.length; i++) {
        const el = byId('list_content').children[i];
        let { id } = el.dataset;

        let oSong = el.querySelector('.song')
        let oPlay = el.querySelector('.operate .play');
        oSong.ondblclick = oPlay.onclick = () => {
            oListContent.addMusicList(id, true)
        };
        // 直接播放

        let oAdd = el.querySelector('.operate .add');
        oAdd.onclick = () => {
            oListContent.addMusicList(id)
        }
        // 添加列表

        let oDownload = el.querySelector('.operate .download');
        oDownload.onclick = () => {
            oListContent.download(id);
        };
        // 下载按钮

    }
    // 给歌曲列表添加事件
}
// 搜索按钮点击事件

let debounce = function () {
    let wait = 500
    clearTimeout(oSearch.timer);
    oSearch.timer = setTimeout(() => {
        keyword = byId("search").value;
        if (keyword == '') {
            showHistory();
        } else {
            document.head.removeChild(document.head.querySelector('script#searchApi'));
            let el = document.createElement("script");
            el.id = 'searchApi'
            el.src = `https://searchtip.kugou.com/getSearchTip?MusicTipCount=7&MVTipCount=0&albumcount=0&keyword=${keyword}&callback=searchCallback`
            document.head.append(el);
        }
    }, wait);
}
// 搜索api

let oSearch = byId("search");
// 搜索输入框
oSearch.onfocus = function () {
    showSearchRecommend();
    // 显示搜索结果

    oSearch.onkeydown = ev => {
        if (ev.key == 'Enter') {
            oSearchBtn.onclick();
            return false;
        }
    }
    // 搜索框中输入回车搜索

    oSearch.index = -1;
    // 方向键控制选中

    oSearch.select = (index) => {
        let oList = byId("search_list");
        Array.from(oList.children).forEach((el, cur) => {
            el.classList.remove("active");
            if (index == cur) {
                el.classList.add("active");
                oSearch.value = el.innerText;
            }
        });

    }
    // 选中函数

    let _keydown = window.onkeydown;
    // 记录全局的键盘事件

    window.onkeydown = (ev) => {
        let key = ev.key;
        if (key == 'ArrowDown') {
            let cur = ++oSearch.index;
            cur == oList.children.length && (cur = 0);
            oSearch.index = cur;
            oSearch.select(cur);
            return false;
        }
        if (key == 'ArrowUp') {
            let cur = --oSearch.index;
            cur == -1 && (cur = oList.children.length - 1);
            oSearch.index = cur;
            oSearch.select(cur);
            return false;
        }

    };
    // 获得焦点的键盘事件

    oSearch.onblur = () => {
        window.onkeydown = _keydown;
        hideSearchRecommend()
    }
    // 失去焦点后把键盘事件还给全局并且把搜索结果隐藏


    oSearch.timer = null;
    oSearch.oninput = function () {
        keyword = this.value;
        oSearch.index = -1;
        showSearchRecommend();
        debounce();
    }
    // 键盘输入将选中的列表重置并且加载数据 
}
//搜索输入框获得焦点

let oClear = byId("clear");
oClear.onclick = function () {
    localStorage.removeItem('records');
}
// 清除历史搜索记录


let showHistory = () => {
    let records = localStorage.records || '[]';
    records = JSON.parse(records);
    // 获取历史记录
    if (!records.length) {
        hideSearchRecommend();
        return;
    }
    // 如果历史记录为空关闭搜索结果栏

    renderSearchList(records)
    // 加载搜索的数据

    oClear.style.display = 'block';
    let oSearchRecommend = byId('search_recommend');
    oSearchRecommend.style.display = 'block';
    // 显示搜索结果栏
}
// 显示清除历史搜索记录


let hideHistory = () => {
    let oClear = byId("clear");
    oClear.style.display = 'none';
    console.log('hide');
}
// 隐藏清除历史搜索记录


let pushRecords = (record) => {
    if (!record) return false;
    let records = localStorage.records || '[]';
    records = JSON.parse(records);
    if (records.includes(record)) records = records.filter(el => record != el);;
    records.length >= 7 && records.pop();
    records.unshift(record);
    records = JSON.stringify(records)
    localStorage.setItem('records', records)
}
// 添加历史记录

let showSearchRecommend = (force) => {
    let keyword = byId("search").value;
    if (keyword == '') {
        showHistory();
        return false;
    } else {
        hideHistory();
        let oSearchRecommend = byId('search_recommend');
        oSearchRecommend.style.display = 'block';
        debounce();
    }
}
// 显示搜索结果栏

let hideSearchRecommend = () => {
    setTimeout(function () {
        let oSearchRecommend = byId('search_recommend');
        oSearchRecommend.style.display = 'none';
    }, 300);
    // 定时器关闭,不然直接隐藏会导致点击搜索功能失效
}
// 隐藏搜索结果栏

let oList = byId("search_list");
// 搜索结果的列表

oList.onclick = ev => {
    if (ev.target.tagName == 'LI') {
        byId("search").value = ev.target.innerText;
        oSearchBtn.onclick();
    }
}
// 搜索结果的列表的事件事件委托写法


let searchCallback = data => {
    console.log('搜索了');
    // if (!data.data.length) {
    //     showHistory();
    //     return;
    // }
    // 如果没有搜索到数据

    if (!data.data[0].RecordCount) {
        console.log('b');
        hideSearchRecommend()
        return;
    }
    // 搜索结果空
    let { data: [{ RecordDatas }] } = data;
    RecordDatas = RecordDatas.map(el => el.HintInfo);
    renderSearchList(RecordDatas);
    // 加载获取到的搜索结果
}
// 获取数据后会调用这个函数



let renderSearchList = RecordDatas => {
    let oList = byId("search_list");
    oList.innerHTML = '';
    let oFragment = document.createDocumentFragment();
    RecordDatas.forEach(item => {
        let HintInfo = item;
        HintInfo = HintInfo.replace(keyword, str => `<span class='keyword'>${str}</span>`)
        let oLi = document.createElement("li");
        oLi.innerHTML = `${HintInfo}`
        oFragment.appendChild(oLi);
    });
    oList.appendChild(oFragment)
}
// 加载获取到的搜索结果