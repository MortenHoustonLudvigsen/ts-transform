import ts = require("typescript");
import ModuleDeclaration = require('./ModuleDeclaration');

type ModuleMap = { [name: string]: ModuleDeclaration };

class ModuleDeclarations {
    constructor(srcFiles: string[]) {
        var options: ts.CompilerOptions = {
            target: ts.ScriptTarget.Latest,
            module: ts.ModuleKind.None
        };

        var host = ts.createCompilerHost(options);
        var program = ts.createProgram(srcFiles, options, host);

        srcFiles.forEach(filename => {
            ts.forEachChild(program.getSourceFile(filename), node => {
                if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
                    this.add(<ts.ModuleDeclaration>node);
                }
            });
        });
    }

    public moduleMap: ModuleMap = {};
    public modules: ModuleDeclaration[] = [];

    private add(tsModuleDeclaration: ts.ModuleDeclaration): void {
        var moduleName = tsModuleDeclaration.name.text;
        var moduleDeclaration = this.moduleMap[moduleName];
        if (!moduleDeclaration) {
            moduleDeclaration = new ModuleDeclaration(moduleName);
            this.moduleMap[moduleName] = moduleDeclaration;
            this.modules.push(moduleDeclaration);
        }
        moduleDeclaration.add(tsModuleDeclaration);
    }
}

export = ModuleDeclarations;