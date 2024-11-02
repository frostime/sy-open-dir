/*
 * Copyright (c) 2024 by frostime. All Rights Reserved.
 * @Author       : frostime
 * @Date         : 2024-11-01 22:44:03
 * @FilePath     : /src/index.ts
 * @LastEditTime : 2024-11-02 14:57:42
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

export let i18n;

export default class OpenDirPlugin extends Plugin {

    async onload() {
        if (!electron) {
            return;
        }

        i18n = this.i18n;

        const topBarElement = this.addTopBar({
            title: ((`打开目录`)),
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
                label: ((`工作空间目录`)),
                icon: 'iconFolder',
                click: () => {
                    const workspaceDir = window.siyuan.config.system.workspaceDir;
                    openPath(workspaceDir);
                }
            },
            {
                label: ((`模板目录`)),
                icon: 'iconFolder',
                click: () => {
                    const dir = window.siyuan.config.system.dataDir + '/templates';
                    openPath(dir);
                }
            },
            {
                label: ((`主题目录`)),
                icon: 'iconFolder',
                click: () => {
                    const dir = window.siyuan.config.system.workspaceDir + '/conf/appearance/themes';
                    openPath(dir);
                }
            },
            {
                label: ((`自动更新安装包目录`)),
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
                label: plugin.displayName,
                // icon: plugin.icon,
                submenu: [
                    {
                        label: ((`插件安装目录`)),
                        icon: 'iconFolder',
                        click: () => {
                            const name = plugin.name;
                            const dir = window.siyuan.config.system.dataDir + '/plugins/' + name;
                            openPath(dir);
                        }
                    },
                    {
                        label: ((`插件数据目录`)),
                        icon: 'iconFile',
                        click: () => {
                            const name = plugin.name;
                            const dir = window.siyuan.config.system.dataDir + '/storage/petal/' + name;
                            // 检查 path 存在
                            if (fs.existsSync(dir)) {
                                openPath(dir);
                            } else {
                                showMessage(((`该插件没有在本地注册数据目录`)), 3000, 'error');
                            }
                        }
                    }
                ]
            });
        });
        menu.addItem({
            label: ((`插件目录`)),
            icon: 'iconFolder',
            submenu: submenu
        });
    }
}
