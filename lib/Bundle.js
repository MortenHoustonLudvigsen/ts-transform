var Helpers = require("./Helpers");
var StringWriter = require("./StringWriter");
var ModuleDeclarations = require('./ModuleDeclarations');
function bundle(options) {
    var writer = new StringWriter();
    var moduleDeclarations = new ModuleDeclarations(options.srcFiles);
    moduleDeclarations.modules.forEach(function (m) { return m.writeTo(writer); });
    Helpers.writeFile(options.outFile, writer.value);
}
module.exports = bundle;
//# sourceMappingURL=Bundle.js.map