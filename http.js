const http = require("http");
const fs = require("fs");
const path = require("path");
const mimeData = require("./data/mime.json");
const news = require("./news.js");
const Detail = require("./detail.js");
const url = require("url")

const server = http.createServer((req,res)=>{
    // console.log(req.url);
    const {pathname,query} = url.parse(req.url,true);

    res.setHeader("content-type","text/html;charset=utf-8");
    if (pathname ==="/"){
        // const homePage = fs.readFileSync("./views/news.html")
        // res.end(homePage);
        const p = +query.p;
        res.end(news(p))
    }else if(pathname ==="/detail"){
        const id = query.id;
        res.end(Detail(id));
    }else {
        //加载css
        //静态资源加载
        if (req.url.includes("/favicon.ico"))return;
        const extname = path.extname(req.url);
        const mimeType = mimeData[extname];
        res.setHeader("content-type",`${mimeType}; charset=utf-8`);
        const file = fs.readFileSync("./static" + req.url);
        res.end(file);
    }


});
server.listen(8080);