import { WebRouteComponentDto } from './src/app/shared/services/WebRouteComponentDto';
import { app, BrowserWindow, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';
var electron_1 = require("electron");
const ipc = electron_1.ipcMain;

export class DialogWindow {
    private mapWindow: Map<string, BrowserWindow> = new Map<string, BrowserWindow>();
    public Init(serve: any) {
        ipc.on('open-dialow-window', (event, message: WebRouteComponentDto) => {
            console.log('open-dialow-window:' + JSON.stringify(message));

            if (this.mapWindow.has(message.windowName)) {
                return;
            }
            const dialogWindow = new BrowserWindow({
                width: message.width,
                height: message.height,
                frame: false,
                show: false,
                x: message.positionX,
                resizable:false,
                y: message.positionY,
                webPreferences: {
                    nodeIntegration: true
                }
            });
            this.mapWindow.set(message.windowName, dialogWindow);
            dialogWindow.once('ready-to-show', () => {
                dialogWindow.show();
            });

            if (serve) {
                dialogWindow.loadURL('http://localhost:4200');

            } else {
                dialogWindow.loadURL(url.format({
                    pathname: path.join(__dirname, 'dist/index.html'),
                    protocol: 'file:',
                    slashes: true,

                }));
            }

            dialogWindow.on('closed', () => {
                console.log('dia:' + message);

               this.mapWindow.delete(message.windowName);

            });
            dialogWindow.on('show', () => {
                console.log('NavWebRouter:' + JSON.stringify(message));

                dialogWindow.webContents.send('NavWebRouter', message);

            });
        });
    }



}
