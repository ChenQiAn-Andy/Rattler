import Utils from "./Utils";
import GameConfig from "../GameConfig";
import GameOjbect from "./data/GameObject";
import Level from "./data/Level";
import Role from "./data/Role";
import Errors from "./Errors";
import BaseGame from "./BaseGame";
import Camera from "./data/Camera";

/**3D小游戏基类 3D场景+2D模型+2DUI加载*/
export default class SimpleGame3D extends BaseGame {

    protected camera: Camera;

    private lsUrl: string;
    private lhUrl: string;

    constructor(config) {

        super(config, true);

        this.camera = new Camera();
    }

    protected parseConfig() {
        this.lsUrl = this.config.lsUrl;
        this.lhUrl = this.config.lhUrl;
    }

    /**
     * 
     * @param level 关卡资源
     * @param me 主角资源
     * @param ui ui场景资源
     * @param other 其他角色资源
     * @param onComplete 参数 [关卡场景，主角模型，ui场景类实例，其他角色模型]
     */
    protected setup(level: string, me: string, ui: string, other: string = null, onComplete: Function = null) {

        this.reset();

        Laya.Scene.open("Loading.scene");

        let levelUrl = this.lsUrl.replace(/\{res\}/g, level);
        let meUrl = this.lhUrl.replace(/\{res\}/g, me);
        let othUrl = other ? this.lhUrl.replace(/\{res\}/g, other) : null;

        Promise.all([this.lsPromis(levelUrl), this.lhPromis(meUrl), this.lhPromis(othUrl)]).then((bundle) => {

            if (Errors.check(bundle,levelUrl,meUrl))
                return;

            let scene = bundle[0] as Laya.Scene3D;
            Laya.stage.addChildAt(scene, 0);

            let meMod = bundle[1] as Laya.Sprite3D;
            scene.addChild(meMod);

            let othMod = bundle[2] as Laya.Sprite3D;
            if (othMod)
                scene.addChild(othMod);

            this.camera.model = Utils.getObj(scene, "Main Camera");

            Laya.Scene.open(ui, true, this, Laya.Handler.create(this, (uiScene) => {
                if (onComplete != null)
                    onComplete.call(this, scene, meMod, uiScene, othMod);
            }));

            super.setupFrameLoop();
        });
    }

    protected lsPromis(url): Promise<any> {
        return new Promise((resolve, reject) => {
            Laya.Scene3D.load(url, Laya.Handler.create(this, (ls) => {
                resolve(ls);
            }));
        });
    }

    protected lhPromis(url): Promise<any> {
        if (url == null)
            return new Promise((resolve, reject) => {
                resolve();
            });
        return new Promise((resolve, reject) => {
            Laya.Sprite3D.load(url, Laya.Handler.create(this, (lh) => {
                resolve(lh);
            }));
        });
    }
}