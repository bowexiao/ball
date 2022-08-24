// import TaskMgr from "../GameMain/Task/TaskMgr";
import BallMgr from "../gameMain/BallMgr";
import { AudioMgr } from "./AudioMgr";
import { EventMgr } from "./EventMgr";
import SceneMgr, { ModeuleIndex } from "./SceneMgr";
import UI from "./UI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Global extends cc.Component {
    public static audio: AudioMgr = null;
    public static event: EventMgr = null;
    public static sceneMgr: SceneMgr = null;
    public static progressNode: cc.Node = null;
    public static ballMgr: BallMgr = null;
    public static ui: UI = null;


    @property({
        type: cc.Node,
    })
    lockUI: cc.Node = null;

    onLoad(): void {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        Global.audio = new AudioMgr();
        Global.audio.init();
        Global.event = new EventMgr();
        Global.ballMgr = new BallMgr();


        Global.sceneMgr = new SceneMgr();
        Global.ui = new UI();
    }

    start(): void {
        cc.game.addPersistRootNode(this.node);
    }

    isShowLockUI(isShow: boolean) {
        this.lockUI.active = isShow;
    }
}
