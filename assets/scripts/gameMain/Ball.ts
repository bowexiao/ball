import Global from "../FrameWork/Global";
import Holl from "./Holl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Ball extends cc.Component {

    onCollisionEnter(other, self) {
        console.log("self====>", self)
        let node: cc.Node = self.node.parent;
        node.parent = other.node;
        node.setPosition(cc.v2(0, 0));
        other.node.parent.getChildByName("light").active = true;
        other.node.removeComponent(cc.CircleCollider);
        if (node.getComponent(cc.PhysicsCollider)) {
            node.removeComponent(cc.PhysicsCollider)
        }

        if (node.getComponent(cc.RigidBody)) {
            node.removeComponent(cc.RigidBody);
        }

        let otherParentNode: cc.Node = other.node.parent;
        otherParentNode.getComponent(Holl).setSignIsActive(false);


        Global.ballMgr.pushBallInArr(otherParentNode.getComponent(Holl).getType() + "");
        Global.ballMgr.pushCountrys(otherParentNode.getComponent(Holl).getFlagType());
        Global.event.dispatch("ball_in_hole", otherParentNode);
    }

}
