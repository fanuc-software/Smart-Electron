export class AppConsts {

    static remoteServiceBaseUrl: string = "http://192.168.21.175:21021";
    //static remoteServiceBaseUrl: string = "http://localhost:21021";
    // static remoteServiceBaseUrl: string = "http://localhost/mmk";

    static appBaseUrl: string = "http://localhost:4200";
    static appBaseHref: string; // returns angular's base-href parameter value if used during the publish

    static abpEvent = {
        RefreshUrlEvent: "RefreshUrlEvent",
        WebClientConnectedEvent:"WebClientConnectedEvent",
        HomePageOnLoadEvent:'HomePageOnLoadEvent',
        HomePageOnLeaveEvent:'HomePageOnLeaveEvent',
        GetCNCDataEvent:'GetCNCDataEvent'

    }
}
