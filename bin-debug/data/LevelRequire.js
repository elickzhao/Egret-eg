var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelRequire = (function () {
    function LevelRequire() {
        this.reqElements = [];
    }
    //获得 每关要消除的元素种类的个数
    LevelRequire.prototype.getLevelReqNum = function () {
        return this.reqElements.length;
    };
    //添加 过关条件,关卡元素
    LevelRequire.prototype.addElement = function (type, num) {
        var ele = new LevelRequireElement();
        ele.num = num;
        ele.type = type;
        this.reqElements.push(ele);
    };
    //过关后 清楚关卡元素
    LevelRequire.prototype.openChange = function () {
        this.reqElements = [];
    };
    //改变 过关条件 当消除几个 就要减去几个
    LevelRequire.prototype.changeReqNum = function (type, num) {
        var l = this.getLevelReqNum();
        for (var i = 0; i < l; i++) {
            if (this.reqElements[i].type == type) {
                this.reqElements[i].num -= num;
                return; //结束当前循环
            }
        }
    };
    // 判断是否过关, 通过判断过关条件判断是否过关.
    LevelRequire.prototype.isClear = function () {
        var l = this.getLevelReqNum();
        for (var i = 0; i < l; i++) {
            if (this.reqElements[i].num > 0) {
                return false;
            }
        }
        return true;
    };
    return LevelRequire;
}());
__reflect(LevelRequire.prototype, "LevelRequire");
//# sourceMappingURL=LevelRequire.js.map