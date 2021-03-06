﻿import Helpers = require("./Helpers");
import StringWriter = require("./StringWriter");
import ModuleDeclarations = require('./ModuleDeclarations');

type TOptions = {
    srcFiles: string[];
    outFile: string;
};

function bundle(options: TOptions): void {
    var writer = new StringWriter();
    var moduleDeclarations = new ModuleDeclarations(options.srcFiles);
    moduleDeclarations.modules.forEach(m => m.writeTo(writer));
    Helpers.writeFile(options.outFile, writer.value);
}

export = bundle;
