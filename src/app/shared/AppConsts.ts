export class AppConsts {

    static remoteServiceBaseUrl: string = "http://123.207.159.105:21021";
    static appBaseUrl: string = "http://localhost:4200";
    static appBaseHref: string; // returns angular's base-href parameter value if used during the publish

    static abpEvent = {
        RefreshUrlEvent: "RefreshUrlEvent"
    }
}
