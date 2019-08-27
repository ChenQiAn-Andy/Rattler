export default class Errors {

    public static E1: String = "[E1]加载出错";
    public static E2: String = "[E2]关卡文件解析错误";
    public static E3: String = "[E3]主角文件解析错误";

    static check(bundle,ls,lh): boolean {

        if (bundle == null || bundle.length != 3) {
            console.error(this.E1);
            return true;
        }

        if (bundle[0] == null) {
            console.error(this.E2+"("+ls+")");
            return true;
        }

        if (bundle[1] == null) {
            console.error(this.E3+"("+lh+")");
            return true;
        }

        return false;
    }
}