window.__require=function t(e,o,n){function i(c,l){if(!o[c]){if(!e[c]){var a=c.split("/");if(a=a[a.length-1],!e[a]){var s="function"==typeof __require&&__require;if(!l&&s)return s(a,!0);if(r)return r(a,!0);throw new Error("Cannot find module '"+c+"'")}c=a}var p=o[c]={exports:{}};e[c][0].call(p.exports,function(t){return i(e[c][1][t]||t)},p,p.exports,t,e,o,n)}return o[c].exports}for(var r="function"==typeof __require&&__require,c=0;c<n.length;c++)i(n[c]);return i}({AudioMgr:[function(t,e,o){"use strict";cc._RF.push(e,"1ea44XAcixBPqHIfZOibWe1","AudioMgr"),Object.defineProperty(o,"__esModule",{value:!0}),o.AudioMgr=void 0;var n=function(){function t(){this.bgmVolume=1,this.soundVolume=1,this.bgmAudioID=-1,this.audioUrl="",this.effectIndex=0,this.clipUrlList={}}return t.prototype.init=function(){var t=cc.sys.localStorage.getItem("bgmVolume"),e=cc.sys.localStorage.getItem("soundVolume");this.bgmVolume=t?parseInt(t):1,this.soundVolume=e?parseInt(e):1},t.prototype.playBGM=function(t){var e=this;t==this.audioUrl&&-1!=this.bgmAudioID||(this.audioUrl=t,cc.log(this.audioUrl),this.bgmAudioID>=0&&cc.audioEngine.stop(this.bgmAudioID),this.bgmVolume>0&&cc.resources.load(this.audioUrl,cc.AudioClip,function(t,o){e.bgmAudioID=cc.audioEngine.play(o,!0,e.bgmVolume)}))},t.prototype.isPlayBGM=function(){return-1!=this.bgmAudioID},t.prototype.stopBGM=function(){this.audioUrl="",this.bgmAudioID>=0&&(cc.audioEngine.stop(this.bgmAudioID),this.bgmAudioID=-1)},t.prototype.playEffectList=function(t,e){var o=this;if(this.effectNameArr=t,0===this.effectIndex&&(this.effectListCb=e),this.effectIndex>this.effectNameArr.length-1)return this.effectIndex=0,void(this.effectListCb&&this.effectListCb());var n=this.effectNameArr[this.effectIndex];cc.resources.load(n,cc.AudioClip,function(t,e){if(t)return cc.error(t),void(o.effectListCb&&o.effectListCb());var i=cc.audioEngine.playEffect(e,!1);o.retainAudio(e.nativeUrl,n),cc.audioEngine.setFinishCallback(i,function(){o.effectIndex++,o.playEffectList(o.effectNameArr)})})},t.prototype.playEffect=function(t,e){void 0===e&&(e=null),cc.resources.load(t,cc.AudioClip,function(t,o){if(t)return cc.error(t),void(e&&e());var n=cc.sys.localStorage.getItem("soundVolume");n||(n="1"),cc.audioEngine.setEffectsVolume(parseInt(n));var i=cc.audioEngine.playEffect(o,!1);cc.audioEngine.setFinishCallback(i,function(){e&&e()})})},t.prototype.stopEffect=function(){cc.audioEngine.stopAllEffects()},t.prototype.stopEffectAndRelease=function(){this.effectListCb=null,this.effectNameArr=[],cc.audioEngine.stopAllEffects()},t.prototype.setSoundVolume=function(t){this.soundVolume!=t&&(cc.sys.localStorage.setItem("soundVolume",t),this.soundVolume=t)},t.prototype.setBGMVolume=function(t){var e=this;this.bgmAudioID>=0?t>0?(cc.audioEngine.stop(this.bgmAudioID),""!=this.audioUrl&&cc.resources.load(this.audioUrl,cc.AudioClip,function(t,o){e.bgmAudioID=cc.audioEngine.play(o,!0,e.bgmVolume)})):cc.audioEngine.stop(this.bgmAudioID):""!=this.audioUrl&&cc.resources.load(this.audioUrl,cc.AudioClip,function(t,o){e.bgmAudioID=cc.audioEngine.play(o,!0,e.bgmVolume)}),this.bgmVolume!=t&&(cc.sys.localStorage.setItem("bgmVolume",t),this.bgmVolume=t,cc.audioEngine.setVolume(this.bgmAudioID,t))},t.prototype.pauseAll=function(){cc.audioEngine.pauseAll()},t.prototype.resumeAll=function(){cc.audioEngine.resumeAll()},t.prototype.retainAudio=function(t,e){this.clipUrlList[t]||(this.clipUrlList[t]={}),this.clipUrlList[t].nativeUrl=t,this.clipUrlList[t].path=e,this.clipUrlList[t].count||(this.clipUrlList[t].count=0),this.clipUrlList[t].count=this.clipUrlList[t].count+1},t.prototype.playSoundClick=function(){this.playEffect("sound/click")},t.prototype.playSoundcoin=function(){this.playEffect("sound/coin")},t.prototype.playSoundfoodCollect=function(){this.playEffect("sound/foodCollect")},t.prototype.playSoundfoodgift=function(){this.playEffect("sound/gift")},t.prototype.playSoundgrow=function(){this.playEffect("sound/grow")},t.prototype.playSoundlevelup=function(){this.playEffect("sound/levelup")},t.prototype.playSoundlose=function(){this.playEffect("sound/lose")},t.prototype.playSoundmoney=function(){this.playEffect("sound/money")},t.prototype.playSoundrain=function(){this.playEffect("sound/rain")},t.prototype.playSoundresult=function(){this.playEffect("sound/result")},t.prototype.playSoundband=function(){this.playEffect("sound/band")},t.prototype.playSoundcar=function(){this.playEffect("sound/car")},t}();o.AudioMgr=n,cc._RF.pop()},{}],Ball:[function(t,e,o){"use strict";cc._RF.push(e,"01d87JMjcBJu4tKLL9w4q70","Ball");var n,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=this&&this.__decorate||function(t,e,o,n){var i,r=arguments.length,c=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,n);else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(c=(r<3?i(c):r>3?i(e,o,c):i(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=t("../FrameWork/Global"),l=cc._decorator,a=l.ccclass,s=(l.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.onCollisionEnter=function(t,e){console.log("self====>",e);var o=e.node.parent;t.node.parent.getChildByName("light").active=!0,t.node.removeComponent(cc.CircleCollider),o.getComponent(cc.PhysicsCollider)&&o.removeComponent(cc.PhysicsCollider),o.getComponent(cc.RigidBody)&&o.removeComponent(cc.RigidBody),c.default.event.dispatch("ball_in_hole",t.node.parent)},r([a],e)}(cc.Component));o.default=s,cc._RF.pop()},{"../FrameWork/Global":"Global"}],EventMgr:[function(t,e,o){"use strict";cc._RF.push(e,"51988aWavtCxbZeG4xOxnMk","EventMgr"),Object.defineProperty(o,"__esModule",{value:!0}),o.EventMgr=void 0;var n=function(){function t(){this.eventHash={}}return t.prototype.register=function(t,e,o){var n={id:t,type:e,callback:o};this.eventHash.hasOwnProperty(e)||(this.eventHash[e]=[]),this.eventHash[e].push(n)},t.prototype.unregister=function(t,e){var o=this.eventHash[e];o&&o.length>0&&o.forEach(function(n,i){n.id===t&&n.type===e&&o.splice(i,1)})},t.prototype.dispatch=function(t){for(var e=[],o=1;o<arguments.length;o++)e[o-1]=arguments[o];var n=this.eventHash[t];if(n&&n.length>0)for(var i in n){var r=n[i];"function"==typeof r.callback&&r.id&&r.callback.apply(r,e)}},t}();o.EventMgr=n,cc._RF.pop()},{}],GameMain:[function(t,e,o){"use strict";cc._RF.push(e,"a6cf2IGVVhMhLBVejyvokq9","GameMain");var n,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=this&&this.__decorate||function(t,e,o,n){var i,r=arguments.length,c=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,n);else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(c=(r<3?i(c):r>3?i(e,o,c):i(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=t("../FrameWork/Global"),l=t("../FrameWork/PopBase"),a=t("./Holl"),s=cc._decorator,p=s.ccclass,u=s.property,f=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.ballPre=null,e.holeContent=null,e.holePrefab=null,e.arrow=null,e.ballInitPos=null,e.smallBall=null,e.TopNode=null,e.ball=null,e}return i(e,t),e.prototype.start=function(){this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove.bind(this)),this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart.bind(this)),this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touchEnd.bind(this)),this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd.bind(this)),c.default.event.register("ball_in_hole","ball_in_hole",this.ballInHole.bind(this)),this.initMap()},e.prototype.initball=function(){this.ball||(this.ball=cc.instantiate(this.ballPre),this.ball.parent=this.smallBall,this.ball.setPosition(this.ballInitPos.getPosition()))},e.prototype.ballInHole=function(t){var e=t.getComponent(a.default).getType();this.TopNode.getChildByName(e+"").active=!0,this.ball.removeComponent(cc.CircleCollider),this.ball.removeComponent(cc.PhysicsCircleCollider),this.ball.removeComponent(cc.RigidBody),this.ball=null},e.prototype.touchEnd=function(){if(this.ball){console.log("this.arrow===>",this.arrow.height);var t=this.ball.getComponent(cc.RigidBody),e=2*this.arrow.height;t.applyLinearImpulse(cc.v2(-e,e),this.node.convertToWorldSpaceAR(cc.v2(0,0)),!0),this.arrow.active=!1,this.arrow.height=0}},e.prototype.touchStart=function(){this.ball&&(this.arrow.active=!0)},e.prototype.touchMove=function(t){if(this.ball){var e=t.getLocation(),o=cc.winSize;this.arrow.height=-(e.y-o.height/2)-200+50,this.arrow.height<100&&(this.arrow.height=100)}},e.prototype.initMap=function(){for(var t=this.holeContent.width/5,e=0;e<20;e++){var o=cc.instantiate(this.holePrefab);e%20<=5?o.setPosition(cc.v2(e*t,-40)):e%20>5&&e%20<=10?o.setPosition(cc.v2((e-5)*t-this.holeContent.width/10,-120)):e%20>10&&e%20<=14?o.setPosition(cc.v2((e-10)*t,-200)):e%20>14&&e%20<=17?o.setPosition(cc.v2((e-14)*t-this.holeContent.width/10+t,-280)):e%20>17&&e%20<=19&&o.setPosition(cc.v2((e-17)*t+this.holeContent.width/10*2,-360)),o.getComponent(a.default).init(e),o.parent=this.holeContent}},e.prototype.update=function(){this.ball&&this.ball.y<=-1e3&&(this.ball.destroy(),this.ball=null)},r([u(cc.Prefab)],e.prototype,"ballPre",void 0),r([u(cc.Node)],e.prototype,"holeContent",void 0),r([u(cc.Prefab)],e.prototype,"holePrefab",void 0),r([u(cc.Node)],e.prototype,"arrow",void 0),r([u(cc.Node)],e.prototype,"ballInitPos",void 0),r([u(cc.Node)],e.prototype,"smallBall",void 0),r([u(cc.Node)],e.prototype,"TopNode",void 0),r([p],e)}(l.default);o.default=f,cc._RF.pop()},{"../FrameWork/Global":"Global","../FrameWork/PopBase":"PopBase","./Holl":"Holl"}],GameScene:[function(t,e,o){"use strict";cc._RF.push(e,"cf22bxA5GdJPbs0URuyeCOg","GameScene");var n,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=this&&this.__decorate||function(t,e,o,n){var i,r=arguments.length,c=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,n);else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(c=(r<3?i(c):r>3?i(e,o,c):i(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=t("./FrameWork/Global"),l=t("./FrameWork/PopBase"),a=cc._decorator,s=a.ccclass,p=(a.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.start=function(){c.default.sceneMgr.openPop("prefab/Login/Login")},r([s],e)}(l.default));o.default=p,cc._RF.pop()},{"./FrameWork/Global":"Global","./FrameWork/PopBase":"PopBase"}],GameUtils:[function(t,e,o){"use strict";cc._RF.push(e,"f2e21X4tuZOdK1tu6nG7XUt","GameUtils"),Object.defineProperty(o,"__esModule",{value:!0}),o.GroupType=void 0,function(t){t.Guide="Guide",t.default="default",t.Float="Float",t.Wall="Wall"}(o.GroupType||(o.GroupType={}));var n=function(){function t(){}return t.playSpineByNode=function(t,e,o,n,i,r){void 0===r&&(r=null);try{return r&&t.getComponent(sp.Skeleton).setEventListener(function(t,e){r(e)}),this.playSpineAnim(this.getSpineByNode(t),0,e,o,n,i)}catch(c){return console.error("playSpineByNode----\x3e",c),null}},t.setSpineEventListener=function(t,e){t.getComponent(sp.Skeleton).setEventListener(function(t,o){e(o)})},t.playSpineAnim=function(t,e,o,n,i,r){try{if(t)return i&&1==i&&t.setToSetupPose(),this.addAnimationEventListener(t,r),this.setSpineAnim(t,e,o,n)}catch(c){return console.error("playSpineAnim----\x3e",c),null}},t.setSpineAnim=function(t,e,o,n){try{return t?t.setAnimation(e,o,n):null}catch(i){return console.error("setSpineAnim----\x3e",i),null}},t.getSpineByNode=function(t){try{return t.getComponent(sp.Skeleton)}catch(e){}},t.removeAnimationEventListener=function(t){try{var e=t.getComponent(sp.Skeleton);if(null==e||null==e)return;e.setEventListener(function(){})}catch(o){}},t.addAnimationEventListener=function(t,e){try{if(null==t||null==t)return;t.setCompleteListener(function(){e&&e()})}catch(o){}},t.spinePauseOrResume=function(t,e){var o=this,n=t.children;this.findSpineComponent(t,e),n.forEach(function(t){o.spinePauseOrResume(t,e)})},t.findSpineComponent=function(t,e){var o=t.getComponent(sp.Skeleton);if(o)return e?void(null!=o.skeletonData&&(o.paused=e,o.timeScale=0)):void(null!=o.skeletonData&&(o.paused=e,o.timeScale=1))},t.getRandomInt=function(t,e){return Math.floor(Math.random()*(e-t+1))+t},t.addNumToTarget=function(t,e,o,n){var i=this;cc.tween(o.node).to(.2,{scale:1.2}).call(function(){o.string=i.formatCoinNum(e)+""}).to(.2,{scale:1}).call(function(){n&&n()}).start()},t.formatCoinNum=function(t){return t>=1e5?Math.floor(t/1e3)+"K":t+""},t.setButtonGray=function(t,e){var o=this,n=null,i=null,r=e?cc.Material.BUILTIN_NAME.SPRITE:cc.Material.BUILTIN_NAME.GRAY_SPRITE,c=cc.Material.createWithBuiltin(r+"",0);(n=t.getComponent(cc.Sprite))&&n.setMaterial(0,c),(i=t.getComponent(cc.Label))&&i.setMaterial(0,c),t.getComponent(cc.Button)&&(t.getComponent(cc.Button).enabled=e),t.children.forEach(function(t){o.setButtonGray(t,e)})},t}();o.default=n,cc._RF.pop()},{}],Global:[function(t,e,o){"use strict";cc._RF.push(e,"344fdn409RGqLFcHaUfBhbc","Global");var n,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=this&&this.__decorate||function(t,e,o,n){var i,r=arguments.length,c=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,n);else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(c=(r<3?i(c):r>3?i(e,o,c):i(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=t("./AudioMgr"),l=t("./EventMgr"),a=t("./SceneMgr"),s=t("./UI"),p=cc._decorator,u=p.ccclass,f=p.property,d=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.lockUI=null,e}var o;return i(e,t),o=e,e.prototype.onLoad=function(){cc.director.getPhysicsManager().enabled=!0,cc.director.getCollisionManager().enabled=!0,o.audio=new c.AudioMgr,o.audio.init(),o.event=new l.EventMgr,o.sceneMgr=new a.default,o.ui=new s.default},e.prototype.start=function(){cc.game.addPersistRootNode(this.node)},e.prototype.isShowLockUI=function(t){this.lockUI.active=t},e.audio=null,e.event=null,e.sceneMgr=null,e.progressNode=null,e.ui=null,r([f({type:cc.Node})],e.prototype,"lockUI",void 0),o=r([u],e)}(cc.Component);o.default=d,cc._RF.pop()},{"./AudioMgr":"AudioMgr","./EventMgr":"EventMgr","./SceneMgr":"SceneMgr","./UI":"UI"}],Holl:[function(t,e,o){"use strict";cc._RF.push(e,"c3176gOflRCHJq8WY57Useb","Holl");var n,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=this&&this.__decorate||function(t,e,o,n){var i,r=arguments.length,c=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,n);else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(c=(r<3?i(c):r>3?i(e,o,c):i(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,l=c.ccclass,a=c.property,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.holeIndex=null,e.ball=null,e.index=null,e.isBall=!1,e}return i(e,t),e.prototype.init=function(t){this.holeIndex.string=t+1+"",t+1>11&&t+1<16?(this.holeIndex.node.active=!1,this.ball.active=!0,this.index="ball_"+(t+1),this.isBall=!0):(this.holeIndex.node.active=!0,this.ball.active=!1,this.isBall=!1,this.index=t+1),t+1>=16&&(this.holeIndex.string=t-3+"",this.isBall=!1,this.index=t-3)},e.prototype.getType=function(){return this.index},r([a(cc.Label)],e.prototype,"holeIndex",void 0),r([a(cc.Node)],e.prototype,"ball",void 0),r([l],e)}(cc.Component);o.default=s,cc._RF.pop()},{}],Light:[function(t,e,o){"use strict";cc._RF.push(e,"378d0CLOBlLAZ2PgQrJY5ZN","Light");var n,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=this&&this.__decorate||function(t,e,o,n){var i,r=arguments.length,c=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,n);else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(c=(r<3?i(c):r>3?i(e,o,c):i(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=cc._decorator,l=c.ccclass,a=c.property,s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loading_1=null,e.loading_2=null,e}return i(e,t),e.prototype.start=function(){var t=this;this.schedule(function(){t.loading_1.active=!t.loading_1.active,t.loading_2.active=!t.loading_2.active},.3)},r([a({type:cc.Node})],e.prototype,"loading_1",void 0),r([a({type:cc.Node})],e.prototype,"loading_2",void 0),r([l],e)}(cc.Component);o.default=s,cc._RF.pop()},{}],Loading:[function(t,e,o){"use strict";cc._RF.push(e,"322a7Jj6jtCeppgl4TiXCCT","Loading");var n,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=this&&this.__decorate||function(t,e,o,n){var i,r=arguments.length,c=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,n);else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(c=(r<3?i(c):r>3?i(e,o,c):i(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=t("../FrameWork/Global"),l=t("../FrameWork/PopBase"),a=cc._decorator,s=a.ccclass,p=a.property,u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.loading_1=null,e.loading_2=null,e}return i(e,t),e.prototype.start=function(){var t=this;this.schedule(function(){t.loading_1.active=!t.loading_1.active,t.loading_2.active=!t.loading_2.active},.3),cc.resources.loadDir("resources/prefab",function(t,e){console.log("finish====>",t),console.log("total====>",e)},function(){c.default.sceneMgr.openPop("prefab/gameMain/GameMain")})},r([p({type:cc.Node})],e.prototype,"loading_1",void 0),r([p({type:cc.Node})],e.prototype,"loading_2",void 0),r([s],e)}(l.default);o.default=u,cc._RF.pop()},{"../FrameWork/Global":"Global","../FrameWork/PopBase":"PopBase"}],Login:[function(t,e,o){"use strict";cc._RF.push(e,"f57950WmJFGfJwSdlkZhZov","Login");var n,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=this&&this.__decorate||function(t,e,o,n){var i,r=arguments.length,c=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,n);else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(c=(r<3?i(c):r>3?i(e,o,c):i(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=t("../FrameWork/Global"),l=t("../FrameWork/PopBase"),a=cc._decorator,s=a.ccclass,p=(a.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i(e,t),e.prototype.start=function(){},e.prototype.onBtnLogin=function(){c.default.sceneMgr.openPop("prefab/Loading")},r([s],e)}(l.default));o.default=p,cc._RF.pop()},{"../FrameWork/Global":"Global","../FrameWork/PopBase":"PopBase"}],PopBase:[function(t,e,o){"use strict";cc._RF.push(e,"1f02e2nUrdIabuWgKEFb/vR","PopBase");var n,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)}),r=this&&this.__decorate||function(t,e,o,n){var i,r=arguments.length,c=r<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,o,n);else for(var l=t.length-1;l>=0;l--)(i=t[l])&&(c=(r<3?i(c):r>3?i(e,o,c):i(e,o))||c);return r>3&&c&&Object.defineProperty(e,o,c),c};Object.defineProperty(o,"__esModule",{value:!0});var c=t("./Global"),l=cc._decorator,a=l.ccclass,s=(l.property,function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.inputPopData=null,e._eventIds=[],e._eventid=null,e}return i(e,t),e.prototype.setInputData=function(t){this.inputPopData=t},e.prototype.getInputData=function(){return this.inputPopData},e.prototype.onRegisterEvent=function(t,e){c.default.event.register(this._eventid,t,e),this._eventIds.push(t)},e.prototype.removeAllEvents=function(){for(var t=0;t<this._eventIds.length;t++){var e=this._eventIds[t];c.default.event.unregister(this._eventid,e)}this._eventIds=[]},e.prototype.closePop=function(){this.inputPopData=null,this.removeAllEvents(),this.node.destroy()},r([a],e)}(cc.Component));o.default=s,cc._RF.pop()},{"./Global":"Global"}],SceneMgr:[function(t,e,o){"use strict";cc._RF.push(e,"49d91TRzIxJP676rUCBGrqp","SceneMgr"),Object.defineProperty(o,"__esModule",{value:!0}),o.ScenePath=o.ModeuleIndex=void 0;var n,i=t("./PopBase");(function(t){t[t.Base=1e3]="Base",t[t.Pop=2e3]="Pop",t[t.Tip=3e3]="Tip"})(n=o.ModeuleIndex||(o.ModeuleIndex={})),function(t){t.LOGIN="prefab/Login",t.MAIN="prefab/GameMain",t.Loading="prefab/Loading",t.Slot="prefab/slot/Slot",t.Daily="prefab/Daily/Daily"}(o.ScenePath||(o.ScenePath={}));var r=function(){function t(){this.sceneNodeList=[],this.curentPath=null,this.parentNode=cc.director.getScene().getChildByName("Canvas"),this.loadingNode=null,this.popNodeList=[],this.sceneName=""}return t.prototype.setCurentScene=function(t,e,o){var n=this;void 0===e&&(e=!1),void 0===o&&(o=!1),this.curentPath!=t?(this.clearAllPops(),e?cc.resources.load("prefab/loading",cc.Prefab,function(e,i){n.loadingNode=cc.instantiate(i),n.loadingNode.parent=n.parentNode,cc.resources.preload(t,function(){},function(e){e?console.error("path====ERR:",t):n.loadCurentScene(t,o)})}):this.loadCurentScene(t,o)):console.error("The same Path!!!!!")},t.prototype.loadCurentScene=function(t,e,o,r){var c=this;void 0===o&&(o=!0),void 0===r&&(r=null),cc.resources.load(t,cc.Prefab,function(l,a){if(l)console.error(t," is not find!!!");else{c.curentPath=t,c.loadingNode&&"prefab/Login"==t&&(c.loadingNode.getChildByName("ProgressBar").active=!1);var s=cc.instantiate(a);s.parent=c.parentNode,s.getComponent(i.default)&&s.getComponent(i.default).setInputData(r),o?(c.sceneNodeList.length>0&&(e||(c.sceneNodeList[0].destroy(),c.sceneNodeList.shift())),c.sceneNodeList.push(s),s.zIndex=n.Base,c.sceneName=t):(c.popNodeList.push(s),s.zIndex=n.Pop),c.parentNode.stopAllActions()}})},t.prototype.getScenePath=function(){return this.sceneName},t.prototype.openPop=function(t,e){void 0===e&&(e=null),this.loadCurentScene(t,!1,!1,e)},t.prototype.clearAllPops=function(){for(var t=0;t<this.popNodeList.length;t++)this.popNodeList[t].destroy();this.popNodeList=[]},t.prototype.getPops=function(){return this.popNodeList},t}();o.default=r,cc._RF.pop()},{"./PopBase":"PopBase"}],UI:[function(t,e,o){"use strict";cc._RF.push(e,"e50adbpooNJZraPT8AqNtqa","UI"),Object.defineProperty(o,"__esModule",{value:!0});var n=t("./Global"),i=function(){function t(){}return t.prototype.showLockUI=function(t){cc.director.getScene().getChildByName("Global").getComponent(n.default).isShowLockUI(t)},t}();o.default=i,cc._RF.pop()},{"./Global":"Global"}]},{},["AudioMgr","EventMgr","GameUtils","Global","PopBase","SceneMgr","UI","GameScene","Loading","Login","Ball","GameMain","Holl","Light"]);