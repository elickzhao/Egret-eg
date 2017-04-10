var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameElement = (function (_super) {
    __extends(GameElement, _super);
    function GameElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //id为初始时排序位置与location相同,不过随着游戏进行 方块不停移动, location将不断变化 但id将是唯一的 所以不能作为位置信息
        _this.id = 0; // 元素id
        _this.location = 0; // 元素位置
        return _this;
    }
    return GameElement;
}(BaseElement));
__reflect(GameElement.prototype, "GameElement");
//# sourceMappingURL=GameElement.js.map