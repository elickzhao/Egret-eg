var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelGameDataParse = (function () {
    function LevelGameDataParse() {
    }
    LevelGameDataParse.parseLevelGameData = function (val) {
        GameData.stepNum = val.step; //当期玩家最大步数 当然也就是初始步数
        GameData.levelStepNum = val.step; // 过关步数
        GameData.elementTypes = val.element; //本关需要清除的元素类型数组
        GameData.levelBackgroundImageName = val.levelbgimg; //背景图片
        LevelGameDataParse.parselLevelReq(val.levelreq); //过关条件解析
    };
    LevelGameDataParse.parselLevelReq = function (val) {
        GameData.levelreq.openChange();
        var len = val.length;
        for (var i = 0; i < len; i++) {
            GameData.levelreq.addElement(val[i].type, val[i].num);
        }
    };
    return LevelGameDataParse;
}());
__reflect(LevelGameDataParse.prototype, "LevelGameDataParse");
//# sourceMappingURL=LevelGameDataParse.js.map