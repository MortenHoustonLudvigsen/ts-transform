import util = require("util");

class Writer {
    protected _write(str: string): void {
        throw new TypeError("Abstract method");
    }

    write(format: any, ...args: any[]): void {
        if (args.length == 0) {
            this._write(format);
        } else {
            this._write(util.format(format, args));
        }
    }

    writeLn(format: any, ...args: any[]): void {
        if (args.length == 0) {
            this._write(format);
        } else {
            this._write(util.format(format, args));
        }
        this._write("\n");
    }
}

export = Writer;
