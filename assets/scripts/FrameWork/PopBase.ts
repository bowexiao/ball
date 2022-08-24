import Global from "./Global";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PopBase extends cc.Component {

    inputPopData: any = null;
    private _eventIds: string[] = [];//存储事件type
    private _eventid: any = null;

    setInputData(data: any) {
        this.inputPopData = data;
    }

    getInputData() {
        return this.inputPopData;
    }

    //只能放在start方法中 不能放在onLoad中
    public onRegisterEvent(type: string, callback: Function) {//注册事件
        Global.event.register(this._eventid, type, callback);
        this._eventIds.push(type);
    }

    private removeAllEvents() {//删除全部事件，onDestroy自动处理
        for (let index = 0; index < this._eventIds.length; index++) {
            let type = this._eventIds[index];
            Global.event.unregister(this._eventid, type);
        }
        this._eventIds = [];
    }

    public closePop() {
        this.inputPopData = null;
        this.removeAllEvents();
        this.node.destroy();
    }

    // update (dt) {}
}
