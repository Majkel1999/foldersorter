# Folder Formatter

Folder Formatter is a simple extension, which allows formatting all files inside specific folders. It adds two options to folder context menu.
Curentlly avaliable options:
* `Format files` - formats all files in specific folder, and optionally inside all nested folders. Only files with specified extensions will be opened.
* `Format files and organize imports` - additionally organizes imports on all files. 

## Extension Settings

This extension contributes the following settings:

* `folderformatter.extensions`: array of extensions, to decide which files are to be included. Format as ``["js", "py",...]``.
* `folderformatter.recursive`: decides whether to enter all folders recursively inside the current folder.

## Known Issues

Curently none

<!-- ## Release Notes

Users appreciate release notes as you update your extension. -->

### 0.0.1

Initial release of folder sorter with minimal functions.

