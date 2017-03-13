// 加载File System读写模块
var fs = require('fs');
var xlsx = require("node-xlsx");
var language = require('./language');

//语言简写，对应 language.js的key值 ， 以及文件名
var name = ['it_CH', 'ar_IL', 'he_IL', 'id_ID', 'uk_UA', 'ms_MY'];
var json = {};
var list, data, index;

//init language for new language
for (var j in name) {
    language[name[j]] = language.en_US;
}
for (var k in name) {
    index = 1;
    list = xlsx.parse('./' + name[k] + '.xlsx')
    data = list[0].data;
    for (var i in language[name[k]]) {
        language[name[k]][i] = data[index][2];
        index++;
    }
    break;
}

//替换反义字符为空
var str = JSON.stringify(language).replace(/\\\\'/g,'\'');
fs.writeFile('./output.js',str )