This plugin adds a folder icon to the top bar of SiYuan, and clicking on it can quickly open the following directories.

> [!WARNING]
> This plugin uses the Electron API to open directories, so it is only effective on the desktop.

### Workspace-related directories
- Current workspace directory: `{workspace}/`
- Data directory: `{workspace}/data/`
- Template directory: `{workspace}/data/template/`
- Theme directory: `{workspace}/conf/appearance/themes/`
- Automatic update directory: `{workspace}/temp/install/`

### Plugin-related directories

You can quickly open the installed plugins:
- Plugin installation directory: `{workspace}/data/plugins/{plugin-name}/`
- Plugin data directory: `{workspace}/data/store/petal/{plugin-name}/`