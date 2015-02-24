var ModuleDeclaration = (function () {
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