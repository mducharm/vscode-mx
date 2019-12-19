import * as vscode from 'vscode';
import { Command } from './types';

export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "mx" is now active.');

	let commands: Command[] = [
		{
			name: 'extension.helloWorld',
			command: () => {
				vscode.window.showInformationMessage('Hello World!');
			}
		},
		{
			name: 'extension.nodeRun',
			command: () => vscode.commands.executeCommand("workbench.action.terminal.sendSequence", { text: "node ${file}\x0d" })
		},
		{
			name: 'extension.dotnetRun',
			command: () => vscode.commands.executeCommand("workbench.action.terminal.sendSequence", { text: "dotnet run\x0d" })
		},
		{
			name: 'extension.reloadMx',
			command: () => {
				// todo run vsce package
				// todo run code --install-extension mx-0.0.1.vsix
				vscode.window.showInformationMessage('Reloaded');
				vscode.commands.executeCommand('workbench.action.reloadWindow');
			}
		},
		{
			name: 'extension.makeJSClass',
			command: () => {
				const activeEditor = vscode.window.activeTextEditor;
				if (activeEditor) {
					let currentLine = activeEditor.document.lineAt(activeEditor.selection.active.line);
					let lineText = currentLine.text;
					let [className, ...props] = lineText.split(' ').filter((v => v.length > 0));

					let params = props.reduce((a, p, ind, arr) => {
						if (arr.length === 1) { return p; }
						else if (ind === arr.length - 1) { return a + p; }

						return a + p + ", ";
					}, "");


					let propDeclarations = props.map(p => {
						return `\t${p};\n`;
					});

					let propAssignments = props.map(p => {
						return `\tthis.${p} = ${p};\n`;
					});

					let classText = [
						`class ${className}` + " {\n",
						...propDeclarations,
						"\n",
						`\tconstructor(${params}) {\n`,
						...propAssignments,
						"\t}\n",
						"}"
					].reduce((a, v) => a + v);

					activeEditor.edit((editBuilder) => {
						editBuilder.replace(currentLine.range, classText);
					});

				}
			}
		}
	];

	let disposables = commands.map((cmd: Command) => vscode.commands.registerCommand(cmd.name, cmd.command));

	disposables.forEach(disposable => context.subscriptions.push(disposable));

}

export function deactivate() { }