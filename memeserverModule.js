exports.memeserver = (port) => {
    const http = require('http');
    const memes = require('./memeModule');
    const fs = require('fs');
    const url = require('url');

    

http.createServer(function (req, res) {

    var q = url.parse(req.url, true);
    var qData = q.query;

    if (q.search != null) {
        
        res.writeHead(200, {'Content-Type' : 'image/gif'})
        fs.readFile('./memes/' +qData.search, (err, img)=>{
            res.end(img);
        })

    } else if(q.pathname.length > 1) {
        res.writeHead(200, {'Content-Type': 'image/gif'});
        fs.readFile('.'+q.pathname, (err, img)=>{
            res.end(img);
        })


    }
    else{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var files = memes.memes();
        files = files.split("\n")

        var html = "<html>\n<body>\n<div>\n"



            for (let i = 0; i < files.length - 1; i++) {
                html += "<a href='.?search=" + files[i] + "'>" + files[i] + "</a><br>\n";
            }
            html += "\n</div>\n</body>\n</html>";


            res.end(html);
        
    }






}).listen(port);




}