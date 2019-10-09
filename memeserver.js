const http = require('http');
const memes = require('./memeModule');
const fs = require('fs');
const url = require('url');


http.createServer(function (req, res) {

    var q = url.parse(req.url, true);

    if (q.search != null) {
        var qData = q.query;
        res.writeHead(200, {'Content-Type' : 'image/gif'})
        fs.readFile('./memes/' +qData.search, (err, img)=>{
            res.end(img);
        })

    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var files = memes.memes();
        files = files.split("\n")

        fs.readFile('./index.html', (err, html) => {

            for (let i = 0; i < files.length - 1; i++) {
                html += "<a href='.?search=" + files[i] + "'>" + files[i] + "</a><br>\n";
            }
            html += "\n</div>\n</body>\n</html>";


            res.end(html);
        });
    }






}).listen(8080);