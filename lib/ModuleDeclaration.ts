import ts = require("typescript");
import Writer = require("./Writer");

class ModuleDeclaration {
    constructor(public name: string) {
    }

    modules: ts.ModuleDeclaration[] = [];

    add(module: ts.ModuleDeclaration) {
        this.modules.push(module);
    }

    writeTo(writer: Writer): void {
        var firstModule = this.modules[0];
        writer.writeLn("declare module %s {", this.name);
        this.modules.forEach((m) => {
            if ('statements' in m.body) {
                this.writeModuleBlock(writer, <ts.ModuleBlock>m.body);
            } else {
                writer.write(m.body.getText());
            }
        });
        writer.writeLn("}\n");
    }

    writeModuleBlock(writer: Writer, body: ts.ModuleBlock): void {
        body.statements.forEach((s) => writer.writeLn("    %s", s.getText()));
    }
}

export = ModuleDeclaration; 