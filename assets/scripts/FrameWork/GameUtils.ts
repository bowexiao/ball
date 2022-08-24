import Global from "../FrameWork/Global";
import { AdsScene } from "../FrameWork/SdkMgr";

export enum GroupType {
    Guide = "Guide",
    default = "default",
    Float = "Float",
    Wall = "Wall"
}


export default class GameUtils {
    public static playSpineByNode(node: cc.Node, spineName: string, isLoop: boolean, isSetupPose?: boolean, cb?: Function, listenerCall: Function = null): any {
        try {
            if (listenerCall) {
                let spine = node.getComponent(sp.Skeleton)
                spine.setEventListener((enter, event) => {
                    listenerCall(event);
                });
            }
            return this.playSpineAnim(this.getSpineByNode(node), 0, spineName, isLoop, isSetupPose, cb)
        } catch (error) {
            console.error("playSpineByNode---->", error)
            return null;
        }
    }

    public static setSpineEventListener(node, listenerCall: Function) {
        let spine = node.getComponent(sp.Skeleton)
        spine.setEventListener((enter, event) => {
            listenerCall(event);
        });
    }

    public static playSpineAnim(spine: sp.Skeleton, trackIndex: number, spineName: string | string, isLoop: boolean, isSetupPose?: boolean, cb?: Function): any {
        try {
            if (spine) {
                if (isSetupPose && isSetupPose == true) {
                    spine.setToSetupPose()
                }
                this.addAnimationEventListener(spine, cb)
                return this.setSpineAnim(spine, trackIndex, spineName, isLoop)
            }
        } catch (error) {
            console.error("playSpineAnim---->", error)
            return null;
        }
    }

    public static setSpineAnim(spine: sp.Skeleton, trackIndex: number, animName: string, isLoop: boolean): any {
        try {
            if (spine) {
                return spine.setAnimation(trackIndex, animName, isLoop)
            }
            return null;
        } catch (error) {
            console.error("setSpineAnim---->", error)
            return null;
        }
    }

    public static getSpineByNode(node: cc.Node): sp.Skeleton {
        try {
            let spine = node.getComponent(sp.Skeleton)
            return spine
        } catch (error) {

        }
    }

    public static removeAnimationEventListener(node: cc.Node) {
        try {
            let spine = node.getComponent(sp.Skeleton)
            if (spine == null || spine == undefined) { return }
            spine.setEventListener(() => { })
        } catch (error) {

        }
    }

    public static addAnimationEventListener(spine: sp.Skeleton, cb?: Function) {
        try {
            if (spine == null || spine == undefined) { return }
            spine.setCompleteListener((trackEntry, loopCount: number) => {
                if (cb) {
                    cb()
                }
            })
        } catch (error) {

        }
    }

    //动画暂停
    public static spinePauseOrResume(node: cc.Node, isResume: boolean) {
        let children = node.children;
        this.findSpineComponent(node, isResume);
        children.forEach((child) => {
            this.spinePauseOrResume(child, isResume);
        });
    }

    public static findSpineComponent(node, isResume) {
        let spine: sp.Skeleton = node.getComponent(sp.Skeleton);
        if (!spine) {
            return;
        }
        if (isResume) {
            if (spine.skeletonData != null) {
                spine.paused = isResume;
                spine.timeScale = 0;
            }
            return;
        } else {
            if (spine.skeletonData != null) {
                spine.paused = isResume;
                spine.timeScale = 1;
            }
            return;
        }
    }

    // public static showGuide(targetNode: cc.Node, position: cc.Vec2, CallFunc: Function) {
    //     targetNode.group = GroupType.Guide;
    //     let guideInfo: GuideInfo = {
    //         node: targetNode,
    //         callfunc: CallFunc,
    //         pos: position
    //     }
    //     Global.sceneMgr.openPop("prefab/Guide", guideInfo)
    // }

    public static getRandomInt(min, max): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static addNumToTarget(oldNum: number, newNum: number, label: cc.Label, callfunc: Function) {
        // setTimeout(() => {
        //     if (newNum - oldNum >= 100) {
        //         oldNum += 100
        //     } else if (newNum - oldNum < 100) {
        //         oldNum += 1
        //     }

        //     if (oldNum >= 100000) {
        //         oldNum = oldNum / 1000
        //         label.string = oldNum + "K";
        //     } else {
        //         label.string = oldNum + "";
        //     }

        //     if (oldNum < newNum) {
        //         this.addNumToTarget(oldNum, newNum, label, callfunc);
        //     } else {
        //         callfunc && callfunc();
        //     }
        // }, 0.1);
        cc.tween(label.node).to(0.2, { scale: 1.2 }).call(() => {
            label.string = this.formatCoinNum(newNum) + "";
        }).to(0.2, { scale: 1 }).call(() => {
            callfunc && callfunc();
        }).start();
    }

    public static formatCoinNum(num: number): string {
        let newNum = "";
        if (num >= 100000) {
            newNum = Math.floor((num / 1000)) + "K";
        } else {
            newNum = num + "";
        }

        return newNum;
    }

    public static setButtonGray(node: cc.Node, isCanClick: boolean) {
        let targetSp: cc.Sprite = null;
        let label: cc.Label = null;
        let str = isCanClick ? cc.Material.BUILTIN_NAME.SPRITE : cc.Material.BUILTIN_NAME.GRAY_SPRITE;

        let material = cc.Material.createWithBuiltin(str + "", 0);
        targetSp = node.getComponent(cc.Sprite);
        targetSp && targetSp.setMaterial(0, material);

        label = node.getComponent(cc.Label);
        label && label.setMaterial(0, material);
        if (node.getComponent(cc.Button)) {
            node.getComponent(cc.Button).enabled = isCanClick;
        }

        node.children.forEach(subNode => {
            this.setButtonGray(subNode, isCanClick);
        })
    }

}
