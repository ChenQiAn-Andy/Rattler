import GameOjbect from "./GameObject";

export default class Level extends GameOjbect {

    public scene: Laya.Scene3D;

    public destroy() {
        super.destroy();
        if (this.scene) {
            this.scene.removeSelf();
            this.scene.destroy(true);
            this.scene = null;
        }
    }
}