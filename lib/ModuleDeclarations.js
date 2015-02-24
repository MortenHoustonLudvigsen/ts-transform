var ts = require("typescript");
var ModuleDeclaration = require('./ModuleDeclaration');
var ModuleDeclarations = (function () {
    function ModuleDeclarations(srcFiles) {
        var _this = this;
        this.moduleMap = {};
        this.modules = [];
        var options = {
            target: 2 /* Latest */,
            module: 0 /* None */
        };
        var host = ts.createCompilerHost(options);
        var program = ts.createProgram(srcFiles, options, host);
        srcFiles.forEach(function (filename) {
            ts.forEachChild(program.getSourceFile(filename), function (node) {
                if (node.kind === 189 /* ModuleDeclaration */) {
                    _this.add(node);
                }
            });
        });
    }
    ModuleDeclarations.prototype.add = function (tsModuleDeclaration) {
        var moduleName = tsModuleDeclaration.name.text;
        var moduleDeclaration = this.moduleMap[moduleName];
        if (!moduleDeclaration) {
            moduleDeclaration = new ModuleDeclaration(moduleName);
            this.moduleMap[moduleName] = moduleDeclaration;
            this.modules.push(moduleDeclaration);
        }
        moduleDeclaration.add(tsModuleDeclaration);
    };
    return ModuleDeclarations;
})();
module.exports = ModuleDeclarations;
//# sourceMappingURL=ModuleDeclarations.js.map