var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Writer = require("./Writer");
var StringWriter = (function (_super) {
    __extends(StringWriter, _super);
    function StringWriter() {
        _super.apply(this, arguments);
        this.value = "";
    }
    StringWriter.prototype._write = function (str) {
        this.value += str;
    };
    return StringWriter;
})(Writer);
module.exports = StringWriter;
//# sourceMappingURL=StringWriter.js.map