let list = [];
let len = 7;
let _push = list.unshift.bind(list);
list.push = function (query) {
    index = this.indexOf(query);
    index != -1 && list.splice(index, 1);
    _push(query);

    this.length > len && (this.length = len);
}
module.exports = list;