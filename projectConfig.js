/**
 * Created by mole【731913218@qq.com】 on 2018/5/13 上午11:27.
 * @Name: projectConfig
 * @description:
 */

(function () {
    'use strict';
    module.exports = {
        projectName: 'curriculum',
        admin: {
            css: {
                compress: true,
                version: true
            },
            js: {
                compress: true,
                version: true
            },
            img: {
                compress: true,
                version: true
            },
            html: {
                compress: false,
                compressCss: true,
                compressJs: true
            },
            pluginsPath: 'plugins'
        },
        pc: {
            css: {
                compress: true,
                version: true
            },
            js: {
                compress: true,
                version: true
            },
            img: {
                compress: true,
                version: true
            },
            html: {
                compress: false,
                compressCss: true,
                compressJs: true
            },
            pluginsPath: 'plugins'
        },
        m: {
            css: {
                compress: true,
                version: true
            },
            js: {
                compress: true,
                version: true
            },
            img: {
                compress: true,
                version: true
            },
            html: {
                compress: false,
                compressCss: true,
                compressJs: true
            },
            pluginsPath: 'plugins'
        }
    };
}());