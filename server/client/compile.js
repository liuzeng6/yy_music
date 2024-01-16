const { execSync } = require("child_process");
const { log } = require("console");
const mini = require("html-minifier").minify;
const fs = require("fs");
let args = process.argv.slice(2);
let dir = fs.readdirSync(__dirname);
const minify = (data) => {
    return mini(data, {
        removeComments: true,
        minifyJS: true,
        minifyCSS: true,
        collapseWhitespace: true,
        collapseInlintTagWhitespace: true,
        keepClosesingSlash: true,
    })
}

let html = fs.readFileSync("./player.html").toString();
/* <script src="./js/player.js"></script> */
html = html.replace(/\<script src="\.\/js\/[a-zA-Z]+\.js"\>\<\/script\>/gs, str => {
    let [path] = str.match(/[a-zA-Z]+\.js/gs);
    return `<script>
    ${fs.readFileSync("./js/" + path).toString()}
    </script>`;
}).replace(/\<link rel="stylesheet" href="\.\/css\/[a-z_]+\.css"\>/gs, str => {
    let [path] = str.match(/[a-z_]+\.css/gs);
    // console.log(str,path);
    // console.log(fs.readFileSync("./css/" + path).toString())
    return `<style>
    ${fs.readFileSync("./css/" + path).toString()}
    </style>`;
});
fs.writeFileSync('pc.html', minify(html));
fs.writeFileSync('pc.dev.html', (html));