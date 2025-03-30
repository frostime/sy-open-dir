/*
 * Copyright (c) 2024 by frostime. All Rights Reserved.
 * @Author       : frostime
 * @Date         : 2024-11-01 22:44:03
 * @FilePath     : /src/index.ts
 * @LastEditTime : 2025-03-30 14:07:39
 * @Description  : 
 */
import {
    Menu,
    Plugin,
    IMenuItemOption,
    showMessage
} from "siyuan";

const electron = require('electron');
const fs = require('fs');
// const path = require('path');

const openPath = (path: string) => {
    electron?.shell?.openPath(path);
}

export let i18n: I18n;

export default class OpenDirPlugin extends Plugin {

    async onload() {
        if (!electron) {
            return;
        }

        i18n = this.i18n as I18n;

        const topBarElement = this.addTopBar({
            title: i18n.index_ts.opendir,
            icon: 'iconFolder',
            position: 'left',
            callback: () => {
                let rect = topBarElement.getBoundingClientRect();
                // 如果被隐藏，则使用更多按钮
                if (rect.width === 0) {
                    rect = document.querySelector("#barMore").getBoundingClientRect();
                }
                if (rect.width === 0) {
                    rect = document.querySelector("#barPlugins").getBoundingClientRect();
                }
                this.addMenu(rect);
            }
        })
    }

    private addMenu(rect?: DOMRect) {
        const menu = new Menu("OpenDir");

        this.addWorkspaceMenu(menu);
        menu.addSeparator();
        this.addPluginMenu(menu);

        menu.open({
            x: rect.right,
            y: rect.bottom,
            isLeft: false,
        });
    }

    private addWorkspaceMenu(menu: Menu) {
        const menus = [
            {
                label: i18n.index_ts.workspacedir,
                icon: 'iconFolder',
                click: () => {
                    const workspaceDir = window.siyuan.config.system.workspaceDir;
                    openPath(workspaceDir);
                }
            },
            {
                label: i18n.index_ts.datadirectory,
                icon: 'iconFolder',
                click: () => {
                    const dataDir = window.siyuan.config.system.dataDir;
                    openPath(dataDir);
                }
            },
            {
                label: i18n.index_ts.templatedir,
                icon: 'iconFolder',
                click: () => {
                    const dir = window.siyuan.config.system.dataDir + '/templates';
                    openPath(dir);
                }
            },
            {
                label: i18n.index_ts.asset_dir,
                icon: 'iconFolder',
                click: () => {
                    const dir = window.siyuan.config.system.dataDir + '/assets';
                    openPath(dir);
                }
            },
            {
                label: i18n.index_ts.public_directory,
                icon: 'iconFolder',
                click: () => {
                    const dir = window.siyuan.config.system.dataDir + '/public';
                    openPath(dir);
                }
            },
            {
                label: i18n.index_ts.themedir,
                icon: 'iconFolder',
                click: () => {
                    const dir = window.siyuan.config.system.workspaceDir + '/conf/appearance/themes';
                    openPath(dir);
                }
            },
            {
                label: i18n.index_ts.autoupdatedir,
                icon: 'iconFolder',
                click: () => {
                    const dir = window.siyuan.config.system.workspaceDir + '/temp/install';
                    openPath(dir);
                }
            }
        ];
        menus.forEach((item: IMenuItemOption) => {
            menu.addItem(item);
        });
    }

    private addPluginMenu(menu: Menu) {
        let submenu: IMenuItemOption[] = [];
        window.siyuan.ws.app.plugins.forEach((plugin) => {
            submenu.push({
                label: `${plugin.displayName} (${plugin.name})`,
                // icon: plugin.icon,
                submenu: [
                    {
                        label: i18n.index_ts.plugininstalldir,
                        icon: 'iconFolder',
                        click: () => {
                            const name = plugin.name;
                            const dir = window.siyuan.config.system.dataDir + '/plugins/' + name;
                            openPath(dir);
                        }
                    },
                    {
                        label: i18n.index_ts.plugindatadir,
                        icon: 'iconFile',
                        click: () => {
                            const name = plugin.name;
                            const dir = window.siyuan.config.system.dataDir + '/storage/petal/' + name;
                            // 检查 path 存在
                            if (fs.existsSync(dir)) {
                                openPath(dir);
                            } else {
                                showMessage(i18n.index_ts.noregisteredplugindir, 3000, 'error');
                            }
                        }
                    }
                ]
            });
        });
        menu.addItem({
            label: i18n.index_ts.plugindir,
            icon: 'iconFolder',
            submenu: submenu
        });
        menu.addSeparator();
        menu.addItem({
            label: i18n.index_ts.reload_siyuan,
            icon: 'iconRefresh',
            click: () => {
                window.location.reload();
            }
        });
    }
}
