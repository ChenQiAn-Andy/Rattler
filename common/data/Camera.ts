import Role from "./Role";

export default class Camera extends Role {
    public focus(target: Role) {
        target.camera = this;
    }
}