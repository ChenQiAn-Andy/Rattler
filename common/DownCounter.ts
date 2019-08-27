/**倒计时组件 */
export default class DownCounter {

    /**总时间 秒 */
    public total: number;
    public running: boolean;

    private txt: Laya.Text;
    private time: number

    constructor() {
        let txt = new Laya.Text();
        txt.fontSize = 70;
        txt.color = "#FFFFFF";
        txt.bold = true;
        txt.stroke = 2;
        txt.align = "center";
        txt.width = Laya.stage.width;
        txt.height = 30;
        txt.x = 0;
        txt.y = (Laya.stage.height >> 1) - txt.height;
        this.txt = txt;
    }

    public start() {
        this.running = true;
        this.time = 0;
        this.txt.text = this.total + "";
        Laya.stage.addChildAt(this.txt, Laya.stage.numChildren - 1);
        Laya.timer.loop(1000, this, this.counting);
    }

    private counting() {
        this.time++;
        if (this.time >= this.total) {
            this.running = false;
            Laya.timer.clear(this, this.counting);
            Laya.stage.removeChild(this.txt);
            return;
        }
        this.txt.text = (this.total - this.time).toString();
    }
}