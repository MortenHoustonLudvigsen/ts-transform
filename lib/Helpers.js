var path = require("path");
var mkdirp = require('mkdirp');
var fs = require("fs");
function ensureDirectory(filename) {
    var dir = path.dirname(filename);
    if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
    }
}
exports.ensureDirectory = ensureDirectory;
function writeFile(filename, value) {
    ensureDirectory(filename);
    fs.writeFileSync(filename, value, 'utf8');
}
exports.writeFile = writeFile;
//# sourceMappingURL=Helpers.js.map