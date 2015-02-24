import Writer = require("./Writer");

class StringWriter extends Writer {
    public value = "";

    protected _write(str: string): void {
        this.value += str;
    }
}

export = StringWriter;
 