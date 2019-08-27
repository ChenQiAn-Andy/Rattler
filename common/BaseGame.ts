import GameConfig from "../GameConfig";
import Http from "./net/Http";

/**小游戏基类
 * -- LAYA初始化 网络模块 帧循环 本地缓存*/
export default class BaseGame {

    public http: Http;

    protected config: any;
    protected elapse: number;

    private toggle: boolean;

    constructor(config, useLaya3D) {

        if (useLaya3D) {
            if (window["Laya3D"])
                window["Laya3D"].init(GameConfig.width, GameConfig.height);
        }
        else
            Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);

        Laya.stage.scaleMode = GameConfig.scaleMode;
        Laya.stage.screenMode = GameConfig.screenMode;
        Laya.stage.alignV = GameConfig.alignV;
        Laya.stage.alignH = GameConfig.alignH;

        Laya["Physics"] && Laya["Physics"].enable();

        if (GameConfig.debug) {

            if (GameConfig.stat)
                Laya.Stat.show();

            Laya["DebugPanel"] && Laya["DebugPanel"].enable();

            if (GameConfig.physicsDebug) {
                Laya["PhysicsDebugDraw"] && Laya["PhysicsDebugDraw"].enable();
                Laya.enableDebugPanel();
            }

            Laya.alertGlobalError = true;
        }
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

        Laya.loader.load(config, Laya.Handler.create(this, (data) => {
            if (data) {
                this.config = data;

                let host = data.host;
                let port = data.port;
                this.http = new Http(host, port);

                let atlas = data.atlas;
                Laya.loader.load(atlas, Laya.Handler.create(this, (atlas) => {
                    if (atlas){
                        this.parseConfig();
                        this.init();
                    }                        
                }));
            }
        }), null, Laya.Loader.JSON);
    }

    protected parseConfig(){
    }

    /**初始化 解析完成后调用 */
    protected init() {
    }

    protected reset() {
        this.pause();
        Laya.timer.clear(this, this.frameLoop);
        this.elapse = 0;
    }

    protected setupFrameLoop() {
        Laya.timer.frameLoop(1, this, this.frameLoop);
    }

    public pause() {
        this.toggle = false;
    }

    public resume() {
        this.toggle = true;
    }

    private frameLoop() {
        if (this.toggle == false)
            return;
        let dt = Laya.timer.delta;
        this.elapse += dt;
        this.loop(dt);
    }

    /**帧循环
     * @param dt ms
     */
    protected loop(dt) {
    }

    protected readCache(obj: string, key: string): any {
        let cache: any = Laya.LocalStorage.getJSON(obj);
        return cache != null ? cache[key] : null;
    }

    protected writeCache(obj: string, key: string, value: any) {
        let cache = Laya.LocalStorage.getJSON(obj);
        if (cache == null)
            cache = {};
        cache[key] = value;
        Laya.LocalStorage.setJSON(obj, cache);
    }
}