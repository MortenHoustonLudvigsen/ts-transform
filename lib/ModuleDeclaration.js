//type NodeType = ts.Node | ModuleDeclaration;
//type ModuleMap = { [name: string]: ModuleDeclaration };
var ModuleDeclaration = (function () {
    //static getModules(srcFiles: string[]): ModuleMap {
    //    var modules: ModuleMap = {};
    //    var options: ts.CompilerOptions = {
    //        target: ts.ScriptTarget.Latest,
    //        module: ts.ModuleKind.None
    //    };
    //    var host = ts.createCompilerHost(options);
    //    var program = ts.createProgram(srcFiles, options, host);
    //    srcFiles.forEach(filename => {
    //        ts.forEachChild(program.getSourceFile(filename), node => {
    //            if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
    //                var moduleDeclaration = <ts.ModuleDeclaration>node;
    //                var moduleName = moduleDeclaration.name.text;
    //                var moduleDeclarations = modules[moduleName];
    //                if (!moduleDeclarations) {
    //                    moduleDeclarations = new ModuleDeclaration(moduleName);
    //                    modules[moduleName] = moduleDeclarations;
    //                }
    //                moduleDeclarations.add(moduleDeclaration);
    //            }
    //        });
    //    });
    //    return modules;
    //}
    function ModuleDeclaration(name) {
        this.name = name;
        this.modules = [];
    }
    ModuleDeclaration.prototype.add = function (module) {
        this.modules.push(module);
    };
    ModuleDeclaration.prototype.writeTo = function (writer) {
        var _this = this;
        var firstModule = this.modules[0];
        writer.writeLn("declare module %s {", this.name);
        this.modules.forEach(function (m) {
            if ('statements' in m.body) {
                _this.writeModuleBlock(writer, m.body);
            }
            else {
                writer.write(m.body.getText());
            }
        });
        writer.writeLn("}\n");
    };
    ModuleDeclaration.prototype.writeModuleBlock = function (writer, body) {
        body.statements.forEach(function (s) { return writer.writeLn("    %s", s.getText()); });
    };
    return ModuleDeclaration;
})();
module.exports = ModuleDeclaration;
//# sourceMappingURL=ModuleDeclaration.js.map