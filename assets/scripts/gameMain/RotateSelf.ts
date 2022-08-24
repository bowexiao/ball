const { ccclass, property } = cc._decorator;

@ccclass
export default class RotateSelf extends cc.Component {
    start() {
        cc.tween(this.node).by(2, { angle: -360 }).repeatForever().start();
    }
}
