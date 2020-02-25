


export class CNCAlarmModel {
    public Id: number;
    public text: string;
    public createTime: string;
    public updateTime: string;
    public handlerType: AlarmHandlerEnum;
    public style: HandlerTypeStyle;
}

export class HandlerTypeStyle {
    constructor(public bgColor: string, public icon: string) {

    }
}
export enum AlarmHandlerEnum {
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