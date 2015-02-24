import ts = require("typescript");
import Writer = require("./Writer");

//type NodeType = ts.Node | ModuleDeclaration;
//type ModuleMap = { [name: string]: ModuleDeclaration };

class ModuleDeclaration {
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