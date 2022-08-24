import Global from "../FrameWork/Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BtnMgr extends cc.Component {

    onbtnClick(e) {
        let name = e.target.name;

        if (name == "coin") {//投币
            Global.event.dispatch("ON_BTN_COIN");
        } else if (name == "bet") {
            Global.event.dispatch("ON_BTN_BET");
        } else if (name == "start") {
            Global.event.dispatch("ON_BTN_START");
        } else if (name == "result") {

        }
    }

}
