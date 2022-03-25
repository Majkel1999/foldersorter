import * as vscode from 'vscode';
import { format, formatAndOrganize } from './commands';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(format);
	context.subscriptions.push(formatAndOrganize);
}

export function deactivate() { }
