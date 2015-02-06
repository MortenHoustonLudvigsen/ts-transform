var ts = require("typescript");
var fs = require("fs");
var path = require("path");
var mkdirp = require('mkdirp');
var Writer = require("./Writer");
var ModuleDeclarations = (function () {
    function ModuleDeclarations() {
        this.modules = [];
    }
    ModuleDeclarations.prototype.write = function (writer) {
        var _this = this;
        var firstModule = this.modules[0];
        writer.writeLn("declare module %s {", firstModule.name.getText());
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
    ModuleDeclarations.prototype.writeModuleBlock = function (writer, body) {
        body.statements.forEach(function (s) { return writer.writeLn("    %s", s.getText()); });
    };
    ModuleDeclarations.prototype.add = function (module) {
        this.modules.push(module);
    };
    return ModuleDeclarations;
})();
function transform(filename, source, writer) {
    var nodes = [];
    var moduleMap = {};
    function visit(node) {
        switch (node.kind) {
            case ts.SyntaxKind.ModuleDeclaration:
                var module = node;
                var moduleName = module.name.text;
                var moduleDeclarations = moduleMap[moduleName];
                if (!moduleDeclarations) {
                    moduleDeclarations = new ModuleDeclarations();
                    moduleMap[moduleName] = moduleDeclarations;
                    nodes.push(moduleDeclarations);
                }
                moduleDeclarations.add(module);
                break;
            default:
                nodes.push(node);
                break;
        }
    }
    function writeNode(node) {
        if (node instanceof ModuleDeclarations) {
            node.write(writer);
        }
        else {
            writer.writeLn(node.getText());
        }
    }
    ts.forEachChild(source, visit);
    nodes.forEach(writeNode);
}
function bundle(srcFiles, outFile) {
    var result = "";
    var writer = new Writer(function (str) { return result += str; });
    var options = {
        target: ts.ScriptTarget.Latest,
        module: ts.ModuleKind.None
    };
    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(srcFiles, options, host);
    srcFiles.forEach(function (f) { return transform(f, program.getSourceFile(f), writer); });
    var outDir = path.dirname(outFile);
    if (!fs.existsSync(outDir)) {
        mkdirp.sync(outDir);
    }
    fs.writeFileSync(outFile, result, 'utf8');
}
exports.bundle = bundle;
//# sourceMappingURL=Bundle.js.map