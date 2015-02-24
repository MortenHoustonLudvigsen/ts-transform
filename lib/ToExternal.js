var Helpers = require("./Helpers");
var StringWriter = require("./StringWriter");
var ModuleDeclarations = require('./ModuleDeclarations');
function toExternal(options) {
    var writer = new StringWriter();
    var moduleDeclarations = new ModuleDeclarations(options.srcFiles);
    var moduleDeclaration = moduleDeclarations.moduleMap[options.internalName];
    if (moduleDeclaration) {
        moduleDeclaration.name = "'" + (options.externalName || options.internalName) + "'";
        moduleDeclaration.writeTo(writer);
    }
    Helpers.writeFile(options.outFile, writer.value);
}
module.exports = toExternal;
//# sourceMappingURL=ToExternal.js.map