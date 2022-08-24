const { ccclass, property } = cc._decorator;

@ccclass
export default class Holl extends cc.Component {

    @property(cc.Label)
    holeIndex: cc.Label = null;

    @property(cc.Node)
    ball: cc.Node = null;

    @property(cc.Node)
    sign: cc.Node = null;

    @property(cc.Node)
    country_1: cc.Node = null;

    @property(cc.Node)
    country_2: cc.Node = null;

    @property(cc.SpriteFrame)
    countrySprites: cc.SpriteFrame[] = [];

    index = null;
    isBall = false;

    countryFlag = [
        [1, 2],//1
        [3, 4],//2
        [1, 5],//3
        [6, 4],//4
        [7, 3],//5
        [3, 2],//6
        [3, 8],//7
        [3, 7],//8
        [1, 5],//9
        [6, 7],//10
        [1, 8],//11
        [4, 5],//12
        [1, 7],//13
        [1, 6],//14
        [3, 5],//15
        [6, 8],//16
        [1, 3],//17
        [6, 7],//18
        [4, 8],//19
        [7, 2],//20
        [5, 2],//21
    ]

    flagType_1 = null;
    flagType_2 = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    init(index) {

        let flag = this.countryFlag[index];

        this.country_1.getComponent(cc.Sprite).spriteFrame = this.countrySprites[flag[0] - 1];
        this.country_2.getComponent(cc.Sprite).spriteFrame = this.countrySprites[flag[1] - 1];

        this.flagType_1 = "country_" + flag[0];
        this.flagType_2 = "country_" + flag[1];

        this.holeIndex.string = (index + 1) + "";
        if ((index + 1) > 11 && (index + 1) < 16) {
            this.holeIndex.node.active = false;
            this.ball.active = true;
            this.index = "ball_" + (index - 10);
            console.log("this.index===>", this.index)
            this.isBall = true;
        } else {
            this.holeIndex.node.active = true;
            this.ball.active = false;
            this.isBall = false;
            this.index = index + 1;
        }

        if (index + 1 >= 16) {
            this.holeIndex.string = (index - 3) + "";
            this.isBall = false;
            this.index = index - 3;
        }
    }

    getFlagType() {
        return [this.flagType_1, this.flagType_2];
    }

    setSignIsActive(isActive: boolean) {
        this.sign.active = isActive;
    }

    getType() {
        return this.index;
    }

    // update (dt) {}
}
