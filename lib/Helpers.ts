import path = require("path");
import mkdirp = require('mkdirp');
import fs = require("fs");

export function ensureDirectory(filename: string): void {
    var dir = path.dirname(filename);
    if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
    }
}

export function writeFile(filename: string, value: string): void {
    ensureDirectory(filename);
    fs.writeFileSync(filename, value, 'utf8');
}