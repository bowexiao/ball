import Global from "./FrameWork/Global";
import PopBase from "./FrameWork/PopBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameScene extends PopBase {
    start() {
        Global.sceneMgr.openPop("prefab/Login/Login");
        // Global.sceneMgr.openPop("prefab/Rssult");
    }

    // update (dt) {}
}
