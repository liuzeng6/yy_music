import { createSlice } from "@reduxjs/toolkit";


let _search_record = JSON.parse(localStorage.records || '["周杰伦", "曲婉婷", "罗生门 (follow)", " 罗生门", "赵雷", "赵雷 鼓楼", "赵磊"]')

let saveSearchRecord = (obj) => {
    localStorage.records = JSON.stringify(obj);
}

let playe = [
    {
        "url": "http://sy.sycdn.kuwo.cn/9c95f234037d95d40a1b317cf3a2103b/667d4b1f/resource/n2/99/30/814703912.mp3",
        "pic": "https://img1.kuwo.cn/star/albumcover/300/s3s94/93/211513640.jpg",
        "song": "晴天",
        "singer": "周杰伦",
        "lkid": 228908,
        "id": "bW1oc2to"
    },
    {
        "url": "http://sy.sycdn.kuwo.cn/4152612290006a1300a86bc261f3e2f2/667d4b1a/resource/n2/99/30/814703912.mp3",
        "pic": "https://img1.kuwo.cn/star/albumcover/300/s3s94/93/211513640.jpg",
        "song": "晴天",
        "singer": "周杰伦",
        "lkid": 228908,
        "id": "bW1oc2to"
    }
]


export default createSlice({
    name: "player-slice",
    initialState: {
        el: null,                       //播放器元素
        search_record: _search_record   //搜索记录

    },
    reducers: {
        init(state, action) {
            state.el = action.payload;
        },
        setURL(state, action) {
            state.el.src = action.payload
        },
        remove_search_record(state, action) {
            if (action.payload != undefined) {
                state.search_record.splice(action.payload, 1);
            } else {
                // 清除全部
                state.search_record = []
            }
            saveSearchRecord(state.search_record);

        },
        add_search_record({search_record}, { payload: text }) {
            if (search_record.includes(text)) {
                search_record = search_record.filter(el => el != text);
            };
            search_record.length >= 7 && search_record.pop();
            search_record.unshift(text);
            saveSearchRecord(search_record);
        },
    }
})