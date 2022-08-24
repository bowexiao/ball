const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

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
    }
}
