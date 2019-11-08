"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_2 = require("electron");
var path = require("path");
var url = require("url");
var electron_1 = require("electron");
var ipc = electron_1.ipcMain;
var DialogWindow = /** @class */ (function () {
    function DialogWindow() {
        this.mapWindow = new Map();
    }
    DialogWindow.prototype.Init = function (serve) {
        var _this = this;
        ipc.on('open-dialow-window', function (event, message) {
            console.log('open-dialow-window:' + JSON.stringify(message));
            if (_this.mapWindow.has(message.windowName)) {
                return;
            }
            var dialogWindow = null;
            if (serve) {
                dialogWindow = new electron_2.BrowserWindow({
                    width: message.width,
                    height: message.height,
                    frame: true,
                    show: false,
                    x: message.positionX,
                    resizable: true,
                    y: message.positionY,
                    webPreferences: {
                        nodeIntegration: true
                    }
                });
            }
            else {
                dialogWindow = new electron_2.BrowserWindow({
                    width: message.width,
                    height: message.height,
                    frame: false,
                    show: false,
                    x: message.positionX,
                    resizable: false,
                    y: message.positionY,
                    webPreferences: {
                        nodeIntegration: true
                    }
                });
            }
            _this.mapWindow.set(message.windowName, dialogWindow);
            dialogWindow.once('ready-to-show', function () {
                dialogWindow.show();
            });
            if (serve) {
                dialogWindow.loadURL('http://localhost:4200');
            }
            else {
                dialogWindow.loadURL(url.format({
                    pathname: path.join(__dirname, 'dist/index.html'),
                    protocol: 'file:',
                    slashes: true,
                }));
            }
            dialogWindow.on('closed', function () {
                console.log('dia:' + message);
                _this.mapWindow.delete(message.windowName);
            });
            dialogWindow.on('show', function () {
                console.log('NavWebRouter:' + JSON.stringify(message));
                dialogWindow.webContents.send('NavWebRouter', message);
            });
        });
    };
    return DialogWindow;
}());
exports.DialogWindow = DialogWindow;
//# sourceMappingURL=main-dialog.js.map