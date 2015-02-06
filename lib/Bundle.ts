import ts = require("typescript");
import fs = require("fs");
import path = require("path");
import util = require("util");
import mkdirp = require('mkdirp');
import Writer = require("Writer");

class ModuleDeclarations {
    modules: ts.ModuleDeclaration[] = [];

    write(writer: Writer): void {
        var firstModule = this.modules[0];
        writer.writeLn("declare module %s {", firstModule.name.getText());
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

    add(module: ts.ModuleDeclaration) {
        this.modules.push(module);
    }
}

type NodeType = ts.Node | ModuleDeclarations;

function transform(filename: string, source: ts.SourceFile, writer: Writer) {
    var nodes: NodeType[] = [];
    var moduleMap: { [name: string]: ModuleDeclarations } = {};

    function visit(node: ts.Node) {
        switch (node.kind) {
            case ts.SyntaxKind.ModuleDeclaration:
                var module = <ts.ModuleDeclaration>node;
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

    function writeNode(node: NodeType) {
        if (node instanceof ModuleDeclarations) {
            node.write(writer);
        } else {
            writer.writeLn((<ts.Node>node).getText());
        }
    }

    ts.forEachChild(source, visit);
    nodes.forEach(writeNode);
}

export function bundle(srcFiles: string[], outFile: string): void {
    var result = "";
    var writer = new Writer((str) => result += str);
    var options: ts.CompilerOptions = {
        target: ts.ScriptTarget.Latest,
        module: ts.ModuleKind.None
    };

    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(srcFiles, options, host);
    srcFiles.forEach((f) => transform(f, program.getSourceFile(f), writer));

    var outDir = path.dirname(outFile);
    if (!fs.existsSync(outDir)) {
        mkdirp.sync(outDir);
    }
    fs.writeFileSync(outFile, result, 'utf8');
}
