This plugin adds a folder icon to the top bar of SiYuan, and clicking on it can quickly open the following directories.

> [!WARNING]
> This plugin works on desktop only. On Windows, it uses the system `start` command to respect the default file manager; other platforms use the Electron API.

### Workspace-related directories
- Current workspace directory: `{workspace}/`
- Data directory: `{workspace}/data/`
- Template directory: `{workspace}/data/template/`
- Theme directory: `{workspace}/data/themes/` (falls back to `{workspace}/conf/appearance/themes/` on older versions)
- Automatic update directory: `{workspace}/temp/install/`

### Plugin-related directories

You can quickly open the installed plugins:
- Plugin installation directory: `{workspace}/data/plugins/{plugin-name}/`
- Plugin data directory: `{workspace}/data/store/petal/{plugin-name}/`