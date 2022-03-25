import * as vscode from 'vscode';
import { ExtensionSettings } from './types';


export const format = vscode.commands.registerCommand('folderformatter.formatFolder', (uri: vscode.Uri) => {
    if (typeof uri === 'undefined') {
        vscode.window.showErrorMessage('No folder or file found to format');
        return;
    }
    const workspaceSettings = vscode.workspace.getConfiguration('folderformatter');
    const settings: ExtensionSettings = {
        extensions: workspaceSettings.get('extensions') ?? [],
        recursive: workspaceSettings.get('recursive') ?? true
    };
    formatFiles(uri, settings);
});

export const formatAndOrganize = vscode.commands.registerCommand('folderformatter.formatOrganizeFolder', (uri: vscode.Uri) => {
    if (typeof uri === 'undefined') {
        vscode.window.showErrorMessage('No folder or file found to format');
        return;
    }
    const workspaceSettings = vscode.workspace.getConfiguration('folderformatter');
    const settings: ExtensionSettings = {
        extensions: workspaceSettings.get('extensions') ?? [],
        recursive: workspaceSettings.get('recursive') ?? true
    };
    formatFiles(uri, settings, true);
});

async function formatFiles(uri: vscode.Uri, settings: ExtensionSettings, organizeImports: boolean = false) {
    for (const [name, type] of await vscode.workspace.fs.readDirectory(uri)) {

        const filePath = `${uri.fsPath}/${vscode.Uri.file(name).fsPath}`;
        if (type === vscode.FileType.Directory) {
            if (settings.recursive) {
                await formatFiles(vscode.Uri.file(filePath), settings, organizeImports);
            }
            continue;
        }

        if (settings.extensions.indexOf(name.split('.').pop() ?? '') < 0) {
            continue;
        }

        await vscode.workspace.openTextDocument(filePath).then(async (doc) => {
            await vscode.window.showTextDocument(doc, { preview: false, preserveFocus: false });
            await vscode.commands.executeCommand('editor.action.formatDocument');
            if (organizeImports) {
                await vscode.commands.executeCommand('editor.action.organizeImports');
            }
            return vscode.commands.executeCommand('workbench.action.closeActiveEditor');
        }).then(undefined, err => {
            console.error("File not opened properly " + err?.message);
        });
    }
}
