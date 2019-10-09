exports.memes = () =>{
    var fs = require('fs');
    
    var files = [];
    fs.readdirSync('./memes/').forEach(file => {
        files += file + "\n";
      });

    return files;

}