import Global from "../FrameWork/Global";
import PopBase from "../FrameWork/PopBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Login extends PopBase {


    // onLoad () {}

    start() {

    }

    onBtnLogin() {
        Global.sceneMgr.openPop("prefab/Loading");
    }

    // update (dt) {}
}
