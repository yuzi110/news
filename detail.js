const NewsDataList = require("./data/data.json");
const Fs = require("fs");
const cheerio = require("cheerio");
module.exports = (id)=>{

    const template = Fs.readFileSync("./views/detail.html");
    //初始化
    const $ = cheerio.load(template);
    const currentId = +id || 1;
    const currentNewsData = getCurrentNewsDataById(currentId);

    $(".text").html(creatNewsContentHtml(currentNewsData));
    return $.html();

};

function creatNewsContentHtml(data){
    return `
        <h1 class="title">${data.title}</h1>
        <div class="article-info"> ${data.from} 时间：${data.newTime}</div>
        <p class="content">
            ${data.title}
        </p>
    `;
}

function getCurrentNewsDataById(id) {
    return NewsDataList.find((data)=>data.id === id);
}