import Helpers = require("./Helpers");
import StringWriter = require("./StringWriter");
import ModuleDeclarations = require('./ModuleDeclarations');

type TOptions = {
    internalName: string;
    externalName?: string;
    srcFiles: string[];
    outFile: string;
};

function toExternal(options: TOptions): void {
    var writer = new StringWriter();
    var moduleDeclarations = new ModuleDeclarations(options.srcFiles);
    var moduleDeclaration = moduleDeclarations.moduleMap[options.internalName];
    if (moduleDeclaration) {
        moduleDeclaration.name = "'" + (options.externalName || options.internalName) + "'";
        moduleDeclaration.writeTo(writer);
    }
    Helpers.writeFile(options.outFile, writer.value);
}

export = toExternal;

