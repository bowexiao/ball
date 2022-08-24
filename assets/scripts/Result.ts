import Global from "./FrameWork/Global";
import PopBase from "./FrameWork/PopBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Result extends PopBase {

    @property(cc.Node)
    Node_1: cc.Node = null;

    @property(cc.Node)
    Node_2: cc.Node = null;

    @property(cc.Node)
    win: cc.Node = null;

    @property(cc.Node)
    agv: cc.Node = null;

    @property(cc.Node)
    lose: cc.Node = null;

    // onLoad () {}

    start() {
        this.schedule(() => {
            this.Node_1.active = !this.Node_1.active;
            this.Node_2.active = !this.Node_2.active;
        }, 0.3);
        console.log("this.getInputData()===>", this.getInputData())

        if (this.getInputData() > 0) {
            this.win.active = true;
        } else if (this.getInputData() == 0) {
            this.agv.active = true;
        } else if (this.getInputData() < 0) {
            this.lose.active = true;
        }

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch.bind(this))
    }

    onTouch() {
        Global.event.dispatch("REST_GAME_DATA");
        this.closePop();
    }

    // update (dt) {}
}
