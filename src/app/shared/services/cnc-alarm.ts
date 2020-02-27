
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
        this.handlerType = AlarmHandlerEnum.Alarm;
        this.style = new HandlerTypeStyle('bg-red', 'bookmark');
    }
}


export class HandlerTypeStyle {

    constructor(public bgColor: string, public icon: string) {

    }
}
export enum AlarmHandlerEnum {
    Connect,
    Alarm,
    CycleTime,
    Feedrate,
    Macro,
    Notice,
    ParaAssistGas,
    ParaCommon,
    Pmc,
    ParaReferencePosition,
    Position,
    ProgramBlock,
    ProgramName,
    ProgramStr,
    WorkpartNum
}