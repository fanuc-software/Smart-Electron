export class CncEventData {
    Para: any;
    constructor(public Kind: CncEventEnum) {

    }
}

export enum CncEventEnum {
    ReadMacro,
    ReadPmc,
    Position,
    LampStatus,
    AlarmMessage,
    NoticeMessage,
    ProgramInfo,
    ModelInfo,
    CycleTime,
    WorkpartNum,
}
export enum DataTypeEnum {
    Boolean,
    Byte,
    Int16,
    Int32
}
export class DecompReadPmcItemModel {


    constructor(public Id: string, public AdrType: number, public DataType: DataTypeEnum, public RelStartAdr: number, public Bit: number) {

    }
}
export class ReadPmcTypeModel {

    constructor(public AdrType: number, public StartNum: number, public DwordQuantity: number) { }

}

export class readPmcResultItemModel {
    Id: string;
    Value: string;
}
export class ReadPmcModel {
    Readers: ReadPmcTypeModel[] = [];
    Decompilers: DecompReadPmcItemModel[] = [];
}