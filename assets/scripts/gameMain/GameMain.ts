import Global from "../FrameWork/Global";
import PopBase from "../FrameWork/PopBase";
import Holl from "./Holl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMain extends PopBase {
    @property(cc.Prefab)
    ballPre: cc.Prefab = null;

    @property(cc.Node)
    holeContent: cc.Node = null;

    @property(cc.Prefab)
    holePrefab: cc.Prefab = null;

    @property(cc.Node)
    arrow: cc.Node = null;

    @property(cc.Node)
    ballInitPos: cc.Node = null;

    @property(cc.Node)
    smallBall: cc.Node = null;

    @property(cc.Node)
    TopNode: cc.Node = null;

    @property(cc.Label)
    bet: cc.Label = null;

    @property(cc.Label)
    credit: cc.Label = null;

    @property(cc.Label)
    win: cc.Label = null;

    @property(cc.Label)
    bounsScore: cc.Label = null;

    @property(cc.Label)
    coinNums: cc.Label = null;

    ball: cc.Node = null;

    roundIndex = 0;

    initbet = 0;
    creditScore = 0;
    initCoinNums = 100;
    initBonus = 0;


    totalScore = 0;
    private playBallIndex = 0;
    private isFourBallAdd = false;
    private isFiveBallAdd = false;
    private isSixBallAdd = false;
    private isSevenBallAdd = false;

    private isBacketBallBallAdd = false;

    private countryScore = {
        country_1: { score: 2, isAdd: false },
        country_2: { score: 20, isAdd: false },
        country_3: { score: 4, isAdd: false },
        country_4: { score: 8, isAdd: false },
        country_5: { score: 10, isAdd: false },
        country_6: { score: 6, isAdd: false },
        country_7: { score: 15, isAdd: false },
        country_8: { score: 30, isAdd: false },
    }


    resetGame() {
        this.isFourBallAdd = false;
        this.isFiveBallAdd = false;
        this.isSixBallAdd = false;
        this.isSevenBallAdd = false;
        this.isBacketBallBallAdd = false;
        this.playBallIndex = 0;
        this.bet.string = "0";
        this.initbet = 0;
        Global.ballMgr.restData();

        this.holeContent.removeAllChildren();
        this.initMap();
        for (let index = 0; index < 16; index++) {
            this.TopNode.getChildByName((index + 1) + "").active = false;
        }

        for (let index = 0; index < this.TopNode.children.length; index++) {
            if (this.TopNode.children[index].name.split("_")[0] == "country") {
                this.TopNode.children[index].active = false;
            }
        }

        for (let index = 0; index < this.TopNode.children.length; index++) {
            if (this.TopNode.children[index].name.split("_")[0] == "ball") {
                this.TopNode.children[index].active = false;
            }
        }

        this.countryScore = {
            country_1: { score: 2, isAdd: false },
            country_2: { score: 20, isAdd: false },
            country_3: { score: 4, isAdd: false },
            country_4: { score: 8, isAdd: false },
            country_5: { score: 10, isAdd: false },
            country_6: { score: 6, isAdd: false },
            country_7: { score: 15, isAdd: false },
            country_8: { score: 30, isAdd: false },
        }
    }

    start() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEnd.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd.bind(this));
        Global.event.register("ball_in_hole", "ball_in_hole", this.ballInHole.bind(this));

        Global.event.register("ON_BTN_COIN", "ON_BTN_COIN", this.ON_BTN_COIN.bind(this));
        Global.event.register("ON_BTN_BET", "ON_BTN_BET", this.ON_BTN_BET.bind(this));

        Global.event.register("ON_BTN_START", "ON_BTN_START", this.initball.bind(this));
        Global.event.register("REST_GAME_DATA", "REST_GAME_DATA", this.resetGame.bind(this));
        this.coinNums.string = this.initCoinNums + "";
        this.initMap();
        this.initLabel();

    }

    initTopBouus(number: number) {
        this.initBonus += number
        this.bounsScore.string = this.initBonus + "";
    }

    ON_BTN_START() {

    }

    initLabel() {
        this.bet.string = this.initbet + "";
        this.credit.string = this.creditScore + "";
        this.win.string = "0";
    }

    ON_BTN_COIN() {
        if (this.initBonus >= 9000) {
            return;
        }
        this.initTopBouus(1000);
        this.updateCoins();

    }

    ON_BTN_BET() {
        if (this.initbet >= this.initBonus / 100) {
            return;
        }

        if (this.creditScore <= 0) {
            return;
        }

        this.bet.string = this.initbet + "";
        this.initbet += 10;

        if (this.initbet >= 90) {
            this.initball();
        }
        this.creditScore -= 10;
        this.credit.string = this.creditScore + "";

        this.bet.string = this.initbet + "";
    }

    updateCoins() {
        this.initCoinNums -= 5;
        this.coinNums.string = this.initCoinNums + "";
        this.creditScore += 10;
        this.credit.string = this.creditScore + "";
    }

    initball() {
        if (this.ball) {
            return;
        }
        this.ball = cc.instantiate(this.ballPre);
        this.ball.parent = this.smallBall;
        this.ball.setPosition(this.ballInitPos.getPosition());
    }

    ballInHole(node: cc.Node) {
        let type = node.getComponent(Holl).getType();
        this.TopNode.getChildByName(type + "").active = true;
        this.ball.removeComponent(cc.CircleCollider);
        this.ball.removeComponent(cc.PhysicsCircleCollider);
        this.ball.removeComponent(cc.RigidBody);
        this.ball = null;
        this.checkScoreBallIndex();
        this.checkScoreCountryType();

        this.checkBasketBall();

        this.playBallIndex++;
        if (this.playBallIndex >= 5) {
            Global.sceneMgr.openPop("prefab/Rssult", parseInt(this.credit.string) - (this.creditScore + this.initbet));
            return;
        }

        this.initball();
    }

    checkScoreCountryType() {
        let countrys = Global.ballMgr.getCountrys();
        for (const key in countrys) {
            for (let index = 0; index < countrys[key].length; index++) {
                if (index + 1 <= 4) {
                    this.TopNode.getChildByName(key + "_" + (index + 1)).active = true;
                }
                if (countrys[key].length == 4) {
                    if (!this.countryScore[key]) {
                        this.countryScore[key].isAdd = true
                        this.upDataWinScore(this.initbet * this.countryScore[key].score)
                    }
                }

            }
        }
        console.log("countrys=====>", countrys)
    }

    upDataWinScore(score: number) {
        console.log("score====>", score)
        this.totalScore += score;
        this.win.string = this.totalScore + "";
    }

    checkBasketBall() {
        let basketBall = Global.ballMgr.getBakketBalls();

        if (basketBall.length == 3) {
            let ballIndex = "";
            for (let index = 0; index < basketBall.length; index++) {
                if (basketBall[index].split("_")[1] != (index + 1) + "") {
                    ballIndex = "ball_" + (index + 1);
                    break;
                }
            }
            for (let index = 0; index < this.holeContent.children.length; index++) {
                if (this.holeContent.children[index].getComponent(Holl).getType() == ballIndex) {
                    this.holeContent.children[index].getComponent(Holl).setSignIsActive(true);
                    break;
                }
            }
        }
        if (!this.isBacketBallBallAdd) {
            if (basketBall.length == 4) {
                this.upDataWinScore(this.initBonus * (this.initbet / 100));
                this.isBacketBallBallAdd = true;
            }
        }

    }

    checkScoreBallIndex() {
        let numBall = Global.ballMgr.getBallArr();
        numBall.sort((a, b) => {
            return parseInt(a) - parseInt(b);
        });

        let start = 0;
        let newArr = [];

        numBall.forEach((item, index) => {
            if (parseInt(item) + 1 == parseInt(numBall[index + 1]) && parseInt(item) - 1 != parseInt(numBall[index - 1])) {
                start = parseInt(item)
            } else if (parseInt(item) - 1 == parseInt(numBall[index - 1]) && parseInt(item) + 1 != parseInt(numBall[index + 1])) {
                newArr.push(start + "-" + parseInt(item))
            } else if (parseInt(item) - 1 != parseInt(numBall[index - 1]) && parseInt(item) + 1 != parseInt(numBall[index + 1])) {
                newArr.push(item)
            }
        })

        console.log("numBall===>", numBall)
        console.log("newArr=====>", newArr)

        for (let index = 0; index < newArr.length; index++) {
            if (newArr[index].indexOf("-") >= 0) {
                let munArr = newArr[index].split("-");
                if (parseInt(munArr[1]) - parseInt(munArr[0]) >= 2) {
                    if (munArr[0] != "1") {
                        let frant = parseInt(munArr[0]) - 1;
                        for (let j = 0; j < this.holeContent.children.length; j++) {
                            if (this.holeContent.children[j].getComponent(Holl).getType() + "" == frant + "") {
                                this.holeContent.children[j].getComponent(Holl).setSignIsActive(true);
                            }
                        }
                    }

                    if (munArr[1] != "16") {
                        let next = parseInt(munArr[1]) + 1;
                        for (let j = 0; j < this.holeContent.children.length; j++) {
                            if (this.holeContent.children[j].getComponent(Holl).getType() + "" == next + "") {
                                this.holeContent.children[j].getComponent(Holl).setSignIsActive(true);
                            }
                        }
                    }
                }
            }

        }

        let ball = null;

        for (let index = 0; index < newArr.length; index++) {
            let firstIndex = newArr[index];
            if (newArr[index + 1]) {
                let second = newArr[index + 1];

                if (firstIndex.indexOf("-") >= 0 && second.indexOf("-") >= 0) {
                    let curStr = parseInt(firstIndex.split("-")[1]);
                    let nextStr = parseInt(second.split("-")[0]);
                    if (nextStr - curStr == 2) {
                        ball = (curStr + 1) + "";
                    }
                }

                if (firstIndex.indexOf("-") < 0 && second.indexOf("-") >= 0) {
                    let curStr = parseInt(firstIndex);
                    let nextStr = parseInt(second.split("-")[0]);
                    if (nextStr - curStr == 2) {
                        ball = (curStr + 1) + "";
                    }
                }

                if (firstIndex.indexOf("-") >= 0 && second.indexOf("-") < 0) {
                    let curStr = parseInt(firstIndex.split("-")[1]);
                    let nextStr = parseInt(second);
                    if (nextStr - curStr == 2) {
                        ball = (curStr + 1) + "";
                    }
                }
            }
        }

        if (ball) {
            for (let j = 0; j < this.holeContent.children.length; j++) {
                if (this.holeContent.children[j].getComponent(Holl).getType() + "" == ball) {
                    this.holeContent.children[j].getComponent(Holl).setSignIsActive(true);
                }
            }
        }


        for (let index = 0; index < newArr.length; index++) {
            if (newArr[index].indexOf("-") >= 0) {
                let munArr = newArr[index].split("-");
                if (!this.isFourBallAdd) {
                    if (parseInt(munArr[1]) - parseInt(munArr[0]) == 3) {//4连号
                        this.upDataWinScore(this.initbet);
                        this.isFourBallAdd = true;
                    }

                }

                if (!this.isFiveBallAdd) {
                    if (parseInt(munArr[1]) - parseInt(munArr[0]) == 4) {//5连号
                        this.upDataWinScore(this.initbet * 2);
                        this.isFiveBallAdd = true;
                    }
                }

                if (!this.isSixBallAdd) {
                    if (parseInt(munArr[1]) - parseInt(munArr[0]) == 5) {//6连号
                        this.upDataWinScore(this.initbet * 4);
                        this.isSixBallAdd = true;
                    }
                }

                if (!this.isSevenBallAdd) {
                    if (parseInt(munArr[1]) - parseInt(munArr[0]) == 7) {//7连号
                        this.upDataWinScore(this.initbet * 8);
                        this.isSevenBallAdd = true;
                    }
                }

            }
        }
    }



    touchEnd() {
        if (!this.ball) {
            return;
        }

        console.log("this.arrow===>", this.arrow.height)
        let ball = this.ball.getComponent(cc.RigidBody);
        let power = this.arrow.height * 2;
        ball.applyLinearImpulse(cc.v2(0, power / 1.9), this.node.convertToWorldSpaceAR(cc.v2(0, 0)), true);
        this.arrow.active = false;
        this.arrow.height = 0;
    }

    private touchStart() {
        if (!this.ball) {
            return;
        }
        this.arrow.active = true;
    }

    private touchMove(e: cc.Event.EventTouch) {
        if (!this.ball) {
            return;
        }
        let position = e.getLocation();
        let size = cc.winSize;
        this.arrow.height = -(position.y - size.height / 2) - 100 * 2 + 50;

        if (this.arrow.height < 100) {
            this.arrow.height = 100;
        }
        return;
    }

    initMap() {
        let width = this.holeContent.width;
        let point = width / 5;
        for (let index = 0; index < 20; index++) {
            let hole: cc.Node = cc.instantiate(this.holePrefab);
            if (index % 20 <= 5) {
                hole.setPosition(cc.v2(index * point, -10));
            } else if (index % 20 > 5 && index % 20 <= 10) {
                hole.setPosition(cc.v2(((index - 5) * point) - this.holeContent.width / 10, -100));
            } else if (index % 20 > 10 && index % 20 <= 14) {
                hole.setPosition(cc.v2(((index - 10) * point), -190));
            } else if (index % 20 > 14 && index % 20 <= 17) {
                hole.setPosition(cc.v2((((index - 14) * point) - this.holeContent.width / 10) + point, -280));
            } else if (index % 20 > 17 && index % 20 <= 19) {
                hole.setPosition(cc.v2((((index - 17) * point) + (this.holeContent.width / 10) * 2), -360));
            }
            hole.getComponent(Holl).init(index);
            hole.parent = this.holeContent;
        }
    }

    update(dt) {
        if (this.ball) {
            if (this.ball.y <= -1000) {
                this.ball.destroy();
                this.ball = null;
                this.playBallIndex++;
                if (this.playBallIndex >= 5) {
                    Global.sceneMgr.openPop("prefab/Rssult", parseInt(this.credit.string) - (this.creditScore + this.initbet));
                    return;
                }
                this.initball();
            }
        }
    }
}
