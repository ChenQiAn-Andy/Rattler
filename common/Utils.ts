export default class Utils {

    /**
     * 从3D场景获取对象
     * @param scene3d
     * @param path
     */
    public static getObj(scene3d, path): any {

        if (!path) {
            return null;
        }

        let node;
        let layers = path.split("/");

        for (let i = 0; i < layers.length; i++) {
            if (i == 0)
                node = scene3d.getChildByName(layers[i]);
            else {
                if (node)
                    node = node.getChildByName(layers[i]);
            }
        }

        return node;
    }
}