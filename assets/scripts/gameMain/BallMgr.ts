
export default class BallMgr {
    private inBallInHole: string[] = [];
    private basketBall: string[] = [];
    private countrys = {
        country_1: [],
        country_2: [],
        country_3: [],
        country_4: [],
        country_5: [],
        country_6: [],
        country_7: [],
        country_8: [],
    }


    restData() {
        this.inBallInHole = [];
        this.basketBall = [];
        this.countrys = {
            country_1: [],
            country_2: [],
            country_3: [],
            country_4: [],
            country_5: [],
            country_6: [],
            country_7: [],
            country_8: [],
        }
    }

    pushBallInArr(type: string) {
        if (type.indexOf("_") > 0 && type.split("_")[0] == "ball") {
            this.basketBall.push(type);
            return;
        }
        this.inBallInHole.push(type);
    }

    pushCountrys(data: string[]) {
        this.countrys[data[0]].push(1);
        this.countrys[data[1]].push(1);
    }

    getCountrys() {
        return this.countrys;
    }

    getBakketBalls() {
        this.basketBall.sort();
        return this.basketBall;
    }

    getBallArr() {
        return this.inBallInHole;
    }

    restBall() {
        this.inBallInHole = [];
    }

}
