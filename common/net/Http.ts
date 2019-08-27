export default class Http {

    public host: string;
    public port: string;

    // private request:Laya.HttpRequest;

    constructor(host, port) {
        this.host = host;
        this.port = port;

        // this.request=new Laya.HttpRequest();
        // this.request.once(Laya.Event.COMPLETE, this, this.completeHandler);
        // this.request.once(Laya.Event.ERROR, this, this.errorHandler);
        // this.request.on(Laya.Event.PROGRESS, this, this.processHandler);    
    }
}