import Global from "../FrameWork/Global";
import PopBase from "../FrameWork/PopBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Loading extends PopBase {

    @property({
        type: cc.Node
    })
    loading_1: cc.Node = null;

    @property({
        type: cc.Node
    })
    loading_2: cc.Node = null;

    start() {
        this.schedule(() => {
            this.loading_1.active = !this.loading_1.active;
            this.loading_2.active = !this.loading_2.active;
        }, 0.3)

        cc.resources.loadDir("resources/prefab", (finish, total) => {
            console.log("finish====>", finish)
            console.log("total====>", total)
        }, (err, res) => {
            Global.sceneMgr.openPop("prefab/gameMain/GameMain");
        })
    }

    // update (dt) {}
}
