let tips = [
    '快捷键 : ctrl+k打开搜索',
    '快捷键 : 空格播放暂停',
    '快捷键 : ctrl+left上一首',
    '快捷键 : ctrl+right下一首',
    '快捷键 : esc打开/关闭歌词',
    '输入8888搜索结果会是TOP榜单前30',
    '输入6666搜索结果会是热门榜单前30'
];
// 提示配置
console.log(tips.join('\n'));

const oNotification = byId("notification");
oNotification.setContent = (tip) => {
    oNotification.querySelector('.content').innerHTML = tip
}
// 设置提示文字
oNotification.show = () => {
    oNotification.style.right = '16px';
}
// 显示提示
oNotification.querySelector(".close").onclick = () => {
    oNotification.style.right = "-330px"
}
// 关闭提示

oNotification.setContent(tips.join("<br>"));
let memory = localStorage.getItem("memory") || 2;

setTimeout(() => {
    console.log(memory);
    if (!memory > 2 ^ 10) {
        let rand = Math.floor(Math.random() * memory + 1);
        console.log(rand);
        if (rand == 1) {
            rand == 1 && oNotification.show();
            localStorage.setItem('memory', memory * 2)
        }
    }
}, 1000 * 30)
// 每次提示之后会把提示频次提上去



