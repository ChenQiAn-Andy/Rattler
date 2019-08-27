export default class GameOjbect {

    protected config: any;

    public setConfig(config) {
        this.config = config;
    }

    /**帧循环 */
    public loop(dt) {
    }

    public destroy() {
        this.config = null;
    }
}