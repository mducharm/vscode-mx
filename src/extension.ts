import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "mx" is now active.');

	let commands = [
		{
			name: 'extension.helloWorld',
			command: () => {
				vscode.window.showInformationMessage('Hello World!');
			}
		}
	]

	let disposables = commands.map(cmd => vscode.commands.registerCommand(cmd.name, cmd.command));

	disposables.forEach(disposable => context.subscriptions.push(disposable));

}

export function deactivate() { }
