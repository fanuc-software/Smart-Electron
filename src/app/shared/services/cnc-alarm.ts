
export class ErrorMataModel {
    public handler: string;
    public time: string;
    public updateTime: string;
    public message: string;
    public parms: string;
    public method: string;
    public alarmModel: CNCAlarmModel = new CNCAlarmModel();
}

export class CNCAlarmModel {
    public handlerType: AlarmHandlerEnum;
    public style: HandlerTypeStyle;
    constructor() {
        this.handlerType = AlarmHandlerEnum.alarm;
        this.style = new HandlerTypeStyle('bg-red', 'bookmark');
    }
}


export class HandlerTypeStyle {

    constructor(public bgColor: string, public icon: string) {

    }
}
export enum AlarmHandlerEnum {
    alarm,
    cycleTime,
    feedrate,
    macro,
    notice,
    paraAssistGas,
    paraCommon,
    pmc,
    paraReferencePosition,
    position,
    programBlock,
    programName,
    programStr,
    workpartNum
}