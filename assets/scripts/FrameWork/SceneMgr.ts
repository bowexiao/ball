
import Global from "./Global";
import PopBase from "./PopBase";

export enum ModeuleIndex {
    Base = 1000,
    Pop = 2000,
    Tip = 3000
}

export enum ScenePath {
    LOGIN = "prefab/Login",
    MAIN = 'prefab/GameMain',
    Loading = 'prefab/Loading',
    Slot = 'prefab/slot/Slot',
    Daily = 'prefab/Daily/Daily',
}

export default class SceneMgr {

    private sceneNodeList: cc.Node[] = [];
    private curentPath: string = null;
    private parentNode: cc.Node = cc.director.getScene().getChildByName('Canvas');
    private loadingNode: cc.Node = null;
    private popNodeList: cc.Node[] = [];
    private sceneName = "";

    public setCurentScene(path: string, isNeedshowLoading: boolean = false, isNeedRealse: boolean = false) {
        if (this.curentPath == path) {
            console.error("The same Path!!!!!");
            return;
        }

        this.clearAllPops();

        if (isNeedshowLoading) {
            cc.resources.load('prefab/loading', cc.Prefab, (err, loadingPre: cc.Prefab) => {

                this.loadingNode = cc.instantiate(loadingPre);
                this.loadingNode.parent = this.parentNode;

                cc.resources.preload(path, (finish, total, items) => {

                }, (err, res) => {
                    if (err) {
                        console.error('path====ERR:', path);
                        return;
                    }
                    this.loadCurentScene(path, isNeedRealse);
                })
            })

        } else {
            this.loadCurentScene(path, isNeedRealse);
        }
    }

    private loadCurentScene(path: string, isNeedRealse: boolean, isScene: boolean = true, data: any = null) {
        cc.resources.load(path, cc.Prefab, (err, res: cc.Prefab) => {
            if (err) {
                console.error(path, " is not find!!!");
                return;
            }

            this.curentPath = path;


            if (this.loadingNode && path == 'prefab/Login') {
                this.loadingNode.getChildByName('ProgressBar').active = false;
            }

            let newScene: cc.Node = cc.instantiate(res);
            newScene.parent = this.parentNode;

            if (newScene.getComponent(PopBase)) {
                newScene.getComponent(PopBase).setInputData(data);
            }

            if (isScene) {
                if (this.sceneNodeList.length > 0) {
                    if (!isNeedRealse) {
                        this.sceneNodeList[0].destroy();
                        this.sceneNodeList.shift();
                    }
                }
                this.sceneNodeList.push(newScene);
                newScene.zIndex = ModeuleIndex.Base;
                this.sceneName = path;
            } else {
                this.popNodeList.push(newScene);
                newScene.zIndex = ModeuleIndex.Pop;
            }

            this.parentNode.stopAllActions();
        })
    }

    public getScenePath(): ScenePath {
        return this.sceneName as ScenePath;
    }

    public openPop(path: string, data: any = null) {
        this.loadCurentScene(path, false, false, data);
    }

    clearAllPops() {
        for (let index = 0; index < this.popNodeList.length; index++) {
            this.popNodeList[index].destroy();
        }
        this.popNodeList = [];
    }

    getPops(): cc.Node[] {
        return this.popNodeList;
    }
}
