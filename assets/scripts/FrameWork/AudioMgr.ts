export class AudioMgr {
    private bgmVolume: number = 1.0;
    private soundVolume: number = 1.0;
    private bgmAudioID: number = -1;
    private audioUrl: string = '';
    private effectIndex: number = 0;
    private effectNameArr: string[];
    private effectListCb: Function;
    private clipUrlList;
    constructor() {
        this.clipUrlList = {};
    }

    init() {
        var bgm: string = cc.sys.localStorage.getItem("bgmVolume");
        var sound: string = cc.sys.localStorage.getItem("soundVolume");

        if (!bgm) {
            this.bgmVolume = 1
        } else {
            this.bgmVolume = parseInt(bgm)
        }

        if (!sound) {
            this.soundVolume = 1
        } else {
            this.soundVolume = parseInt(sound)
        }
    }

    playBGM(url: string) {

        if (url == this.audioUrl && this.bgmAudioID != -1) {
            return;
        }
        this.audioUrl = url;
        cc.log(this.audioUrl);
        if (this.bgmAudioID >= 0) {
            cc.audioEngine.stop(this.bgmAudioID);
        }
        if (this.bgmVolume > 0) {
            cc.resources.load(this.audioUrl, cc.AudioClip, (err, clip: cc.AudioClip) => {
                this.bgmAudioID = cc.audioEngine.play(clip, true, this.bgmVolume);
            });
        }
    }

    isPlayBGM() {
        if (this.bgmAudioID != -1) {
            return true;
        }
        return false;
    }

    stopBGM() {
        this.audioUrl = '';
        if (this.bgmAudioID >= 0) {
            cc.audioEngine.stop(this.bgmAudioID);
            this.bgmAudioID = -1;
        }
    }

    // nameArr:带路径的字符串数组
    playEffectList(nameArr: string[], callback?: Function) {
        this.effectNameArr = nameArr;
        if (this.effectIndex === 0) {
            this.effectListCb = callback;
        }
        if (this.effectIndex > this.effectNameArr.length - 1) {
            this.effectIndex = 0;
            this.effectListCb && (this.effectListCb());
            return;
        }
        let effectUrl = this.effectNameArr[this.effectIndex];
        cc.resources.load(effectUrl, cc.AudioClip, (err, clip: cc.AudioClip) => {
            if (err) {
                cc.error(err);
                this.effectListCb && this.effectListCb();
                return;
            }
            let effectId = cc.audioEngine.playEffect(clip, false);
            this.retainAudio(clip.nativeUrl, effectUrl);

            cc.audioEngine.setFinishCallback(effectId, () => {
                this.effectIndex++;
                this.playEffectList(this.effectNameArr);
            });
        });
    }

    playEffect(url: string, callback: Function = null) {
        cc.resources.load(url, cc.AudioClip, (err, clip: cc.AudioClip) => {
            if (err) {
                cc.error(err);
                callback && callback();
                return;
            }
            var sound: string = cc.sys.localStorage.getItem("soundVolume")
            if (!sound) {
                sound = "1";
            }
            cc.audioEngine.setEffectsVolume(parseInt(sound));
            let effectId = cc.audioEngine.playEffect(clip, false);
            cc.audioEngine.setFinishCallback(effectId, () => {
                callback && callback();
            });
        });
    }

    stopEffect() {
        cc.audioEngine.stopAllEffects();
    }

    stopEffectAndRelease() {
        this.effectListCb = null;
        this.effectNameArr = [];
        cc.audioEngine.stopAllEffects();
    }

    setSoundVolume(value: number) {
        if (this.soundVolume != value) {
            cc.sys.localStorage.setItem("soundVolume", value);
            this.soundVolume = value;
        }
    }

    setBGMVolume(value: number) {
        var self = this;
        if (this.bgmAudioID >= 0) {
            if (value > 0) {
                cc.audioEngine.stop(this.bgmAudioID);

                if (this.audioUrl != '') {
                    cc.resources.load(this.audioUrl, cc.AudioClip, function (err, clip: cc.AudioClip) {
                        self.bgmAudioID = cc.audioEngine.play(clip, true, self.bgmVolume);
                    });
                }
            }
            else {
                cc.audioEngine.stop(this.bgmAudioID);
            }
        }
        else {
            if (this.audioUrl != '') {
                cc.resources.load(this.audioUrl, cc.AudioClip, function (err, clip: cc.AudioClip) {
                    self.bgmAudioID = cc.audioEngine.play(clip, true, self.bgmVolume);
                });
            }
        }

        if (this.bgmVolume != value) {
            cc.sys.localStorage.setItem("bgmVolume", value);
            this.bgmVolume = value;
            cc.audioEngine.setVolume(this.bgmAudioID, value);
        }
    }

    pauseAll() {
        cc.audioEngine.pauseAll();
    }

    resumeAll() {
        cc.audioEngine.resumeAll();
    }

    retainAudio(nativeUrl: string, path?: string) {
        if (!this.clipUrlList[nativeUrl]) {
            this.clipUrlList[nativeUrl] = {}
        }
        this.clipUrlList[nativeUrl].nativeUrl = nativeUrl;
        this.clipUrlList[nativeUrl].path = path;
        if (!this.clipUrlList[nativeUrl].count) {
            this.clipUrlList[nativeUrl].count = 0
        }
        this.clipUrlList[nativeUrl].count = this.clipUrlList[nativeUrl].count + 1;
    }

    playSoundClick() {
        this.playEffect("sound/click");
    }

    playSoundcoin() {
        this.playEffect("sound/coin");
    }

    playSoundfoodCollect() {
        this.playEffect("sound/foodCollect");
    }

    playSoundfoodgift() {
        this.playEffect("sound/gift");
    }

    playSoundgrow() {
        this.playEffect("sound/grow");
    }

    playSoundlevelup() {
        this.playEffect("sound/levelup");
    }

    playSoundlose() {
        this.playEffect("sound/lose");
    }

    playSoundmoney() {
        this.playEffect("sound/money");
    }

    playSoundrain() {
        this.playEffect("sound/rain");
    }

    playSoundresult() {
        this.playEffect("sound/result");
    }

    playSoundband() {
        this.playEffect("sound/band");
    }

    playSoundcar() {
        this.playEffect("sound/car");
    }
}
