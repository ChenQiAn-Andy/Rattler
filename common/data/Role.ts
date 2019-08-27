import GameOjbect from "./GameObject";
import Camera from "./Camera";

export default class Role extends GameOjbect {

    public model: Laya.Sprite3D;
    public camera: Camera;

    public destroy() {
        super.destroy();
        this.model = null;
    }

    public move(s) {
        this.model.transform.localPositionX += s;
        if (this.camera)
            this.camera.move(s);
    }
}