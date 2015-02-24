var util = require("util");
var Writer = (function () {
    function Writer() {
    }
    Writer.prototype._write = function (str) {
        throw new TypeError("Abstract method");
    };
    Writer.prototype.write = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args.length == 0) {
            this._write(format);
        }
        else {
            this._write(util.format(format, args));
        }
    };
    Writer.prototype.writeLn = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args.length == 0) {
            this._write(format);
        }
        else {
            this._write(util.format(format, args));
        }
        this._write("\n");
    };
    return Writer;
})();
module.exports = Writer;
//# sourceMappingURL=Writer.js.map