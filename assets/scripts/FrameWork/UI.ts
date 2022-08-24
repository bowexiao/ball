import Global from "./Global";

export default class UI {

    public showLockUI(isShow: boolean) {
        let global: cc.Node = cc.director.getScene().getChildByName('Global');
        global.getComponent(Global).isShowLockUI(isShow);
    }
}
